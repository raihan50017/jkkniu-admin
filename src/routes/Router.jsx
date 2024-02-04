import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Layout from "../components/common/Layout";

export const HomePage = lazy(() => import("../pages/Home"));
export const TeacherPage = lazy(() => import("../pages/Teacher"));
export const FacultyPage = lazy(() => import("../pages/Faculty"));
export const DepartmentPage = lazy(() => import("../pages/Department"));

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
