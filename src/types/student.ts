export type Student = {
  id?: string;
  name: string;
  surname: string;
  no: number;
  classes: string;
};
export type Lesson = {
  id?: string;
  lessonName: string;
  teacherName: string;
  no: number;
  classes: string;
};
export type Score = {
  studentName: string;
  teacherName: string;
  lessonName: string;
  date: string;
  score: number;
};

export type editAndDeleteType = {
  editData: (id: any) => void;
  deleteData: (id: any) => void;
};
