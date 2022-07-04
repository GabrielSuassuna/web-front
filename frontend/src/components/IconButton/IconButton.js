import styles from "./IconButton.module.css";

/**
 * Componente que representa um botão estilizado que pode ou não possuir um ícone.
 *
 * props:
 *  * content (String): Texto do botão
 *  * icon (Src): Opcional. Contém a imagem que será usada como ícone, já importada ou como url.
 *  * alt (String): Opcional. Contém o texto alternativo usado como alt caso o ícone não possa ser mostrado.
 *  * disabled (Boolean): Opcional. Indica se o botão está ou não desabilitado.
 *  * onClick (Function): Função que será disparada ao clicar no botão.
 *  * classes (Array): Todas as classes que o botão terá, permitindo sua estilização.
 */
function IconButton(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={[
        "whitespace-nowrap inline-flex items-center justify-center px-4 py-auto h-8 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700",
        ...(props.className || []),
      ].join(" ")}
    >
      {props.icon && (
        <img src={props.icon} alt={props.alt} className={"w-10 mr-10"} />
      )}
      <h1>{props.content}</h1>
    </button>
  );
}

export default IconButton;
