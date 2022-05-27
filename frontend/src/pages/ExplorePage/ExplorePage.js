import SearchResult from "../../components/SearchResult/SearchResult";
import { SEARCH_RESULT_TYPES } from "../../utils/consts";

const DUMMY_RESULTS = [
  {
    type: SEARCH_RESULT_TYPES.DISCIPLINE,
    resultData: {
      code: 'CK0101',
      discipline: 'Desenvolvimento de Software para Web',
      department: 'Departamento de Computação',
      tags: [{id: 'ID_tag_aulas_objetivas', title: 'Aulas Objetivas'}, {id: 'ID_tag_visao_mercado', title: 'Visão de Mercado'}],
      score: 8.7,
    }
  },
  {
    type: SEARCH_RESULT_TYPES.DISCIPLINE_TAUGHT,
    resultData: {
      code: 'CK0101',
      discipline: 'Desenvolvimento de Software para Web',
      siape: '010101',
      professor: 'Fernando Trinta',
      department: 'Departamento de Computação',
      tags: [{id: 'ID_tag_aulas_objetivas', title: 'Aulas Objetivas'}, {id: 'ID_tag_visao_mercado', title: 'Visão de Mercado'}],
      score: 9,
      feedbackCount: 12,
    }
  },
  {
    type: SEARCH_RESULT_TYPES.FEEDBACK,
    resultData: {
      code: 'CK0101',
      discipline: 'Desenvolvimento de Software para Web',
      siape: '010101',
      professor: 'Fernando Trinta',
      department: 'Departamento de Computação',
      id: 'ID_feedback_1242',
      title: 'Professor objetivo!',
      tags: [{id: 'ID_tag_aulas_objetivas', title: 'Aulas Objetivas'}, {id: 'ID_tag_visao_mercado', title: 'Visão de Mercado'}],
      score: 10,
      upvotes: 5,
      downvotes: 1,
    }
  },
  {
    type: SEARCH_RESULT_TYPES.PROFESSOR,
    resultData: {
      siape: '010101',
      professor: 'Fernando Trinta',
      department: 'Departamento de Computação',
      tags: [{id: 'ID_tag_aulas_objetivas', title: 'Aulas Objetivas'}, {id: 'ID_tag_visao_mercado', title: 'Visão de Mercado'}],
      score: 9,
    }
  }
]

function ExplorePage() {
  return (
    <div>
      <h1>ExplorePage</h1>
      {DUMMY_RESULTS.map(result => <><SearchResult type={result.type} resultData={result.resultData}/> <br/> </>)}
    </div>
  );
}

export default ExplorePage;
 