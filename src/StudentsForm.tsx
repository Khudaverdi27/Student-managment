import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import StudentsTable from "./Students-table";
import { useAppDispatch } from "./Redux/hooks/reduxHooks";
import {
  addStudent,
  updateStudent,
  studentsArray,
  deleteStudent,
} from "./Redux/features/studentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "./validation/inputSchema";
import { Student } from "./types/student";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "./assets/img/score.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Students() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const studentData = useSelector(studentsArray);
  const [editableStudent, setEditableStudent] = useState<Student | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Student>({
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    if (editableStudent) {
      setValue("name", editableStudent.name);
      setValue("surname", editableStudent.surname);
      setValue("no", editableStudent.no);
      setValue("classes", editableStudent.classes);
    }
  }, [editableStudent, setValue]);

  const goBack = () => {
    navigate("/");
  };

  const onSubmit: SubmitHandler<Student> = (data) => {
    if (editableStudent) {
      dispatch(updateStudent({ ...data, id: editableStudent.id }));
    } else {
      const dataWithId = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
      };
      dispatch(addStudent(dataWithId));
    }
    reset();
    setEditableStudent(null);
  };

  const editStudent = (id: string) => {
    const student = studentData.find((student: Student) => student.id === id);
    if (student) {
      setEditableStudent(student);
    }
  };

  const destroyStudent = (id: string) => {
    dispatch(deleteStudent(id));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "95vh",
      }}
    >
      <Button
        style={{ marginBottom: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => goBack()}
      >
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
                id="outlined-textarea"
                label={editableStudent ? "" : "Student Name"}
                variant="outlined"
                helperText={errors.name && `${errors.name?.message}`}
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
                label={editableStudent ? "" : "Student Surname"}
                variant="outlined"
                helperText={errors.surname && `${errors.surname?.message}`}
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
                label={editableStudent ? "" : "Student No"}
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
                label={editableStudent ? "" : "Class"}
                variant="outlined"
                helperText={errors.classes && `${errors.classes?.message}`}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button type="submit" variant="contained" color="success">
                {editableStudent ? "Update" : "Submit"}
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
      <StudentsTable editData={editStudent} deleteData={destroyStudent} />
    </Box>
  );
}
