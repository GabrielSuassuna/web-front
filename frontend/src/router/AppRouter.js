import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import AboutPage from "../pages/AboutPage/AboutPage";
import DepartmentRegisterPage from "../pages/DepartmentRegisterPage/DepartmentRegisterPage";
import DisciplineDescriptionPage from "../pages/DisciplineDescriptionPage/DisciplineDescriptionPage";
import DisciplineRegisterPage from "../pages/DisciplineRegisterPage/DisciplineRegisterPage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import FAQPage from "../pages/FAQPage/FAQPage";
import FAQRegisterPage from "../pages/FAQRegisterPage/FAQRegisterPage";
import FeedbackCreationPage from "../pages/FeedbackCreationPage/FeedbackCreationPage";
import FeedbackDescriptionPage from "../pages/FeedbackDescriptionPage/FeedbackDescriptionPage";
import HomePage from "../pages/HomePage/HomePage";
import LecturingDescriptionPage from "../pages/LecturingDescriptionPage/LecturingDescriptionPage";
import LecturingRegisterPage from "../pages/LecturingRegisterPage/LecturingRegisterPage";
import LoggedHomePage from "../pages/LoggedHomePage/LoggedHomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MyFeedbacksPage from "../pages/MyFeedbacksPage/MyFeedbacksPage";
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage";
import ProfessorDescriptionPage from "../pages/ProfessorDescriptionPage/ProfessorDescriptionPage";
import ProfessorLoginPage from "../pages/ProfessorLoginPage/ProfessorLoginPage";
import ProfessorRegisterPage from "../pages/ProfessorRegisterPage/ProfessorRegisterPage";
import RegisterDeletionPage from "../pages/RegisterDeletionPage/RegisterDeletionPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ReportedFeedbackPage from "../pages/ReportedFeedbackPage/ReportedFeedbackPage";
import ReportedFeedbacksPage from "../pages/ReportedFeedbacksPage/ReportedFeedbacksPage";
import TagRegisterPage from "../pages/TagRegisterPage/TagRegisterPage";
import Header from "../components/Header/Header";
import DepartmentDescriptionPage from "../pages/DepartmentDescriptionPage/DepartmentDescriptionPage";
import OpenReportsPage from "../pages/OpenReportsPage/OpenReportsPage";
import AuthRedirect from "./AuthRedirect";
import { AUTH_LEVELS } from "../utils/consts";
import DepartmentEditPage from "../pages/DepartmentEditPage/DepartmentEditPage";
import ProfessorEditPage from "../pages/ProfessorEditPage/ProfessorEditPage";

/**
 * Esse componente é responsável por fazer o roteamento das páginas da aplicação.
 * Cada página tem uma rota em específica que a redireciona para uma página contida na pasta /pages
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="*" element={<NavBar />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/login"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.GUEST]}>
              <LoginPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/login/professor"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.GUEST]}>
              <ProfessorLoginPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/loggedHome"
          element={
            <AuthRedirect levels={[]}>
              <LoggedHomePage />
            </AuthRedirect>
          }
        />

        <Route
          path="/myProfile"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.PROFESSOR, AUTH_LEVELS.STUDENT]}>
              <MyProfilePage />
            </AuthRedirect>
          }
        />
        <Route path="/me" element={<Navigate to="/myProfile" replace />} />

        <Route
          path="/myFeedbacks"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.PROFESSOR, AUTH_LEVELS.STUDENT]}>
              <MyFeedbacksPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/department"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN]}>
              <DepartmentRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/edit/department"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <DepartmentEditPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/discipline"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <DisciplineRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/faq"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <FAQRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/feedback"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.STUDENT]}>
              <FeedbackCreationPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/professor"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <ProfessorRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/edit/professor"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.PROFESSOR]}>
              <ProfessorEditPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/lecturing"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.PROFESSOR]}>
              <LecturingRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/remove"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <RegisterDeletionPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/student"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.GUEST]}>
              <RegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register/tag"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.ADMIN, AUTH_LEVELS.HEAD]}>
              <TagRegisterPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/description/department"
          element={<DepartmentDescriptionPage />}
        />
        <Route
          path="/description/discipline"
          element={<DisciplineDescriptionPage />}
        />
        <Route
          path="/description/feedback"
          element={<FeedbackDescriptionPage />}
        />
        <Route
          path="/description/professor"
          element={<ProfessorDescriptionPage />}
        />
        <Route
          path="/description/lecturing"
          element={<LecturingDescriptionPage />}
        />
        <Route
          path="/revision/report"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.PROFESSOR]}>
              <ReportedFeedbackPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/revision/reports"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.HEAD]}>
              <OpenReportsPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/revision/myReports"
          element={
            <AuthRedirect levels={[AUTH_LEVELS.PROFESSOR]}>
              <ReportedFeedbacksPage />
            </AuthRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
