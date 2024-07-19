import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Home";
import Students from "../StudentsForm";

import Scores from "../Scores";
import Lessons from "../LessonsForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "lessons",
        element: <Lessons />,
      },
      {
        path: "scores",
        element: <Scores />,
      },
    ],
  },
]);
