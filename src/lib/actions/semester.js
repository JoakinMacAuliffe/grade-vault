"use server"; // uses server because we're working with the db

import { revalidatePath } from "next/cache";
import { semestres } from "../../db/schema.js";
import { db } from "../db.js";

export async function createSemesterAction(prevState, formData) {
  try {
    const numero = parseInt(formData.get("numero"));
    const año = parseInt(formData.get("año"));
    const fechaInicio = formData.get("fechaInicio") || null;
    const fechaFin = formData.get("fechaFin") || null;

    // Automatically set if the semester is active or not

    let activo = false;

    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio).getTime();
      const fin = new Date(fechaFin).getTime();
      const now = Date.now();

      activo = now >= inicio && now <= fin;
    }

    await db.insert(semestres).values({
      numero,
      año,
      fechaInicio,
      fechaFin,
      activo,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
