import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import StudentsTable from "./Students-table";
import { useAppDispatch } from "./Redux/hooks/reduxHooks";
import { addStudent } from "./Redux/features/studentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "./validation/inputSchema";
import { Student } from "./types/student";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Students() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: yupResolver(studentSchema),
  });

  const onSubmit: SubmitHandler<Student> = (data) => {
    dispatch(addStudent(data));
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
                {...register("name")}
                fullWidth
                id="outlined-basic"
                label="Student Name"
                variant="outlined"
                value={name}
                helperText={errors.name && `${errors.name?.message}`}
                onChange={(e) => setName(e.target.value)}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                FormHelperTextProps={{ sx: { color: "red" } }}
                {...register("surname")}
                fullWidth
                id="outlined-basic"
                label="Student Surname"
                variant="outlined"
                helperText={errors.surname && `${errors.surname?.message}`}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
                label="Student No"
                variant="outlined"
                helperText={errors.no && `${errors.no?.message}`}
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
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
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
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
      <StudentsTable />
    </Box>
  );
}
