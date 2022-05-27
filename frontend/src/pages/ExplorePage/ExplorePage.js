import { useRef, useState } from "react";
import RadioInput from "../../components/RadioInput/RadioInput";
import SearchResult from "../../components/SearchResult/SearchResult";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import { SEARCH_RESULT_TYPES } from "../../utils/consts";

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

const DUMMY_SELECT_OPTIONS = [
  { value: "ALL", label: "Todas as entidades" },
  { value: "PROFESSOR", label: "Professor" },
  { value: "DISCIPLINE", label: "Disciplina" },
  { value: "DISCIPLINE_TAUGHT", label: "Disciplina Ministrada" },
  { value: "FEEDBACK", label: "Feedback" },
  { value: "DISABLED", label: "Opção indisponível", disabled: true },
];

const DUMMY_RADIO_OPTIONS = [
  { id: 'scoreAsc', value: "scoreAsc", label: "Classificação (Crescente)" },
  { id: 'scoreDesc', value: "scoreDesc", label: "Classificação (Decrescente)" },
  { id: 'nameAsc', value: "nameAsc", label: "Nome (Crescente)" },
  { id: 'nameDesc', value: "nameDesc", label: "Nome (Decrescente)" }
];

function ExplorePage() {
  const [searchType, setSearchType] = useState("ALL");
  const [sorting, setSorting] = useState('scoreAsc');

  return (
    <div>
      <h1>ExplorePage</h1>

      <ValidationSelect
        name="Select_Tipo"
        label="Entidade a ser pesquisada"
        hint="Selecione uma entidade"
        value={searchType}
        valueHandler={setSearchType}
        options={DUMMY_SELECT_OPTIONS}
      />

      <RadioInput 
        label='Modo de ordenação'
        name='order'
        options={DUMMY_RADIO_OPTIONS}
        selected={sorting}
        setSelected={setSorting}
      />
      {DUMMY_RESULTS.map((result, i) => (
        <div key={i}>
          <SearchResult type={result.type} resultData={result.resultData} />{" "}
          <br />{" "}
        </div>
      ))}
    </div>
  );
}

export default ExplorePage;
