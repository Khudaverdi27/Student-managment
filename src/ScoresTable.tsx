import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { scoreArray } from "./Redux/features/studentSlice";
import { useSelector } from "react-redux";
import { Score } from "./types/student";
function ScoresTable() {
  const scoreData = useSelector(scoreArray);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#6E99F4" }}>
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
          {scoreData.map((score: Score) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {score?.name ? score.name : "Name"}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {score.teacherName}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {score.lessonName}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {score?.classes}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {score?.datePicker}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {score.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScoresTable;
