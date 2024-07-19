import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { studentsArray } from "./Redux/features/studentSlice";

export default function StudentsTable() {
  const studentData = useSelector(studentsArray);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Student Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Student Surname
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Student No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Class
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentData.map((student) => (
            <TableRow
              key={student.no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="center">{student.surname}</TableCell>
              <TableCell align="center">{student.no}</TableCell>
              <TableCell align="center">{student.classes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}