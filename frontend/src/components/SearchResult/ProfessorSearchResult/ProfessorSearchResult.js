import { useNavigate } from "react-router-dom";

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
function DisciplineSearchResult(props) {
  
  const navigate = useNavigate();

  const redirectSearchHandler = () => {
    navigate(`/description/professor?id=${props.resultData.id}`);
  }

  return <div onClick={redirectSearchHandler}>
    <small>{props.resultData.department_name}</small>
    <h1>{props.resultData.siape} -{props.resultData.name}</h1>
  </div>
}

export default DisciplineSearchResult;
