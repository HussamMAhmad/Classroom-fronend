import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes, Navigate } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./provider/data";
import Dashboard from "./pages/dashboard";
import { BookOpen, GraduationCap, Home, Users, Landmark } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/list";
import SubjectCreate from "./pages/subjects/create";
import ShowSubject from "./pages/subjects/show";
import ClassesCreate from "./pages/classes/create";
import ClassesList from "./pages/classes/list";
import Show from "./pages/classes/show";
import UsersList from "./pages/users/list";
import DepartmentList from "./pages/departments/list";
import { authProvider } from "./provider/auth";
import { Authenticated } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInForm } from "@/components/refine-ui/form/sign-in-form";
import { SignUpForm } from "@/components/refine-ui/form/sign-up-form";
import { CatchAllNavigate } from "@refinedev/react-router";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "ASH1Cq-6xSiOd-73bCFb",
                disableTelemetry: true,
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: { label: "Home", icon: <Home /> },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  show: "users/show/:id",
                  meta: { label: "Users", icon: <Users /> },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  show: "/classes/show/:id",
                  meta: { label: "Classes", icon: <GraduationCap /> },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  show: "/subjects/show/:id",
                  meta: { label: "Subjects", icon: <BookOpen /> },
                },
                {
                  name: "departments",
                  list: "/departments",
                  create: "/departments/create",
                  show: "/departments/show/:id",
                  meta: { label: "Departments", icon: <Landmark /> },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="protected-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                      loading={<Skeleton className="h-screen w-screen" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="/" element={<Dashboard />} />

                  <Route path="users">
                    <Route index element={<UsersList />} />
                  </Route>

                  <Route path="departments">
                    <Route index element={<DepartmentList />} />
                  </Route>

                  <Route path="subjects">
                    <Route index element={<SubjectList />} />
                    <Route
                      path="/subjects/create"
                      element={<SubjectCreate />}
                    />
                    <Route
                      path="/subjects/show/:id"
                      element={<ShowSubject />}
                    />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="/classes/create" element={<ClassesCreate />} />
                    <Route path="/classes/show/:id" element={<Show />} />
                  </Route>
                </Route>

                <Route path="/login" element={<SignInForm />} />
                <Route path="/register" element={<SignUpForm />} />

                <Route path="*" element={<CatchAllNavigate to="/login" />} />
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
