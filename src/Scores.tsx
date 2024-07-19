import { FormEvent, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import {
  studentsArray,
  lessonsArray,
  addScore,
} from "./Redux/features/studentSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Lesson, Score, Student } from "./types/student";
import { toast } from "react-toastify";
import { useAppDispatch } from "./Redux/hooks/reduxHooks";
import { styled } from "@mui/material/styles";
import ScoresTable from "./ScoresTable";
import { Dayjs } from "dayjs";

export default function Scores() {
  const dispatch = useAppDispatch();
  const studentData = useSelector(studentsArray);
  const lessonData = useSelector(lessonsArray);
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState<string>("");
  const [classes, setClasses] = useState<string>("0");
  const [selectedData, setSelectedData] = useState<Score>({
    id: 0,
    name: "",
    teacherName: "",
    lessonName: "",
    classes: "",
    datePicker: "",
    score: 0,
  });
  const [score, setScore] = useState<string>("");
  const [datePicker, setDatePicker] = useState<Dayjs | null>(null);

  const goBack = () => {
    navigate("/");
  };

  const notify = () => toast.error(`No students in class were found.`);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectValue(selectedValue);

    const filteredLesson = lessonData.find(
      (lesson: Lesson) => lesson.classes === selectedValue
    );
    const filteredStudent = studentData.find(
      (student: Student) => student.classes === selectedValue
    );

    if (filteredLesson) {
      setClasses(filteredLesson.classes);
      setSelectedData((prevData) => ({
        ...prevData,
        teacherName: filteredLesson.teacherName,
        lessonName: filteredLesson.lessonName,
      }));
    }

    if (filteredStudent) {
      setClasses(filteredStudent.classes);
      setSelectedData((prevData) => ({
        ...prevData,
        name: `${filteredStudent.name} ${filteredStudent.surname}`,
        classes: filteredStudent.classes,
      }));
    } else if (classes !== "0" || !classes) {
      notify();
    }

    if (!filteredLesson && !filteredStudent) {
      notify();
    }
  };

  useEffect(() => {
    if (datePicker) {
      const day = datePicker.date().toString().padStart(2, "0");
      const month = (datePicker.month() + 1).toString().padStart(2, "0");
      const year = datePicker.year();

      const dateString = `${day}:${month}:${year}`;

      setSelectedData((prevData) => ({
        ...prevData,
        score: parseInt(score) || 0,
        datePicker: dateString,
        classes,
      }));
    }
  }, [score, datePicker, classes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addScore(selectedData));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleDateChange = (date: Dayjs | null) => {
    setDatePicker(date);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        style={{ marginBottom: "20px" }}
        variant="contained"
        onClick={goBack}
      >
        Back
      </Button>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="student-select-label">Student</InputLabel>
              <Select
                labelId="student-select-label"
                id="student-select"
                value={selectValue}
                label="Student"
                onChange={handleChange}
              >
                {studentData.map((student: Student) => (
                  <MenuItem key={student.no} value={student.classes}>
                    {student.name + " " + student.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="teacher-select-label">Teacher</InputLabel>
              <Select
                labelId="teacher-select-label"
                id="teacher-select"
                value={selectValue}
                label="Teacher"
                onChange={handleChange}
              >
                {lessonData.map((lesson: Lesson) => (
                  <MenuItem key={lesson.no} value={lesson.classes}>
                    {lesson.teacherName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="lesson-select-label">Lesson</InputLabel>
              <Select
                labelId="lesson-select-label"
                id="lesson-select"
                value={selectValue}
                label="Lesson"
                onChange={handleChange}
              >
                {lessonData.map((lesson: Lesson) => (
                  <MenuItem key={lesson.no} value={lesson.classes}>
                    {lesson.lessonName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ border: 1, paddingY: 2, paddingLeft: 1 }}>{classes}</Box>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={handleDateChange} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
              onChange={(e) => setScore(e.target.value)}
              type="number"
              id="score"
              label="Score"
              variant="outlined"
            />
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
      <ScoresTable />
    </Box>
  );
}
