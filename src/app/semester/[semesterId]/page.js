import { db } from "../../../lib/db";
import { courses, semesters } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../../../auth.js";
import { redirect, notFound } from "next/navigation";
import CourseList from "../../../components/course_list";

const SemesterPage = async ({ params }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { semesterId } = await params;
  const semesterIdNum = parseInt(semesterId);

  // Fetch semester info
  const semester = await db
    .select()
    .from(semesters)
    .where(eq(semesters.id, semesterIdNum))
    .limit(1);

  if (semester.length === 0) {
    notFound();
  }

  // Fetch courses for this semester
  const semesterCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.semesterId, semesterIdNum));

  return <CourseList semester={semester[0]} courses={semesterCourses} />;
};

export default SemesterPage;