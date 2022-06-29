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
import FeedbackRevisionPage from "../pages/FeedbackRevisionPage/FeedbackRevisionPage";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/professor" element={<ProfessorLoginPage />} />
        <Route path="/loggedHome" element={<LoggedHomePage />} />
        <Route path="/me" element={<Navigate to="/myProfile" replace />} />
        <Route path="/myProfile" element={<MyProfilePage />} />
        <Route path="/myFeedbacks" element={<MyFeedbacksPage />} />
        <Route
          path="/register/department"
          element={<DepartmentRegisterPage />}
        />
        <Route
          path="/register/discipline"
          element={<DisciplineRegisterPage />}
        />
        <Route path="/register/faq" element={<FAQRegisterPage />} />
        <Route path="/register/feedback" element={<FeedbackCreationPage />} />
        <Route path="/register/professor" element={<ProfessorRegisterPage />} />
        <Route path="/register/lecturing" element={<LecturingRegisterPage />} />
        <Route path="/register/remove" element={<RegisterDeletionPage />} />
        <Route path="/register/student" element={<RegisterPage />} />
        <Route path="/register/tag" element={<TagRegisterPage />} />
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
        <Route path="/revision/feedback" element={<FeedbackRevisionPage />} />
        <Route path="/revision/report" element={<ReportedFeedbackPage />} />
        <Route path="/revision/reports" element={<OpenReportsPage />} />
        <Route path="/revision/myReports" element={<ReportedFeedbacksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
