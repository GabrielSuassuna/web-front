import { useNavigate } from "react-router-dom";
import Tag from "../../Tag/Tag";
/**
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
function DisciplineSearchResult(props) {
  
  const navigate = useNavigate();

  const redirectSearchHandler = () => {
    navigate('/description/disciplineTaught');
  }

  return <div onClick={redirectSearchHandler}>
    <small>{props.resultData.department}</small>
    <h1>{props.resultData.code} - {props.resultData.discipline}</h1>
    <h1>{props.resultData.siape} -{props.resultData.professor}</h1>
    {props.resultData.tags.map(t => <Tag key={t.id} id={t.id} title={t.title}/>)}
    <h2>Classificação: {props.resultData.score}</h2> {/* Será substituído pelo componente Stars*/}
    <small>{props.resultData.feedbackCount} feedbacks</small>
  </div>
}

export default DisciplineSearchResult;
