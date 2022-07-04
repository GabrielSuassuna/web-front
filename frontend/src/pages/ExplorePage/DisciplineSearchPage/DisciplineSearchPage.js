import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import IconButton from "../../../components/IconButton/IconButton";
import SearchResult from "../../../components/SearchResult/SearchResult";
import ValidationInput from "../../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../../components/ValidationSelect/ValidationSelect";
import fetcher from "../../../utils/fetcher";
import { checkForErrors } from "../../../utils/apiReq";
import { PAGE_LIMIT, SEARCH_RESULT_TYPES } from "../../../utils/consts";
import URL from "../../../config/api";

function DisciplineSearchPage(props) {
  const disciplineNameRef = useRef(null);
  const disciplineCodeRef = useRef(null);
  const disciplineHoursRef = useRef(null);

  const [results, setResults] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleSearch = (pageNumber) => {
    let url = URL + "/discipline?";
    url += `name=${disciplineNameRef.current.value}`;
    url += `&code=${disciplineCodeRef.current.value}`;
    url += `&hours=${disciplineHoursRef.current.value}`;
    url += `&page=${pageNumber}`;
    url += `&limit=${PAGE_LIMIT}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length === 0) {
          alert("Nenhum resultado encontrado");
        }
        setResults(res.data);
        setHasNextPage(res.message.split("last=")[1] === "FALSE");
      });
  };

  const handlePageChange = (change) => {
    handleSearch(change);
    setPageIndex(change);
  };

  return (
    <div className="flex flex-col">
      <div className="flex max-w-2xl mb-4">
        <ValidationInput
          label="Nome da Disciplina"
          hint="ex: Algoritmos Aproximativos"
          type="text"
          name="name"
          className={["mr-4"]}
          inputRef={disciplineNameRef}
        />
        <ValidationInput
          label="Código da Disciplina"
          hint="ex: CC0101"
          type="text"
          name="code"
          inputRef={disciplineCodeRef}
        />
      </div>
      <div className="flex w-64 items-end mb-8">
        <ValidationInput
          className={["mr-4"]}
          label="Carga horária da Disciplina"
          hint="ex: 64"
          type="number"
          name="hours"
          inputRef={disciplineHoursRef}
        />
        <div className="mb-1">
          <IconButton content="Pesquisar" onClick={() => handlePageChange(1)} />
        </div>
      </div>

      <div className="flex flex-wrap">
        {results.map((result, i) => (
          <div key={i}>
            <SearchResult
              type={SEARCH_RESULT_TYPES.DISCIPLINE}
              resultData={result}
            />{" "}
            <br />{" "}
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="flex items-center ml-auto">
          <IconButton
            content="<"
            className={["mr-4"]}
            disabled={pageIndex === 1}
            onClick={() => handlePageChange(pageIndex - 1)}
          />
          <h1>{pageIndex}</h1>
          <IconButton
            content=">"
            className={["ml-4"]}
            disabled={!hasNextPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          />
        </div>
      )}
    </div>
  );
}

export default DisciplineSearchPage;
