import ReportLog from "../../components/ReportLog/ReportLog";
import { REPORT_UPDATE_TYPES } from "../../utils/consts";
import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetcher, auth_fetcher } from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { DUMMY_STUDENT_ID, DUMMY_AUTH_TOKEN } from "../../utils/consts";
import url from "../../config/api";
 

const DUMMY_UPDATES = [
  {
    type: REPORT_UPDATE_TYPES.REMOVED,
    date: "15/05/2022",
    siape: "123456",
    professor: "Yuri Lenon",
    description:
      "Perdão, não tinha prestado atenção. De fato esse feedback contén discurso de ódio ao professor. Removendo feedback imediatamente.",
  },
  {
    type: REPORT_UPDATE_TYPES.REOPENED,
    date: "13/05/2022",
    siape: "123321",
    professor: "Fernando Trinta",
    description:
      "Peço que reveja isso por favor. Atenção a última frase do feedback.",
  },
  {
    type: REPORT_UPDATE_TYPES.REVOKED,
    date: "12/05/2022",
    siape: "123456",
    professor: "Yuri Lenon",
    description:
      "Não consegui ver o discurso de ódio. Estarei revogando a denúncia.",
  },
  {
    type: REPORT_UPDATE_TYPES.ACCEPTED,
    date: "12/05/2022",
    siape: "123456",
    professor: "Yuri Lenon",
    description: "Perdão a demora. Irei revisar o feedback",
  },
  {
    type: REPORT_UPDATE_TYPES.CANCELLED,
    date: "11/05/2022",
    siape: "123455",
    professor: "Pablo Mayckon",
    description: "Infelizmente meu mandato se encerrou. Não poderei revisar.",
  },
  {
    type: REPORT_UPDATE_TYPES.ACCEPTED,
    date: "10/05/2022",
    siape: "123455",
    professor: "Pablo Mayckon",
  },
  {
    type: REPORT_UPDATE_TYPES.OPENED,
    date: "09/05/2022",
    siape: "123321",
    professor: "Fernando Trinta",
    description: "O usuário fez menções ofensivas a mim com discurso de ódio",
  },
];

function ReportedFeedbackPage() {
  let query = useQuery();

  const { data: report, error: reportError } = useSWR(
    () => `${url}/report/${query.get("id")}`,
    auth_fetcher(DUMMY_AUTH_TOKEN)
  );
  
  const { data: feedback, error: feedbackError } = useSWR(
    () => `${url}/feedback/${report.data[0].feedback_id}`,
    fetcher
  );

  const { data: author, error: authorError } = useSWR(
    () => `${url}/professor/${report.data[0].author_id}`,
    fetcher
  );

  const { data: reviewer } = useSWR(
    () => `${url}/professor/${report.data[0].reviewer_id}`,
    fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 300000
    }
  );

  checkForErrors([reportError, feedbackError, authorError]);
  
  useEffect(()=>{
    console.log(report);
  }, [report])

  if(!report || !feedback){
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>ReportedFeedbackPage</h1>
      {JSON.stringify(report)}
      <hr/>
      {JSON.stringify(feedback)}
      <hr/>
      {JSON.stringify(author)}
      <hr/>
      {JSON.stringify(reviewer)}
      <hr/>
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
    </div>
  );
}

export default ReportedFeedbackPage;
