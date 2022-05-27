import { Link } from "react-router-dom";

/**
 * Componente que representa uma notificação do usuário
 *
 * props:
 *  * description (String): Descrição da notificação
 *  * onClose (Function): Função ao ser disparada ao clicar no botão de fechar notificação
 *  * link (String): Opcional. Link que irá redirecionar o usuário ao clicar em Saiba Mais.
 */
function Notification(props) {
  return (
    <div>
      <p>
        {props.description}{" "}
        {props.link && <Link to={props.link}>Saiba Mais</Link>}
      </p>
      <button onClick={props.onClose}>X</button>
    </div>
  );
}

export default Notification;
