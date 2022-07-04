import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
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
    <div className="p-4 drop-shadow-lg bg-white rounded">
      <Link to={`/description/feedback?id=${props.resultData.id}`}>
        <h1 className="font-semibold mt-2">{props.resultData.title}</h1>
      </Link>

      {/* <Link to={`/description/discipline?id=${props.resultData.discipline_id}`}>
        <h1>
          {props.resultData.discipline_code} -{" "}
          {props.resultData.discipline_name} (
          {props.resultData.discipline_hours})h
        </h1>
      </Link> */}
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
          rating={props.resultData.general_score / 2}
          starRatedColor="rgb(251, 203, 24)"
          starDimension="32px"
        />
      </div>

      <Link to={`/description/feedback?id=${props.resultData.id}`}>
        <div className="flex mt-2 flex-wrap">
          {props.resultData.tags.map((t, i) => (
            <div className="mr-2">
              <Tag key={i} id={i} title={t} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-2">Periodo: </p>
            <h2 className="bg-red-200 text-red-700 p-1 rounded">
              {props.resultData.period}
            </h2>{" "}
          </div>
          <div className="flex-col justify-center">
            <button>
              <img
                className="transform rotate-180 w-6"
                src={require("../../../assets/icons/down-arrow.png")}
              />
            </button>
            <h2 className="text-center">
              {props.resultData.upvote_count - props.resultData.downvote_count}
            </h2>
            <button>
              <img
                className="w-6"
                src={require("../../../assets/icons/down-arrow.png")}
              />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FeedbackSearchResult;
