import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import glassIconSrc from "../../icons/glass_icon.jpg";
import styles from "./LoggedHomePage.module.css";

function LoggedHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col self-center mt-10">
      <h1 className="font-bold text-3xl mb-10 text-center">BEM VINDO!</h1>

      <IconButton
        classes={[
          "flex",
          "flex-row",
          "bg-indigo-700",
          "rounded",
          "text-white",
          "mb-4",
          "px-10",
          "py-4",
          "items-center",
          "text-2xl",
        ]}
        content="Explorar"
        icon={require("../../assets/icons/search.png")}
        alt="Explorar"
        onClick={() => navigate("/explore")}
      />
      <IconButton
        classes={[
          "flex",
          "flex-row",
          "bg-indigo-700",
          "rounded",
          "text-white",
          "mb-4",
          "px-10",
          "py-4",
          "items-center",
          "text-2xl",
        ]}
        content="Meus Feedbacks"
        icon={require("../../assets/icons/feedback.png")}
        alt="Meus Feedbacks"
        onClick={() => navigate("/myFeedbacks")}
      />
      <IconButton
        classes={[
          "flex",
          "flex-row",
          "bg-indigo-700",
          "rounded",
          "text-white",
          "mb-4",
          "px-10",
          "py-4",
          "items-center",
          "text-2xl",
        ]}
        content="Meu perfil"
        icon={require("../../assets/icons/profile-user.png")}
        onClick={() => navigate("/myProfile")}
      />
    </div>
  );
}

export default LoggedHomePage;
