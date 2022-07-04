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

function ProfessorSearchPage() {
  const professorNameRef = useRef(null);
  const professorSiapeRef = useRef(null);

  const [professorDepartment, setProfessorDepartment] = useState(null);
  const [deptOptions, setDeptOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { data: departments, error: departmentsError } = useSWR(
    `${URL}/department/`,
    fetcher
  );

  checkForErrors([departmentsError]);

  useEffect(() => {
    if (!departments || !departments.data || loaded) {
      return;
    }
    let deptOptions = departments.data.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });
    setDeptOptions([
      { value: "", label: "Todos os departamentos" },
      ...deptOptions,
    ]);
    setProfessorDepartment("");
    setLoaded(true);
  }, [deptOptions, departments, loaded]);

  const handleSearch = (pageNumber) => {
    let url = URL + "/professor?";
    url += `departmentId=${professorDepartment}`;
    url += `&name=${professorNameRef.current.value}`;
    url += `&siape=${professorSiapeRef.current.value}`;
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
          className={["mr-4"]}
          label="Nome do Professor"
          hint="ex: Fulano de Tal Cicrano de Oliveira"
          type="text"
          name="name"
          inputRef={professorNameRef}
        />
        <ValidationInput
          label="SIAPE do Professor"
          hint="ex: 12345"
          type="text"
          name="siape"
          inputRef={professorSiapeRef}
        />
      </div>

      <div className="flex max-w-2xl items-end mb-8">
        <ValidationSelect
          className={["mr-4"]}
          name="dept"
          label="Departamento"
          hint="Selecione um departamento"
          value={professorDepartment}
          valueHandler={setProfessorDepartment}
          options={deptOptions}
        />
        <div className="mb-1">
          <IconButton content="Pesquisar" onClick={() => handlePageChange(1)} />
        </div>
      </div>

      <div className="flex flex-wrap">
        {results.map((result, i) => (
          <div key={i} className="mr-4">
            <SearchResult
              type={SEARCH_RESULT_TYPES.PROFESSOR}
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
          <h1 className="text-center">{pageIndex}</h1>
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

export default ProfessorSearchPage;
