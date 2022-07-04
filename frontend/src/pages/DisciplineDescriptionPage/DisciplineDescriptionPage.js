import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import Tag from "../../components/Tag/Tag";
import { checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";

function DisciplineDescriptionPage() {
  let query = useQuery();

  const { data: discipline, error: disciplineError } = useSWR(
    `${url}/discipline/${query.get("id")}`,
    fetcher
  );

  checkForErrors([disciplineError]);

  if (!discipline) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-4xl font-bold mb-6">{discipline.data[0].name}</h1>
      <p>{discipline.data[0].description}</p>
      <div className="flex flex-row mt-3">
        <p className="font-bold mr-2">Código:</p>
        <p>{discipline.data[0].code}</p>
      </div>
      <div className="flex flex-row mt-3">
        <p className="font-bold mr-2">Carga Horário:</p>
        <p>{discipline.data[0].hours}h</p>
      </div>
      <div className="flex flex-row mt-3">
        <p className="font-bold mr-2">Número de Feedbacks:</p>
        <p>{discipline.data[0].feedback_count}</p>
      </div>
      <div className="flex flex-row mt-3">
        <p className="font-bold mr-2">Média Geral:</p>
        <p>{discipline.data[0].general_score}</p>
      </div>
      <h2 className="mt-3 font-bold">Tags Populares:</h2>
      <div className="pr-4 mt-3 w-56">
        {discipline.data[0].tags.map((tag) => {
          return <Tag id={tag.id} title={tag.name} />;
        })}
      </div>
    </div>
  );
}

export default DisciplineDescriptionPage;
