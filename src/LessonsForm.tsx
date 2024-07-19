import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import { useAppDispatch } from "./Redux/hooks/reduxHooks";

import { yupResolver } from "@hookform/resolvers/yup";
import { lessonSchema } from "./validation/inputSchema";
import { Lesson } from "./types/student";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LessonsTable from "./LessonsTable";
import {
  addLesson,
  deleteLesson,
  lessonsArray,
  updateLesson,
} from "./Redux/features/studentSlice";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Lessons() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lessonData = useSelector(lessonsArray);
  const [editableLesson, setEditableLesson] = useState<Lesson | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Lesson>({
    resolver: yupResolver(lessonSchema),
  });

  useEffect(() => {
    if (editableLesson) {
      setValue("lessonName", editableLesson.lessonName);
      setValue("teacherName", editableLesson.teacherName);
      setValue("no", editableLesson.no);
      setValue("classes", editableLesson.classes);
    }
  }, [editableLesson, setValue]);

  const goBack = () => {
    navigate("/");
  };

  const onSubmit: SubmitHandler<Lesson> = (data) => {
    if (editableLesson) {
      dispatch(updateLesson({ ...data, id: editableLesson.id }));
    } else {
      const dataWithId = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
      };
      dispatch(addLesson(dataWithId));
    }
    reset();
    setEditableLesson(null);
  };

  const editLesson = (id: string) => {
    const lesson = lessonData.find((lesson: Lesson) => lesson.id === id);
    if (lesson) {
      setEditableLesson(lesson);
    }
  };

  const destroyLesson = (id: string) => {
    dispatch(deleteLesson(id));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button variant="contained" onClick={() => goBack()}>
        Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <TextField
                FormHelperTextProps={{ sx: { color: "red" } }}
                {...register("lessonName")}
                fullWidth
                id="outlined-basic"
                label="Lesson Name"
                variant="outlined"
                helperText={
                  errors.lessonName && `${errors.lessonName?.message}`
                }
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                FormHelperTextProps={{ sx: { color: "red" } }}
                {...register("teacherName")}
                fullWidth
                id="outlined-basic"
                label="Teacher name"
                variant="outlined"
                helperText={
                  errors.teacherName && `${errors.teacherName?.message}`
                }
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                FormHelperTextProps={{ sx: { color: "red" } }}
                {...register("no")}
                fullWidth
                type="number"
                id="outlined-basic"
                label="Teacher No"
                variant="outlined"
                helperText={errors.no && `${errors.no?.message}`}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                FormHelperTextProps={{ sx: { color: "red" } }}
                {...register("classes")}
                fullWidth
                id="outlined-basic"
                label="Class"
                variant="outlined"
                helperText={errors.classes && `${errors.classes?.message}`}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button type="submit" variant="contained" color="primary">
                {editableLesson ? "Update" : "Submit"}
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
      <LessonsTable editData={editLesson} deleteData={destroyLesson} />
    </Box>
  );
}
