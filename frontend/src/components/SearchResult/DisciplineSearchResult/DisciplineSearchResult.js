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
  return (
    <Link to={`/description/discipline?id=${props.resultData.id}`}>
      <div className="p-4 drop-shadow-lg bg-white rounded">
        <small className="bg-orange-200 text-yellow-700 p-1 rounded mb-4">
          {props.resultData.code}
        </small>
        <h1 className="font-semibold mt-2">{props.resultData.name}</h1>
        <p className="text-sm">Carga horária: {props.resultData.hours} horas</p>
      </div>
    </Link>
  );
}

export default DisciplineSearchResult;
