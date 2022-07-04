import { Link } from "react-router-dom";

/**
 * Componente que representa um resultado de uma pesquisa de Professor.
 *
 * props:
 *  * resultData (Object): Contém todas as informações necessárias para o a disciplina. Sendo elas:
 *    * siape (String): SIAPE do Professor ministrante
 *    * professor (String): Nome do Professor ministrante
 *    * department (String): Departamento a qual a disciplina pertence
 *    * tags (Array): Tags mais comuns que o professor possui ministrando essa disciplina
 *    * score (Float 0-10): Classificação geral do professor ministrando essa disciplina
 */
function ProfessorSearchResult(props) {
  return (
    <div className="p-4 drop-shadow-lg bg-white rounded">
      <Link to={`/description/department?id=${props.resultData.department_id}`}>
        <small className="bg-orange-200 text-yellow-700 p-1 rounded mb-4">
          {props.resultData.department_name}
        </small>
      </Link>
      <Link to={`/description/professor?id=${props.resultData.id}`}>
        <h1 className="font-semibold mt-2">{props.resultData.name}</h1>
        <p className="text-sm">SIAPE: {props.resultData.siape}</p>
      </Link>
    </div>
  );
}

export default ProfessorSearchResult;
