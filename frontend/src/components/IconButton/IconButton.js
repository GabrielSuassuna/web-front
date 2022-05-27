import styles from "./IconButton.module.css";

/**
 * Componente que representa um botão estilizado que pode ou não possuir um ícone.
 *
 * props:
 *  * content (String): Texto do botão
 *  * icon (Src): Opcional. Contém a imagem que será usada como ícone, já importada ou como url.
 *  * alt (String): Opcional. Contém o texto alternativo usado como alt caso o ícone não possa ser mostrado.
 *  * onClick (Function): Função que será disparada ao clicar no botão.
 *  * classes (Array): Todas as classes que o botão terá, permitindo sua estilização.
 */
function IconButton(props) {
  return (
    <div
      onClick={props.onClick}
      className={
        props.classes
          ? `${props.classes.join(" ")} ${styles.iconButton}`
          : styles.iconButton
      }
    >
    {props.icon && <img src={props.icon} alt={props.alt} className={styles.iconButonImage}/>} 
      <h1>{props.content}</h1>
    </div>
  );
}

export default IconButton;
