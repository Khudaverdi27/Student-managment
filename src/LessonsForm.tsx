import { useState } from "react";
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
import { addLesson } from "./Redux/features/studentSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Lessons() {
  const dispatch = useAppDispatch();
  const [lessoName, setlessonName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherNo, setTeacherNo] = useState("");
  const [clas, setClas] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Lesson>({
    resolver: yupResolver(lessonSchema),
  });

  const onSubmit: SubmitHandler<Lesson> = (data) => {
    dispatch(addLesson(data));
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
                value={lessoName}
                helperText={
                  errors.lessonName && `${errors.lessonName?.message}`
                }
                onChange={(e) => setlessonName(e.target.value)}
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
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
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
                value={teacherNo}
                onChange={(e) => setTeacherNo(e.target.value)}
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
                value={clas}
                onChange={(e) => setClas(e.target.value)}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
      <LessonsTable />
    </Box>
  );
}
