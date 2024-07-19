import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <Stack spacing={2}>
      <Outlet />
      <ToastContainer autoClose={1500} />
    </Stack>
  );
}

export default MainLayout;
