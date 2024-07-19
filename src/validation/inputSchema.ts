import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  no: yup.number().required("Student number is required"),
  classes: yup.string().required("Student classes is required"),
});
export const lessonSchema = yup.object({
  lessonName: yup.string().required("Lesson name is required"),
  teacherName: yup.string().required("Teacher Name is required"),
  no: yup.number().required("Teacher No is required"),
  classes: yup.string().required("class is required"),
});
