import { useNavigate } from "react-router-dom";
import Tag from "../../Tag/Tag";
/**
 * Componente que representa um resultado de uma pesquisa de Disciplina.
 * 
 * props:
 *  * resultData (Object): Contém todas as informações necessárias para o a disciplina. Sendo elas:
 *    * code (String): Código identificador da disciplina
 *    * discipline (String): Título da Disciplina
 *    * department (String): Departamento a qual a disciplina pertence
 *    * tags (Array): Tags mais comuns que a disciplina possui (talvez isso seja removido)
 *    * score (Float 0-10): Classificação geral da disciplina
 */
function DisciplineSearchResult(props) {
  
  const navigate = useNavigate();

  const redirectSearchHandler = () => {
    navigate('/description/discipline');
  }

  return <div onClick={redirectSearchHandler}>
    <small>{props.resultData.department}</small>
    <h1>{props.resultData.code} - {props.resultData.discipline}</h1>
    {props.resultData.tags.map(t => <Tag key={t.id} id={t.id} title={t.title}/>)}
    <h2>Classificação: {props.resultData.score}</h2> {/* Será substituído pelo componente Stars*/}
  </div>
}

export default DisciplineSearchResult;
