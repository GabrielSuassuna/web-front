import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

function LecturingDescriptionPage() {
  let query = useQuery();

  const {data: lecturing, error: lecturingError} = useSWR(`http://localhost:3000/lecturing/${query.get("id")}`, fetcher);
  const {data: professor, error: professorError} = useSWR(()=>`http://localhost:3000/professor/${lecturing.data[0].professor_id}`, fetcher);
  const {data: discipline, error: disciplineError} = useSWR(()=>`http://localhost:3000/discipline/${lecturing.data[0].discipline_id}`, fetcher);

  if(!lecturing || !professor || !discipline){
    return(
        <div>
          <h1>Carregando...</h1>
        </div>
    );
  }
  return (
    <div>
      <h1>LecturingDescriptionPage</h1>
      <p>{JSON.stringify(lecturing)}</p>
      <p>{JSON.stringify(professor)}</p>
      <p>{JSON.stringify(discipline)}</p>
    </div>
  );
} 

export default LecturingDescriptionPage;
 