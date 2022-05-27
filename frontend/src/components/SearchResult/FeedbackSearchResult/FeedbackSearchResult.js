import { useNavigate } from "react-router-dom";
import Tag from "../../Tag/Tag";
/**
 * Componente que representa um resultado de uma pesquisa de Disciplina Ministrada.
 *
 * props:
 *  * resultData (Object): Contém todas as informações necessárias para o a disciplina. Sendo elas:
 *    * code (String): Código identificador da disciplina
 *    * discipline (String): Título da Disciplina
 *    * department (String): Departamento a qual a disciplina pertence
 *    * siape (String): SIAPE do Professor ministrante
 *    * professor (String): Nome do Professor ministrante
 *    * id (String): Identificador único do feedback
 *    * title (String): Título do feedback
 *    * tags (Array): Tags que o aluno deu ao professor nesse feedback
 *    * upvotes (Int): Número de upvotes do feedback
 *    * downvotes (Int): Número de downvotes do feedback
 *    * score (Float 0-10): Classificação geral do feedback
 *    * votable (Boolean): Indica se o usuário pode interagir com esse feedback (se ele é aluno)
 *    * hasVoted (String?): Apenas se for votable. Pode ser nulo, 'UPVOTED' ou 'DOWNVOTED'
 *    * handleVote (Function): Apenas se for votable. Função que lida com o tipo de voto.
 *          parâmetro enviado: isUpvote: Boolean  (talvez seja necessário enviar mais parâmetros)
 */
function DisciplineSearchResult(props) {
  const navigate = useNavigate();

  const redirectSearchHandler = () => {
    navigate("/description/feedback");
  };

  return (
    <div>
      <div onClick={redirectSearchHandler}>
        <small>{props.resultData.department}</small>
        <h1>{props.resultData.title}</h1>
        <h1>
          {props.resultData.code} - {props.resultData.discipline}
        </h1>
        <h1>
          {props.resultData.siape} - {props.resultData.professor}
        </h1>
        {props.resultData.tags.map((t) => (
          <Tag key={t.id} id={t.id} title={t.title} />
        ))}
        <h2>Classificação: {props.resultData.score}</h2>{" "}
        {/* Será substituído pelo componente Stars*/}
      </div>
      <h2>Upvotes: {props.resultData.upvotes}</h2>
      {props.resultData.votable && (
        <button
          disabled={props.resultData.hasVoted === "UPVOTED"}
          onClick={() => props.handleVote(true)}
        >
          +
        </button>
      )}
      <h2>Downvotes: {props.resultData.downvotes}</h2>
      {props.resultData.votable && (
        <button
          disabled={props.resultData.hasVoted === "DOWNVOTED"}
          onClick={() => props.handleVote(false)}
        >
          -
        </button>
      )}
    </div>
  );
}

export default DisciplineSearchResult;