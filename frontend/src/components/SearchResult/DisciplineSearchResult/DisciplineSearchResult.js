import { Link } from "react-router-dom";

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
  return <Link to={`/description/discipline?id=${props.resultData.id}`}>
    <h1>{props.resultData.code} - {props.resultData.name} ({props.resultData.hours}h)</h1>
  </Link>
}

export default DisciplineSearchResult;
