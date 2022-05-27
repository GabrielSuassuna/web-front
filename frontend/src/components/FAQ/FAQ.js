import { useState } from "react";

/**
 * Componente que representa uma pergunta frequente. Pode ou não estar expandida
 *
 * props:
 *  * question (String): Pergunta relativa a  FAQ
 *  * answer (String): Resposta relativa a FAQ
 *  * expanded (Boolean): Indica se a FAQ deve iniciar expandida ou não.
 */
function FAQ(props) {
  const [isExpanded, setIsExpanded] = useState(!!props.expanded);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <h1>{props.question}</h1>
      <button onClick={toggleExpanded}>{isExpanded ? "^" : "v"}</button>
      {isExpanded && <p>{props.answer}</p>}
    </div>
  );
}

export default FAQ;
