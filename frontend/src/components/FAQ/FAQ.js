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
    <div className="shadow-lg bg-neutral-100 mb-4 rounded-lg w-6/12 px-4 py-4">
      <div className="flex flex-row justify-between w-full ">
        <h1 className="uppercase font-bold">{props.question}</h1>
        <button onClick={toggleExpanded}>
          {isExpanded ? (
            <img
              className="transform rotate-180 w-10"
              src={require("../../assets/icons/down-arrow.png")}
            />
          ) : (
            <img
              className="w-10"
              src={require("../../assets/icons/down-arrow.png")}
            />
          )}
        </button>
      </div>
      {isExpanded && <p>{props.answer}</p>}
    </div>
  );
}

export default FAQ;
