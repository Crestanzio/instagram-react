import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ProtectedRoute from "./Helpers/protected.route";
import * as ROUTES from "./Constants/routes";
import UserContext from "./Context/user";
import useAuthListener from "./Hooks/useAuthListener";

const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Profile = lazy(() => import("./Pages/Profile"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Spinner = lazy(() => import("./Components/Spinner"));

function App() {
  const { user } = useAuthListener();

  return (
    <div className="App">
      <UserContext.Provider value={{ user }}>
        <Router basename={ROUTES.RELATIVE_PATH}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route element={<ProtectedRoute.Login user={user} />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              </Route>
              <Route element={<ProtectedRoute.Dashboard user={user} />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard user={user} />} />
              </Route>
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;