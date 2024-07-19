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
  id: number;
  name?: string;
  teacherName: string;
  lessonName: string;
  classes?: string;
  datePicker?: string;
  score: number;
};

export type editAndDeleteType = {
  editData: (id: any) => void;
  deleteData: (id: any) => void;
};
