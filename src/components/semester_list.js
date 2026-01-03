"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createSemesterAction } from "../lib/actions/semester.js";
import styles from "./semester_list.module.css";

export default function SemesterList({ semesters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createSemesterAction, null);

  if (state?.success && isOpen) {
    setIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis Semestres</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsOpen(true)}
        >
          + Nuevo Semestre
        </button>
      </div>

      <div className={styles.semesterGrid}>
        {semesters.length === 0 ? (
          <p className={styles.emptyMessage}>
            No hay semestres registrados.
          </p>
        ) : (
          semesters.map((semester) => (
            <div key={semester.id} className={styles.semesterCard}>
              <div className={styles.semesterNumber}>
                {semester.numero}° Semestre
              </div>
              <div className={styles.semesterYear}>{semester.año}</div>
              {semester.fechaInicio && semester.fechaFin && (
                <div className={styles.semesterDates}>
                  {new Date(semester.fechaInicio).toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric' 
                  })} - {new Date(semester.fechaFin).toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Full-screen overlay with form */}
      {isOpen && (
        <div className={styles.semesterForm} onClick={() => setIsOpen(false)}>
          <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
            <h3>Nuevo Semestre</h3>
            <form action={formAction}>
              <label>
                Número de Semestre:
                <input type="number" name="numero" required min="1" />
              </label>
              <label>
                Año:
                <input type="number" name="año" required min="2000" max="2100" />
              </label>
              <label>
                Fecha de Inicio:
                <input type="date" name="fechaInicio" />
              </label>
              <label>
                Fecha de Término:
                <input type="date" name="fechaFin" />
              </label>
              {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}