import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item sx={{ bgcolor: "text.primary", color: "white" }}>
            Welcome to school managment
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ bgcolor: "primary.main", color: "white" }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/students"}
            >
              Students
            </Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ bgcolor: "secondary.main", color: "white" }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/lessons"}
            >
              Lessons
            </Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ bgcolor: "warning.main", color: "white" }}>
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
