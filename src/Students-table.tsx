import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { studentsArray } from "./Redux/features/studentSlice";
import { Button } from "@mui/material";
import { editAndDeleteType } from "./types/student";

export default function StudentsTable({
  editData,
  deleteData,
}: editAndDeleteType) {
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
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Edit
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Delete
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
              <TableCell align="center">
                <Button
                  onClick={() => editData(student.id)}
                  variant="contained"
                  color="success"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => deleteData(student.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
