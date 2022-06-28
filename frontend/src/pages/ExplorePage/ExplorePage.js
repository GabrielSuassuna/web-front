import { useState } from "react";
import RadioInput from "../../components/RadioInput/RadioInput";
import SearchResult from "../../components/SearchResult/SearchResult";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import IconButton from "../../components/IconButton/IconButton";
import { SEARCH_RESULT_TYPES } from "../../utils/consts";
import ProfessorSearchPage from "./ProfessorSearchPage/ProfessorSearchPage";
import DisciplineSearchPage from "./DisciplineSearchPage/DisciplineSearchPage";
import LecturingSearchPage from "./LecturingSearchPage/LecturingSearchPage";
import FeedbackSearchPage from "./FeedbackSearchPage/FeedbackSearchPage";

const DUMMY_RESULTS = [
  {
    type: SEARCH_RESULT_TYPES.DISCIPLINE,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      department: "Departamento de Computação",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 8.7,
    },
  },
  {
    type: SEARCH_RESULT_TYPES.DISCIPLINE_TAUGHT,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 9,
      feedbackCount: 12,
    },
  },
  {
    type: SEARCH_RESULT_TYPES.FEEDBACK,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      id: "ID_feedback_1242",
      title: "Professor objetivo!",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 10,
      upvotes: 5,
      downvotes: 1,
    },
  },
  {
    type: SEARCH_RESULT_TYPES.FEEDBACK,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      id: "ID_feedback_1242",
      title: "Professor objetivo!",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 10,
      upvotes: 5,
      downvotes: 1,
      votable: true,
    },
  },
  {
    type: SEARCH_RESULT_TYPES.FEEDBACK,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      id: "ID_feedback_1242",
      title: "Professor legal!",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 10,
      upvotes: 5,
      downvotes: 1,
      votable: true,
      hasVoted: 'UPVOTED'
    },
  },
  {
    type: SEARCH_RESULT_TYPES.FEEDBACK,
    resultData: {
      code: "CK0101",
      discipline: "Desenvolvimento de Software para Web",
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      id: "ID_feedback_1242",
      title: "Professor ruim!",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 2,
      upvotes: 1,
      downvotes: 6,
      votable: true,
      hasVoted: 'DOWNVOTED'
    },
  },
  {
    type: SEARCH_RESULT_TYPES.PROFESSOR,
    resultData: {
      siape: "010101",
      professor: "Fernando Trinta",
      department: "Departamento de Computação",
      tags: [
        { id: "ID_tag_aulas_objetivas", title: "Aulas Objetivas" },
        { id: "ID_tag_visao_mercado", title: "Visão de Mercado" },
      ],
      score: 9,
    },
  },
];

const SELECT_OPTIONS = [
  { value: SEARCH_RESULT_TYPES.PROFESSOR, label: "Professor" },
  { value: SEARCH_RESULT_TYPES.DISCIPLINE, label: "Disciplina" },
  { value: SEARCH_RESULT_TYPES.LECTURING, label: "Disciplina Ministrada" },
  { value: SEARCH_RESULT_TYPES.FEEDBACK, label: "Feedback" }
];

const DUMMY_RADIO_OPTIONS = [
  { id: 'scoreAsc', value: "scoreAsc", label: "Classificação (Crescente)" },
  { id: 'scoreDesc', value: "scoreDesc", label: "Classificação (Decrescente)" },
  { id: 'nameAsc', value: "nameAsc", label: "Nome (Crescente)" },
  { id: 'nameDesc', value: "nameDesc", label: "Nome (Decrescente)" }
];

function ExplorePage() {
  const [searchType, setSearchType] = useState(SEARCH_RESULT_TYPES.PROFESSOR);
  const [sorting, setSorting] = useState('scoreAsc');

  let renderedExplorePage;

  switch(searchType){
    case SEARCH_RESULT_TYPES.PROFESSOR:
      renderedExplorePage = <ProfessorSearchPage />
      break;
    case SEARCH_RESULT_TYPES.DISCIPLINE:
      renderedExplorePage = <DisciplineSearchPage />
      break;
    case SEARCH_RESULT_TYPES.LECTURING:
      renderedExplorePage = <LecturingSearchPage />
      break;
    case SEARCH_RESULT_TYPES.FEEDBACK:
      renderedExplorePage = <FeedbackSearchPage />
      break;
    default:
      renderedExplorePage = <></>;
      break;
  }

  
  return (
    <div>
      <h1>ExplorePage</h1>

      <ValidationSelect
        name="Select_Tipo"
        label="Entidade a ser pesquisada"
        hint="Selecione uma entidade"
        value={searchType}
        valueHandler={setSearchType}
        options={SELECT_OPTIONS}
      />

      {/* <RadioInput 
        label='Modo de ordenação'
        name='order'
        options={DUMMY_RADIO_OPTIONS}
        selected={sorting}
        setSelected={setSorting}
      /> */}
      {renderedExplorePage}
      {/*DUMMY_RESULTS.map((result, i) => (
        <div key={i}>
          <SearchResult type={result.type} resultData={result.resultData} handleVote={(v)=>alert(v)} />{" "}
          <br />{" "}
        </div>
      ))*/}
    </div>
  );
}

export default ExplorePage;
