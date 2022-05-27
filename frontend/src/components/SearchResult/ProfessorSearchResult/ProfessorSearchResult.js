import { useNavigate } from "react-router-dom";
import Tag from "../../Tag/Tag";
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
    navigate('/description/professor');
  }

  return <div onClick={redirectSearchHandler}>
    <small>{props.resultData.department}</small>
    <h1>{props.resultData.siape} -{props.resultData.professor}</h1>
    {props.resultData.tags.map(t => <Tag key={t.id} id={t.id} title={t.title}/>)}
    <h2>Classificação: {props.resultData.score}</h2> {/* Será substituído pelo componente Stars*/}
  </div>
}

export default DisciplineSearchResult;
