import ReportLog from "../../components/ReportLog/ReportLog";
import { REPORT_UPDATE_TYPES } from "../../utils/consts";

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
  return (
    <div>
      <h1>ReportedFeedbackPage</h1>
      {DUMMY_UPDATES.map((u, i) => (
        <ReportLog
          key={i}
          type={u.type}
          date={u.date}
          siape={u.siape}
          professor={u.professor}
          description={u.description}
        />
      ))}
    </div>
  );
}

export default ReportedFeedbackPage;
