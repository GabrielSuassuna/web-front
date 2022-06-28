import { Link } from "react-router-dom";
import Tag from "../../Tag/Tag";
/**
 * Componente que representa um resultado de uma pesquisa de Disciplina Ministrada.
 *
 * props: TODO: Refazer documentação
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
function FeedbackSearchResult(props) {
  return (
    <div>
      <Link
        to={`/description/department?id=${props.resultData.professor_department_id}`}
      >
        <small>{props.resultData.professor_department}</small>
      </Link>
      <Link to={`/description/feedback?id=${props.resultData.id}`}>
        <h1>{props.resultData.title}</h1>
      </Link>
      <Link to={`/description/discipline?id=${props.resultData.discipline_id}`}>
        <h1>
          {props.resultData.discipline_code} -{" "}
          {props.resultData.discipline_name}{" "}
          ({props.resultData.discipline_hours})h
        </h1>
      </Link>
      <Link to={`/description/professor?id=${props.resultData.professor_id}`}>
        <h1>
          {props.resultData.professor_siape} - {props.resultData.professor_name}
        </h1>
      </Link>
      <Link to={`/description/feedback?id=${props.resultData.id}`}>
        {props.resultData.tags.map((t, i) => (
          <Tag key={i} id={i} title={t} />
        ))}
        <h2>Período: {props.resultData.period}</h2>{" "}
        <h2>Classificação: {props.resultData.general_score}</h2>{" "}
        <h2>Upvotes: {props.resultData.upvote_count}</h2>
        <h2>Downvotes: {props.resultData.downvote_count}</h2>
      </Link>
    </div>
  );
}

export default FeedbackSearchResult;
