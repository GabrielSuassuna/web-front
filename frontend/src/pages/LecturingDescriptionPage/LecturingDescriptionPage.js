import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { Link, useNavigate } from "react-router-dom";
import { checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import { getAuthData } from "../../utils/auth";
import Tag from "../../components/Tag/Tag";
import { AUTH_LEVELS } from "../../utils/consts";

function LecturingDescriptionPage() {
  let query = useQuery();
  const navigate = useNavigate();

  let { userType } = getAuthData(navigate);

  const { data: lecturing, error: lecturingError } = useSWR(
    `${url}/lecturing/${query.get("id")}`,
    fetcher
  );

  const { data: professor, error: professorError } = useSWR(
    () => `${url}/professor/${lecturing.data[0].professor_id}`,
    fetcher
  );

  const { data: discipline, error: disciplineError } = useSWR(
    () => `${url}/discipline/${lecturing.data[0].discipline_id}`,
    fetcher
  );

  checkForErrors([lecturingError, professorError, disciplineError]);

  if (!lecturing || !professor || !discipline) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  } else {
    return (
      <div className="mt-6 ml-6">
        <h1 className="text-4xl font-bold mb-6">{discipline.data[0].name}</h1>
        <p>{discipline.data[0].description}</p>

        <h2 className="mt-6 font-bold">Tags Populares:</h2>
        <div className="pr-4 mt-3 w-56">
          {lecturing.data[0].tags.map((tag) => {
            return <Tag id={tag.id} title={tag.name} />;
          })}
        </div>

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
          <p>{lecturing.data[0].feedback_count}</p>
        </div>
        <div className="flex flex-row mt-3">
          <p className="font-bold mr-2">Média Geral:</p>
          <p>{lecturing.data[0].average_score}</p>
        </div>

        <div className="flex flex-row mt-10">
          <p className="font-bold mr-2 text-lg">Professor:</p>
          <p className="text-lg">{professor.data[0].name}</p>
        </div>

        <div className="flex flex-row mt-1">
          <p>{professor.data[0].about}</p>
        </div>

        <div className="flex flex-row mt-3">
          <p className="font-bold mr-2">Lattes:</p>
          <p>{professor.data[0].lattes_url}</p>
        </div>

        <div className="flex flex-row mt-3">
          <p className="font-bold mr-2">Departamento:</p>
          <p>{professor.data[0].department_name}</p>
        </div>

        {userType === AUTH_LEVELS.STUDENT ? (
          <Link to={`/register/feedback?lecturingId=${lecturing.data[0].id}`}>
            <div className="mt-6 w-96 text-white rounded px-2 text-center py-2 bg-indigo-700">
              FAZER FEEDBACK PARA ESSA DISCIPLINA
            </div>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default LecturingDescriptionPage;
