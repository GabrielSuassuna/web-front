import { useState } from "react";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import { SEARCH_RESULT_TYPES } from "../../utils/consts";
import ProfessorSearchPage from "./ProfessorSearchPage/ProfessorSearchPage";
import DisciplineSearchPage from "./DisciplineSearchPage/DisciplineSearchPage";
import LecturingSearchPage from "./LecturingSearchPage/LecturingSearchPage";
import FeedbackSearchPage from "./FeedbackSearchPage/FeedbackSearchPage";


const SELECT_OPTIONS = [
  { value: SEARCH_RESULT_TYPES.PROFESSOR, label: "Professor" },
  { value: SEARCH_RESULT_TYPES.DISCIPLINE, label: "Disciplina" },
  { value: SEARCH_RESULT_TYPES.LECTURING, label: "Disciplina Ministrada" },
  { value: SEARCH_RESULT_TYPES.FEEDBACK, label: "Feedback" },
];

function ExplorePage() {
  const [searchType, setSearchType] = useState(SEARCH_RESULT_TYPES.PROFESSOR);

  let renderedExplorePage;

  switch (searchType) {
    case SEARCH_RESULT_TYPES.PROFESSOR:
      renderedExplorePage = <ProfessorSearchPage />;
      break;
    case SEARCH_RESULT_TYPES.DISCIPLINE:
      renderedExplorePage = <DisciplineSearchPage />;
      break;
    case SEARCH_RESULT_TYPES.LECTURING:
      renderedExplorePage = <LecturingSearchPage />;
      break;
    case SEARCH_RESULT_TYPES.FEEDBACK:
      renderedExplorePage = <FeedbackSearchPage />;
      break;
    default:
      renderedExplorePage = <></>;
      break;
  }

  return (
    <div className="px-8 py-6">
      <h1 className="text-4xl font-bold mb-4">Explorar</h1>
      <h3 className="text-lg mb-8">
        Consulte feedbacks, professores, disciplinas, e muito mais...
      </h3>

      <ValidationSelect
        className={["max-w-md mb-4"]}
        name="Select_Tipo"
        label="Entidade a ser pesquisada"
        hint="Selecione uma entidade"
        value={searchType}
        valueHandler={setSearchType}
        options={SELECT_OPTIONS}
      />
      {renderedExplorePage}
    </div>
  );
}

export default ExplorePage;
