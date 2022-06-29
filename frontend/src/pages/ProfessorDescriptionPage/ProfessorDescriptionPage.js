import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import url from "../../config/api";

import Tag from "../../components/Tag/Tag";
import { checkForErrors } from "../../utils/apiReq";

function ProfessorDescriptionPage() {
  let query = useQuery();

  const { data: professor, error: professorError } = useSWR(
    `${url}/professor/${query.get("id")}`,
    fetcher
  );

  checkForErrors([professorError]);

  return (
    <div>
      <h1>ProfessorDescriptionPage</h1>
      <p>{JSON.stringify(professor)}</p>
      <h2>Tags Populares:</h2>
      <Tag id="ID_tag_aulasObjetivas" title="Aulas Objetivas" />
      <Tag id="ID_tag_visaoEstrategica" title="Visao Estratégica" />
    </div>
  );
}

export default ProfessorDescriptionPage;
