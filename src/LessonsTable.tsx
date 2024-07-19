import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { lessonsArray } from "./Redux/features/studentSlice";

export default function LessonsTable() {
  const lessonData = useSelector(lessonsArray);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Lesson Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Teacher Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Teacher No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Class
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessonData.map((lesson) => (
            <TableRow
              key={lesson.no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {lesson.lessonName}
              </TableCell>
              <TableCell align="center">{lesson.teacherName}</TableCell>
              <TableCell align="center">{lesson.no}</TableCell>
              <TableCell align="center">{lesson.classes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
