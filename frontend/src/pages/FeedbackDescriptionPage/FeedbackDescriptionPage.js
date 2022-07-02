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
import star_filled from "./stars_filled.png";
import star_unfilled from "./stars_unfilled.png";

function FeedbackDescriptionPage() {
  let [vote, setVote] = useState(null);
  let [isReporting, setIsReporting] = useState(false);
  let [hasVoteOnLoad, setHasVoteOnLoad] = useState(false);

  const reportUpdateRef = useRef(null);

  const query = useQuery();
  const navigate = useNavigate();

  let { id: userId, userType } = getAuthData(navigate);

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
    if (vote || !hasVote || !hasVote.data || userType === AUTH_LEVELS.GUEST)
      return;

    if (hasVote.data.length === 0) {
      setVote("NONE");
      return;
    }

    setHasVoteOnLoad(true);
    if (hasVote.data[0].is_upvote) setVote("UPVOTE");
    else setVote("DOWNVOTE");
  }, [vote, setVote, hasVote]);

  const handleVote = (isUpvote) => {
    if (userType === AUTH_LEVELS.GUEST) return;

    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;
    if (vote !== "NONE") {
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
    setVote(isUpvote ? "UPVOTE" : "DOWNVOTE");
  };

  const deleteFeedbackHandler = () => {
    if (userType === AUTH_LEVELS.GUEST) return;

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
    if (userType === AUTH_LEVELS.GUEST) return;

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

  const genStarStyle = (grade) => {
    if (!feedback || !feedback.data) return [{}, {}];

    let width = 250;
    let height = width / 5;
    let filledClipPath = (width / 10) * grade;
    return [
      {
        display: "inline",
        width: `${width}px`,
        height: `${height}px`,
        clipPath: `inset(0px ${width - filledClipPath}px 0px 0px)`,
      },
      {
        display: "inline",
        width: `${width}px`,
        height: `${height}px`,
        clipPath: `inset(0px 0px 0px ${filledClipPath}px)`,
        marginLeft: `-${width}px`,
      },
    ];
  };

  if (!hasVote) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  let upvotes = Number(feedback.data[0].upvote_count);
  let downvotes = Number(feedback.data[0].downvote_count);

  if (!hasVoteOnLoad && vote === "UPVOTE") upvotes += 1;
  if (!hasVoteOnLoad && vote === "DOWNVOTE") downvotes += 1;

  if (hasVoteOnLoad && hasVote.data[0].is_upvote && vote === "DOWNVOTE") {
    upvotes -= 1;
    downvotes += 1;
  }
  if (hasVoteOnLoad && !hasVote.data[0].is_upvote && vote === "UPVOTE") {
    upvotes += 1;
    downvotes -= 1;
  }

  let [genScoreUnfillStyle, genScoreFillStyle] = genStarStyle(
    feedback.data[0].general_score
  );
  let [clarityScoreUnfillStyle, clarityScoreFillStyle] = genStarStyle(
    feedback.data[0].clarity_score
  );
  let [assiduityScoreUnfillStyle, assiduityScoreFillStyle] = genStarStyle(
    feedback.data[0].assiduity_score
  );
  let [relationshipScoreUnfillStyle, relationshipScoreFillStyle] = genStarStyle(
    feedback.data[0].relationship_score
  );

  return (
    <div>
      <h1>FeedbackDescriptionPage</h1>
      <p>{JSON.stringify(feedback)}</p>
      <hr />
      <p>{JSON.stringify(hasVote)}</p>
      <hr />
      <p>{JSON.stringify(report)}</p>
      <img
        style={genScoreUnfillStyle}
        src={star_filled}
        alt={feedback.data[0].general_score}
      />
      <img style={genScoreFillStyle} src={star_unfilled} alt="" />
      <hr/>
      <img
        style={clarityScoreUnfillStyle}
        src={star_filled}
        alt={feedback.data[0].clarity_score}
      />
      <img style={clarityScoreFillStyle} src={star_unfilled} alt="" />
      <hr/>
      <img
        style={assiduityScoreUnfillStyle}
        src={star_filled}
        alt={feedback.data[0].clarity_score}
      />
      <img style={assiduityScoreFillStyle} src={star_unfilled} alt="" />
      <hr/>
      <img
        style={relationshipScoreUnfillStyle}
        src={star_filled}
        alt={feedback.data[0].relationship_score}
      />
      <img style={relationshipScoreFillStyle} src={star_unfilled} alt="" />
      <hr/>
      <button
        disabled={vote === "UPVOTE" || userType === AUTH_LEVELS.GUEST}
        onClick={() => handleVote(true)}
      >
        {" "}
        UPVOTES: {upvotes} +{" "}
      </button>
      <hr />
      <button
        disabled={vote === "DOWNVOTE" || userType === AUTH_LEVELS.GUEST}
        onClick={() => handleVote(false)}
      >
        {" "}
        DOWNVOTES: {downvotes} -{" "}
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
