import { useState, useRef, useEffect } from "react";
import IconButton from "../../components/IconButton/IconButton";
import SearchResult from "../../components/SearchResult/SearchResult";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import { apiRequest} from "../../utils/apiReq";
import { SEARCH_RESULT_TYPES, REPORT_UPDATE_TYPES, REPORT_UPDATE_TRANSLATION, PAGE_LIMIT } from "../../utils/consts";
import URL from "../../config/api";
import { getAuthData } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const REPORT_STATUS_OPTIONS = [{
  label: "Todos os estados",
  value: ""
}];
for(let s in REPORT_UPDATE_TYPES){
  REPORT_STATUS_OPTIONS.push({
    label: REPORT_UPDATE_TRANSLATION[s],
    value: REPORT_UPDATE_TYPES[s]
  });
}

function ReviewedFeedbacks() {
  const navigate = useNavigate();

  const authorNameRef = useRef(null);
  const authorSiapeRef = useRef(null);
  const feedbackTitleRef = useRef(null);

  const [feedbackStatus, setFeedbackStatus] = useState(REPORT_STATUS_OPTIONS[0].value);
  const [results, setResults] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const checkRef = (ref) => {
    if(!ref || ref.current)
      return ref.current.value
    return '';
  }

  const handleSearch = (pageNumber) => {
    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;

    let url = URL + `/report/reviewer/${userId}?`;  
    url += `authorName=${checkRef(authorNameRef)}`;
    url += `&authorSiape=${checkRef(authorSiapeRef)}`;
    url += `&title=${checkRef(feedbackTitleRef)}`;
    url += `&status=${feedbackStatus}`;
    url += `&page=${pageNumber}`;
    url += `&limit=${PAGE_LIMIT}`;
    apiRequest(
      "GET",
      url,
      null,
      (res) => {
        console.log(res)
        setResults(res.data);
        setHasNextPage( res.message.split("last=")[1] === "FALSE" );
      },
      (res) => {
        console.log(res.message);
        console.log(res.errorStack);
        setResults([]);
        setHasNextPage( false );
      },
      token
    );
  };
  

  const handlePageChange = (change) => {
    handleSearch(change);
    setPageIndex(change);
  };

  useEffect(() => {
    handlePageChange(1);
  }, []);

  return (
    <div>
      {showFilter && (
        <>
          <ValidationInput
            label="Nome do Autor"
            hint="ex: Fulano de Tal Cicrano de Oliveira"
            type="text"
            name="authorName"
            inputRef={authorNameRef}
          />
          <ValidationInput
            label="SIAPE do Autor"
            hint="ex: 123456"
            type="text"
            name="authorSiape"
            inputRef={authorSiapeRef}
          />
          <ValidationInput
            label="Título do Feedback"
            hint="ex: Professor é..."
            type="text"
            name="feedbackTitle"
            inputRef={feedbackTitleRef}
          />
          <ValidationSelect
            name="status"
            label="Estado da denúncia"
            hint="Selecione um estado"
            value={feedbackStatus}
            valueHandler={setFeedbackStatus}
            options={REPORT_STATUS_OPTIONS}
          />
          <IconButton content="Pesquisar" onClick={() => handlePageChange(1)} />
        </>
      )}
      <hr/>
      <IconButton
        content={showFilter ? "Ocultar filtros" : "Filtrar feedbacks"}
        onClick={() => setShowFilter((showwing) => !showwing)}
      />
      {results.length > 0 && (
        <>
          <IconButton
            content="<"
            disabled={pageIndex === 1}
            onClick={() => handlePageChange(pageIndex - 1)}
          />
          <h1>{pageIndex}</h1>
          <IconButton
            content=">"
            disabled={!hasNextPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          />
        </>
      )}
      {results.map((result, i) => (
        <div key={i}>
          <SearchResult
            type={SEARCH_RESULT_TYPES.REPORT}
            resultData={result}
          />{" "}
          <br />{" "}
        </div>
      ))}
    </div>
  );
}

export default ReviewedFeedbacks;
