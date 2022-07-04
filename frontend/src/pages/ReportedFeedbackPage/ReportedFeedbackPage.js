import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReportLog from "../../components/ReportLog/ReportLog";
import { REPORT_UPDATE_TRANSLATION } from "../../utils/consts";
import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { useEffect } from "react";
import { fetcher, auth_fetcher } from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import { getAuthData, getAuthToken } from "../../utils/auth";

function ReportedFeedbackPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const reportUpdateRef = useRef(null);

  const { data: report, error: reportError } = useSWR(
    () => `${url}/report/${query.get("id")}`,
    auth_fetcher(getAuthToken(navigate))
  );

  const { data: feedback, error: feedbackError } = useSWR(
    () => `${url}/feedback/${report.data[0].feedback_id}`,
    fetcher
  );

  const { data: author, error: authorError } = useSWR(
    () => `${url}/professor/${report.data[0].author_id}`,
    fetcher
  );

  const { data: department, error: departmentError } = useSWR(
    () => `${url}/department/${author.data[0].department_id}`,
    fetcher
  );

  const { data: reviewer } = useSWR(
    () => `${url}/professor/${report.data[0].reviewer_id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 300000,
    }
  );

  checkForErrors([reportError, feedbackError, authorError, departmentError]);

  useEffect(() => {
    console.log(report);
  }, [report]);

  if (!report || !feedback || !author || !department) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  const handleReportUpdate = (newStatus) => {
    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;

    if (newStatus === "EXCLUDE") {
      apiRequest(
        "DELETE",
        `${url}/report/${report.data[0].id}`,
        {},
        (res) => {
          alert("Denúncia deletada!");
          console.log(res);
          navigate(`/revision/myReports`);
        },
        (res) => {
          alert(res.message);
          console.log(res.message);
          console.log(res.errorStack);
        },
        token
      );
    } else {
      console.log({
        authorId: userId,
        status: newStatus,
        date: new Date(),
        title: REPORT_UPDATE_TRANSLATION[newStatus],
        description: reportUpdateRef.current.value
          ? reportUpdateRef.current.value
          : REPORT_UPDATE_TRANSLATION[newStatus],
      })
      apiRequest(
        "PUT",
        `${url}/report/${report.data[0].id}`,
        {
          authorId: userId,
          status: newStatus,
          date: new Date(),
          title: REPORT_UPDATE_TRANSLATION[newStatus],
          description: reportUpdateRef.current.value
            ? reportUpdateRef.current.value
            : REPORT_UPDATE_TRANSLATION[newStatus],
        },
        (res) => {
          alert("Denúncia atualizada!");
          console.log(res);
          navigate(`/revision/report?id=${query.get("id")}`);
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

  let buttons = [];
  let showPrompt = false;

  const genButton = (content, status) => (
    <IconButton
      key={status}
      content={content}
      onClick={() => handleReportUpdate(status)}
    />
  );

  let { id: userId } = getAuthData(navigate);

  if (!userId) return;

  if (userId === report.data[0].author_id) {
    buttons.push(genButton("Excluir denúncia", "EXCLUDE"));
  }
  if (
    userId === report.data[0].author_id &&
    report.data[0].status === "REVOGADO"
  ) {
    showPrompt = true;
    buttons.push(genButton("Reabrir denúncia", "ABERTO"));
  }
  if (
    report.data[0].status === "ABERTO" &&
    userId !== report.data[0].author_id &&
    !report.data[0].reviewer_id &&
    (userId === department.data[0].course_coordinator_id ||
      userId === department.data[0].department_head_id)
  ) {
    showPrompt = true;
    buttons.push(genButton("Revisar Denúncia", "EM_REVISAO"));
  }
  if (
    userId === report.data[0].reviewer_id &&
    report.data[0].status === "EM_REVISAO"
  ) {
    showPrompt = true;
    buttons.push(genButton("Revogar denúncia", "REVOGADO"));
    buttons.push(genButton("Excluir feedback", "REMOVIDO"));
  }

  return (
    <div>
      <h1>ReportedFeedbackPage</h1>
      {JSON.stringify(report)}
      <hr />
      {JSON.stringify(feedback)}
      <hr />
      {JSON.stringify(author)}
      <hr />
      {JSON.stringify(department)}
      <hr />
      {JSON.stringify(reviewer)}
      <hr />
      {report.data[0].logs.map((u, i) => (
        <ReportLog
          key={i}
          title={u.title}
          date={u.date}
          siape={u.author_siape}
          professor={u.author_name}
          description={u.description}
        />
      ))}

      {showPrompt && (
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
      {buttons}
    </div>
  );
}

export default ReportedFeedbackPage;
