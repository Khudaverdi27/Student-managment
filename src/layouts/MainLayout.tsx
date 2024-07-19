import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

function MainLayout() {
  return (
    <Stack spacing={2}>
      <Outlet />
    </Stack>
  );
}

export default MainLayout;
