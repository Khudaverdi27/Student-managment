import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson, Score, Student } from "../../types/student";

export interface studentSlice {
  studentData: Student[];
  lessonData: Lesson[];
  scoreData: Score[];
}

const initialState: studentSlice = {
  studentData: [],
  lessonData: [],
  scoreData: [],
};

export const addDataSlice = createSlice({
  name: "addTable",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.studentData.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.studentData.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.studentData[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.studentData = state.studentData.filter(
        (student) => student.id !== action.payload
      );
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessonData.push(action.payload);
    },
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      const index = state.lessonData.findIndex(
        (lesson) => lesson.id === action.payload.id
      );
      if (index !== -1) {
        state.lessonData[index] = action.payload;
      }
    },
    deleteLesson: (state, action: PayloadAction<string>) => {
      state.lessonData = state.lessonData.filter(
        (lesson) => lesson.id !== action.payload
      );
    },
    addScore: (state, action: PayloadAction<Score>) => {
      state.scoreData.push(action.payload);
    },
  },
});

export const {
  addStudent,
  addLesson,
  addScore,
  updateStudent,
  deleteStudent,
  updateLesson,
  deleteLesson,
} = addDataSlice.actions;

export const studentsArray = (state: RootState) => state.addTable.studentData;
export const lessonsArray = (state: RootState) => state.addTable.lessonData;
export const scoreArray = (state: RootState) => state.addTable.scoreData;

export default addDataSlice.reducer;
