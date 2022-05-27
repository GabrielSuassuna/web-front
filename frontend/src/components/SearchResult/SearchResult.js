import { SEARCH_RESULT_TYPES } from "../../utils/consts";
import DisciplineSearchResult from "./DisciplineSearchResult/DisciplineSearchResult";
import DisciplineTaughtSearchResult from "./DisciplineTaughtSearchResult/DisciplineTaughtSearchResult";
import FeedbackSearchResult from "./FeedbackSearchResult/FeedbackSearchResult";
import ProfessorSearchResult from "./ProfessorSearchResult/ProfessorSearchResult";

/**
 * Componente que representa um resultado de uma pesquisa, podendo ser:
 *  * Disciplina
 *  * Professor
 *  * Disciplina Ministrada
 *  * Feedback
 * 
 * Dependendo do tipo de resultado, o componente se adaptará
 *
 * props:
 *  * type (String): Especifica o tipo de resultado de pesquisa, vide 'consts.js'
 *  * resultData (Object): Contém todas as informações necessárias para o tipo de resultado.
 */
function SearchResult(props) {
  if(props.type === SEARCH_RESULT_TYPES.DISCIPLINE)
    return <DisciplineSearchResult resultData={props.resultData}/>;
  if(props.type === SEARCH_RESULT_TYPES.PROFESSOR)
    return <ProfessorSearchResult resultData={props.resultData}/>;
  if(props.type === SEARCH_RESULT_TYPES.DISCIPLINE_TAUGHT)
    return <DisciplineTaughtSearchResult resultData={props.resultData}/>;
  if(props.type === SEARCH_RESULT_TYPES.FEEDBACK)
    return <FeedbackSearchResult resultData={props.resultData} handleVote={props.handleVote}/>;
}

export default SearchResult;
