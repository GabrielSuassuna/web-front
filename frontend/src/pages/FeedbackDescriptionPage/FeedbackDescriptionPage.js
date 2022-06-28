import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {DUMMY_STUDENT_ID} from "../../utils/consts";

function FeedbackDescriptionPage() {

  let query = useQuery();

  const {data: feedback, error: feedbackError } = useSWR(`http://localhost:3000/feedback/${query.get("id")}`, fetcher);
  const {data: hasVote, error: hasVoteError } = useSWR(`http://localhost:3000/hasVote?studentId=${DUMMY_STUDENT_ID}&feedbackId=${query.get("id")}`, fetcher);
  

  if(!hasVote){
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );  
  }

  return (
    <div>
      <h1>FeedbackDescriptionPage</h1>
      <p>{JSON.stringify(feedback)}</p>
      <hr/>
      <p>{JSON.stringify(hasVote)}</p>
    </div>
  );
}

export default FeedbackDescriptionPage;
