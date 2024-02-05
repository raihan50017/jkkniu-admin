import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Layout from "../components/common/Layout";

export const HomePage = lazy(() => import("../pages/Home"));
export const TeacherPage = lazy(() => import("../pages/teacher/teacher"));
export const FacultyPage = lazy(() => import("../pages/faculty/faculty"));
export const DepartmentPage = lazy(() => import("../pages/teacher/teacher"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Layout>
          <Suspense>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "teacher", element: <TeacherPage /> },
        { path: "faculty", element: <FacultyPage /> },
        { path: "department", element: <DepartmentPage /> },
      ],
    },
  ]);

  return routes;
}
