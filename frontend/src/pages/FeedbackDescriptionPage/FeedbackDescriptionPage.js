import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

function FeedbackDescriptionPage() {

  let query = useQuery();

  const {data, error} = useSWR(`http://localhost:3000/feedback/${query.get("id")}`, fetcher);

  return (
    <div>
      <h1>FeedbackDescriptionPage</h1>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
}

export default FeedbackDescriptionPage;
