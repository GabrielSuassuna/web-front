import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import Tag from "../../components/Tag/Tag";
import { checkForErrors } from "../../utils/apiReq";

function DisciplineDescriptionPage() {
  let query = useQuery();

  const {data: discipline, error: disciplineError} = useSWR(`http://localhost:3000/discipline/${query.get("id")}`, fetcher);

  checkForErrors([disciplineError]);

  return (
    <div>
      <h1>DisciplineDescriptionPage</h1>
      <p>{JSON.stringify(discipline)}</p>
      <h2>Tags Populares:</h2>
      <Tag id='ID_tag_aulasObjetivas' title='Aulas Objetivas'/>
      <Tag id='ID_tag_visaoEstrategica' title='Visao Estratégica'/>
    </div>
  );
} 

export default DisciplineDescriptionPage;
 