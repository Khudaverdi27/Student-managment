import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson, Student } from "../../types/student";

export interface studentSlice {
  studentData: Student[];
  lessonData: Lesson[];
}

const initialState: studentSlice = {
  studentData: [],
  lessonData: [],
};

export const addDataSlice = createSlice({
  name: "addTable",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.studentData.push(action.payload);
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessonData.push(action.payload);
    },
  },
});

export const { addStudent, addLesson } = addDataSlice.actions;

export const studentsArray = (state: RootState) => state.addTable.studentData;
export const lessonsArray = (state: RootState) => state.addTable.lessonData;

export default addDataSlice.reducer;
