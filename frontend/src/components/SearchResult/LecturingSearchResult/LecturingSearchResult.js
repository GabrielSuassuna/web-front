import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
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
    <div className="p-4 drop-shadow-lg bg-white rounded">
      <Link to={`/description/discipline?id=${props.resultData.discipline_id}`}>
        <h1 className="font-semibold mt-2">
          {props.resultData.discipline_code} -{" "}
          {props.resultData.discipline_name} (
          {props.resultData.discipline_hours})h
        </h1>
      </Link>
      <div className="flex items-center mt-2">
        <Link to={`/description/professor?id=${props.resultData.professor_id}`}>
          <h1 className="mr-2">{props.resultData.professor_name}</h1>
        </Link>
        <Link
          to={`/description/department?id=${props.resultData.professor_department_id}`}
        >
          <small className="bg-orange-200 text-yellow-700 p-1 rounded mb-4">
            {props.resultData.professor_department}
          </small>
        </Link>
      </div>

      <div className="mt-2">
        <StarRatings
          rating={props.resultData.average_score / 2}
          starRatedColor="rgb(251, 203, 24)"
          starDimension="32px"
        />
      </div>

      <Link to={`/description/lecturing?id=${props.resultData.id}`}>
        <small>{props.resultData.feedback_count} feedbacks</small>
      </Link>
    </div>
  );
}

export default LecturingSearchResult;
