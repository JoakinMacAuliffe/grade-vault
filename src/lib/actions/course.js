"use server";

import { revalidatePath } from "next/cache";
import { courses } from "../../db/schema.js";
import { db } from "../db.js";

export async function createCourseAction(prevState, formData) {
  try {
    const courseCode = formData.get("courseCode");
    const title = formData.get("title");
    const credits = parseInt(formData.get("credits"));
    const exemptionGrade = parseFloat(formData.get("exemptionGrade"));
    const semesterId = parseInt(formData.get("semesterId"));

    await db.insert(courses).values({
      courseCode,
      title,
      credits,
      exemptionGrade,
      semesterId,
    });

    revalidatePath(`/semester/${semesterId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}