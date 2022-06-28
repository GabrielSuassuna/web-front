import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { DUMMY_STUDENT_ID, DUMMY_AUTH_TOKEN } from "../../utils/consts";

function FeedbackDescriptionPage() {
  let [vote, setVote] = useState(null);

  let query = useQuery();

  const { data: feedback, error: feedbackError } = useSWR(
    `http://localhost:3000/feedback/${query.get("id")}`,
    fetcher
  );
  let { data: hasVote, error: hasVoteError } = useSWR(
    `http://localhost:3000/hasVote?studentId=${DUMMY_STUDENT_ID}&feedbackId=${query.get(
      "id"
    )}`,
    fetcher
  );

  checkForErrors([feedbackError, hasVoteError])

  useEffect(() => {
    if (vote || !hasVote || !hasVote.data) return;
    if (hasVote.data.length === 0) setVote("NONE");
    else if (hasVote.data[0].is_upvote) setVote("UPVOTE");
    else setVote("DOWNVOTE");
  }, [vote, setVote, hasVote]);

  const handleVote = (isUpvote) => {
    setVote(isUpvote ? "UPVOTE" : "DOWNVOTE");

    if (hasVote && hasVote.data[0]) {
      apiRequest(
        "PUT",
        `http://localhost:3000/hasVote/${query.get(
          "id"
        )}?studentId=${DUMMY_STUDENT_ID}`,
        {
          isUpvote: isUpvote,
        },
        (res) => {
          console.log(res);
        },
        (res) => {
          alert(res.message);
          console.log(res.message);
          console.log(res.errorStack);
        },
        DUMMY_AUTH_TOKEN
      );
    } else {
      apiRequest(
        "POST",
        `http://localhost:3000/hasVote`,
        {
          feedbackId: query.get("id"),
          studentId: DUMMY_STUDENT_ID,
          isUpvote: isUpvote,
        },
        (res) => {
          console.log(res);
        },
        (res) => {
          alert(res.message);
          console.log(res.message);
          console.log(res.errorStack);
        },
        DUMMY_AUTH_TOKEN
      );
    }
  };

  if (!hasVote) {
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
      <hr />
      <p>{JSON.stringify(hasVote)}</p>
      <button disabled={vote === "UPVOTE"} onClick={() => handleVote(true)}>
        {" "}
        +{" "}
      </button>
      <hr />
      <button disabled={vote === "DOWNVOTE"} onClick={() => handleVote(false)}>
        {" "}
        -{" "}
      </button>
    </div>
  );
}

export default FeedbackDescriptionPage;
