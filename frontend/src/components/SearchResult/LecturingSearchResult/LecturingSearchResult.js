import { Link, useNavigate } from "react-router-dom";
import Tag from "../../Tag/Tag";
/** TODO: Atualizar documentação
 * Componente que representa um resultado de uma pesquisa de Disciplina Ministrada.
 *
 * props:
 *  * resultData (Object): Contém todas as informações necessárias para o a disciplina. Sendo elas:
 *    * code (String): Código identificador da disciplina
 *    * discipline (String): Título da Disciplina
 *    * siape (String): SIAPE do Professor ministrante
 *    * professor (String): Nome do Professor ministrante
 *    * department (String): Departamento a qual a disciplina pertence
 *    * tags (Array): Tags mais comuns que o professor possui ministrando essa disciplina
 *    * score (Float 0-10): Classificação geral do professor ministrando essa disciplina
 *    * feedbackCount (Int): Número de feedbacks que esse professor possui ministrando essa disciplina
 */
function LecturingSearchResult(props) {
  return (
    <div>
      <Link
        to={`/description/department?id=${props.resultData.professor_department_id}`}
      >
        <small>{props.resultData.professor_department}</small>
      </Link>
      <Link to={`/description/discipline?id=${props.resultData.discipline_id}`}>
        <h1>
          {props.resultData.discipline_code} -{" "}
          {props.resultData.discipline_name} (
          {props.resultData.discipline_hours})h
        </h1>
      </Link>
      <Link to={`/description/professor?id=${props.resultData.professor_id}`}>
        <h1>
          {props.resultData.professor_siape} -{props.resultData.professor_name}
        </h1>
      </Link>
      <Link to={`/description/lecturing?id=${props.resultData.id}`}>
        {props.resultData.feedback_count > 0 && (
          <h2>Classificação: {props.resultData.average_score}</h2>
        )}
        <small>{props.resultData.feedback_count} feedbacks</small>
      </Link>
    </div>
  );
}

export default LecturingSearchResult;
