import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import glassIconSrc from "../../icons/glass_icon.jpg";
import styles from "./LoggedHomePage.module.css";

function LoggedHomePage() {

  const navigate = useNavigate();

  return (
    <div>
      <h1>LoggedHomePage</h1>

      <IconButton 
        content='Explorar'
        icon='https://static.vecteezy.com/system/resources/previews/000/439/746/non_2x/vector-find-icon.jpg'
        alt='Clique para explorar!'
        onClick={()=>navigate('/explore')}
      />
      <IconButton 
        content='Explorar'
        icon={glassIconSrc}
        alt='Clique para explorar!'
        onClick={()=>navigate('/explore')}
      />
      <IconButton 
        content='Meu perfil'
        classes={[styles.boldText]}
        onClick={()=>navigate('/myProfile')}
      />
    </div>
  );
}

export default LoggedHomePage;
