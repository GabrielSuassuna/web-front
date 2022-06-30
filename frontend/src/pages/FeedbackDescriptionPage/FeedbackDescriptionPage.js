import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import fetcher, { auth_fetcher } from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { getAuthData, getAuthToken } from "../../utils/auth";
import { AUTH_LEVELS } from "../../utils/consts";

function FeedbackDescriptionPage() {
  let [vote, setVote] = useState(null);
  let [isReporting, setIsReporting] = useState(false);

  const reportUpdateRef = useRef(null);

  const query = useQuery();
  const navigate = useNavigate();

  const { data: feedback, error: feedbackError } = useSWR(
    `${url}/feedback/${query.get("id")}`,
    fetcher
  );
  let { data: hasVote, error: hasVoteError } = useSWR(
    `${url}/hasVote?studentId=${
      getAuthData(navigate).id
    }&feedbackId=${query.get("id")}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 300000,
    }
  );

  let { data: report, error: reportError } = useSWR(
    `${url}/report/feedback/${query.get("id")}`,
    auth_fetcher(getAuthToken(navigate)),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 300000,
    }
  );

  checkForErrors([feedbackError, hasVoteError]);

  useEffect(() => {
    if (vote || !hasVote || !hasVote.data) return;
    if (hasVote.data.length === 0) setVote("NONE");
    else if (hasVote.data[0].is_upvote) setVote("UPVOTE");
    else setVote("DOWNVOTE");
  }, [vote, setVote, hasVote]);

  const handleVote = (isUpvote) => {
    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;

    setVote(isUpvote ? "UPVOTE" : "DOWNVOTE");

    if (hasVote && hasVote.data[0]) {
      apiRequest(
        "PUT",
        `${url}/hasVote/${query.get("id")}?studentId=${userId}`,
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
        token
      );
    } else {
      apiRequest(
        "POST",
        `${url}/hasVote`,
        {
          feedbackId: query.get("id"),
          studentId: userId,
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
        token
      );
    }
  };

  const deleteFeedbackHandler = () => {
    let token = getAuthToken(navigate);

    if (!token) return;
    apiRequest(
      "DELETE",
      `${url}/feedback/${query.get("id")}`,
      {},
      (res) => {
        alert("Feedback deltado com sucesso!");
        navigate("/myFeedbacks");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      token
    );
  };

  const reportFeedbackHandler = () => {
    if (!isReporting) {
      setIsReporting(true);
      return;
    }
    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "POST",
      `${url}/report/`,
      {
        feedbackId: "28",
        authorId: "10",
        description: reportUpdateRef.current.value,
        date: new Date(),
      },
      (res) => {
        alert("Feedback denunciado com sucesso!");
        navigate("/revision/myReports");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      token
    );
  };

  if (!hasVote) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  let { id: userId, userType } = getAuthData(navigate);

  return (
    <div>
      <h1>FeedbackDescriptionPage</h1>
      <p>{JSON.stringify(feedback)}</p>
      <hr />
      <p>{JSON.stringify(hasVote)}</p>
      <hr />
      <p>{JSON.stringify(report)}</p>
      <button disabled={vote === "UPVOTE"} onClick={() => handleVote(true)}>
        {" "}
        +{" "}
      </button>
      <hr />
      <button disabled={vote === "DOWNVOTE"} onClick={() => handleVote(false)}>
        {" "}
        -{" "}
      </button>
      {feedback &&
        feedback.data &&
        feedback.data[0].student_id === userId &&
        userType === AUTH_LEVELS.STUDENT && (
          <IconButton
            content="Deletar Feedback"
            onClick={deleteFeedbackHandler}
          />
        )}
      {isReporting && (
        <div className="w-full mt-2">
          <ValidationInput
            label="Atualizar denúncia"
            hint="Descreva brevemente o motivo da atualização."
            type="text"
            name="description"
            inputRef={reportUpdateRef}
            inputClasses={["h-40"]}
            isTextArea
          />
        </div>
      )}
      {feedback &&
        feedback.data &&
        feedback.data[0].professor_id === userId &&
        userType === AUTH_LEVELS.PROFESSOR &&
        report &&
        report.data.length === 0 && (
          <IconButton
            content={isReporting ? "Submeter Denúncia" : "Denunciar Feedback"}
            onClick={reportFeedbackHandler}
          />
        )}
      {feedback &&
        feedback.data &&
        feedback.data[0].professor_id === userId &&
        userType === AUTH_LEVELS.PROFESSOR &&
        report &&
        report.data &&
        report.data.length > 0 && (
          <IconButton
            content="Feedback Denunciado"
            onClick={deleteFeedbackHandler}
          />
        )}
    </div>
  );
}

export default FeedbackDescriptionPage;
