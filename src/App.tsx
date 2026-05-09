import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./provider/data";
import Dashboard from "./pages/dashboard";
import { BookOpen, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/list";
import SubjectCreate from "./pages/subjects/create";
import ShowSubject from "./pages/subjects/show";
import ClassesCreate from "./pages/classes/create";
import ClassesList from "./pages/classes/list";
import Show from "./pages/classes/show";
import UsersList from "./pages/users/list";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "ASH1Cq-6xSiOd-73bCFb",
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
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route path="/" element={<Dashboard />} />

                  <Route path="users">
                    <Route index element={<UsersList />} />
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
