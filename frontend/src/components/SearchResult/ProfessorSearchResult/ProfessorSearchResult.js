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
    <div>
      <Link to={`/description/department?id=${props.resultData.department_id}`}>
        <small>{props.resultData.department_name}</small>
      </Link>
      <Link to={`/description/professor?id=${props.resultData.id}`}>
        <h1>{props.resultData.siape} -{props.resultData.name}</h1>
      </Link>
    </div>
  )
}

export default ProfessorSearchResult;
