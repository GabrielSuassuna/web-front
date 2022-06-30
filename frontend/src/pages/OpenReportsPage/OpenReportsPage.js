import { useState, useRef, useEffect} from "react";
import IconButton from "../../components/IconButton/IconButton";
import SearchResult from "../../components/SearchResult/SearchResult";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { SEARCH_RESULT_TYPES, DUMMY_AUTH_TOKEN } from "../../utils/consts";
import URL from "../../config/api";

const DUMMY_USER_ID = 11;

function OpenReportsPage() {
  const authorNameRef = useRef(null);
  const authorSiapeRef = useRef(null);
  const feedbackTitleRef = useRef(null);

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
    let url = URL + `/report?`;
    url += `viewerId=${DUMMY_USER_ID}`;  
    url += `&authorName=${checkRef(authorNameRef)}`;
    url += `&authorSiape=${checkRef(authorSiapeRef)}`;
    url += `&title=${checkRef(feedbackTitleRef)}`;
    url += `&page=${pageNumber}`;
    url += `&limit=10`;
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
      DUMMY_AUTH_TOKEN
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
            name="reviewerName"
            inputRef={authorNameRef}
          />
          <ValidationInput
            label="SIAPE do Autor"
            hint="ex: 123456"
            type="text"
            name="reviewerSiape"
            inputRef={authorSiapeRef}
          />
          <ValidationInput
            label="Título do Feedback"
            hint="ex: Professor é..."
            type="text"
            name="feedbackTitle"
            inputRef={feedbackTitleRef}
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

export default OpenReportsPage;
