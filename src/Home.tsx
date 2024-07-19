import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import img from "./assets/img/main.bg.png";
function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item
            sx={{
              bgcolor: "#00C0EF",
              color: "white",
              padding: 10,
              fontWeight: 600,
              fontSize: "2rem",
            }}
          >
            Welcome to school managment
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              bgcolor: "#F39C11",
              color: "white",
              padding: 10,
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/students"}
            >
              Students
            </Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              bgcolor: "#01A65A",
              color: "white",
              padding: 10,
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/lessons"}
            >
              Lessons
            </Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              bgcolor: "#F56854",
              color: "white",
              padding: 10,
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/scores"}
            >
              Scores
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
