import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import { studentsArray, lessonsArray } from "./Redux/features/studentSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Lesson, Student } from "./types/student";

export default function Scores() {
  const studentData = useSelector(studentsArray);
  const lessonData = useSelector(lessonsArray);
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [classes, setClasses] = useState("0");
  const [selectedStudent, setSelectedStudent] = useState("");

  const goBack = () => {
    navigate("/");
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLessonNo = event.target.value;
    setAge(event.target.value as string);
    const filteredLesson = lessonData.find(
      (lesson: Lesson) => lesson.classes === selectedLessonNo
    );
    const filteredStudent = studentData.find(
      (student: Student) => student.classes === selectedLessonNo
    );

    if (filteredLesson) {
      setClasses(filteredLesson.classes);
    } else if (filteredStudent) {
      setClasses(filteredStudent.classes);
    }
  };

  useEffect(() => {
    if (classes) {
      const filteredStudent = studentData.find(
        (student: Student) => student.classes === classes
      );
      if (filteredStudent) {
        setSelectedStudent(filteredStudent.classes);
      }
      console.log(selectedStudent);
    }
  }, [classes]);

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" onClick={() => goBack()}>
        Back
      </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Student</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Teacher
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Lesson
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Class
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Date-Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={selectedStudent}
                  id="demo-simple-select"
                  value={age}
                  label={"Student"}
                  onChange={handleChange}
                >
                  {studentData.map((student) => (
                    <MenuItem key={student.no} value={student.classes}>
                      {student.name + " " + student.surname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="teacher"
                  onChange={handleChange}
                >
                  {lessonData.map((lesson) => (
                    <MenuItem key={lesson.no} value={lesson.classes}>
                      {lesson.teacherName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="lesson"
                  onChange={handleChange}
                >
                  {lessonData.map((lesson) => (
                    <MenuItem key={lesson.no} value={lesson.classes}>
                      {lesson.lessonName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="center">
              <Box sx={{ border: 1, paddingY: 2 }}>{classes}</Box>
            </TableCell>
            <TableCell align="right">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </TableCell>
            <TableCell align="center">
              <TextField
                type="number"
                id="outlined-basic"
                label="Score"
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
