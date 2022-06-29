import { Link } from "react-router-dom";
import { REPORT_UPDATE_FILLER } from "../../../utils/consts";

// "id": 15,
// "feedback_id": 28,
// "author_id": 10,
// "reviewer_id": null,
// "status": "ABERTO",
// "author_name": "Professor 1",
// "author_siape": "1",
// "reviewer_name": "Professor 1",
// "reviewer_siape": "1",
// "feedback_title": "Ótimo professor"

function ReportSearchResult(props) {
  return (
    <div>
      <Link to={`/description/report?id=${props.resultData.id}`}>
        <small>{props.resultData.status}</small>
        <h1>Título do feedback: {props.resultData.title}</h1>
        <h1>
          Autorado por: {props.resultData.author_name} - {props.resultData.author_siape}
        </h1>
        <h1>
          {REPORT_UPDATE_FILLER[props.resultData.status]} {props.resultData.author_name} - {props.resultData.author_siape}
        </h1>
      </Link>
    </div>
  );
}

export default ReportSearchResult;
