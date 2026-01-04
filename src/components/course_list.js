"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { createCourseAction } from "../lib/actions/course.js";
import styles from "./course_list.module.css";
import Link from "next/link";

export default function CourseList({ semester, courses }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createCourseAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state?.success]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Semester {semester.number} - {semester.year}
          </h1>
          {semester.startDate && semester.endDate && (
            <p className={styles.dates}>
              {new Date(semester.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(semester.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>
        <button className={styles.addButton} onClick={() => setIsOpen(true)}>
          + New Course
        </button>
      </div>

      <div className={styles.courseGrid}>
        {courses.length === 0 ? (
          <p className={styles.emptyMessage}>No courses added yet.</p>
        ) : (
          courses.map((course) => (
            <Link
              href={`/semester/${semester.id}/course/${course.id}`}
              key={course.id}
              className={styles.courseCard}
            >
              <div className={styles.courseCode}>{course.courseCode}</div>
              <div className={styles.courseTitle}>{course.title}</div>
              <div className={styles.courseInfo}>
                <span>{course.credits} credits</span>
                <span>Exemption: {course.exemptionGrade}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      {isOpen && (
        <div className={styles.courseForm} onClick={() => setIsOpen(false)}>
          <div
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>New Course</h3>
            <form action={formAction}>
              <input type="hidden" name="semesterId" value={semester.id} />
              <label>
                Course Code:
                <input
                  type="text"
                  name="courseCode"
                  required
                  maxLength={8}
                  placeholder="COMP1234"
                />
              </label>
              <label>
                Course Title:
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Introduction to Programming"
                />
              </label>
              <label>
                Credits:
                <input type="number" name="credits" required min="1" max="10" />
              </label>
              <label>
                Exemption Grade:
                <input
                  type="number"
                  name="exemptionGrade"
                  step="0.1"
                  min="1.0"
                  max="7.0"
                  defaultValue="5.0"
                />
              </label>
              {state?.error && (
                <p className={styles.errorMessage}>{state.error}</p>
              )}
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}