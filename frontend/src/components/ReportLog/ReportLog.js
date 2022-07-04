import {
  REPORT_UPDATE_FILLER,
} from "../../utils/consts";
import styles from "./ReportLog.module.css";

/**
 * Componente que uma movimentação no histórico de uma denúncia.
 *
 * props:
 *  * type (String): Tipo da movimentação, vide consts.js
 *  * date (String): Data da movimentação
 *  * siape (String): SIAPE do docente referente ao log
 *  * professor (String): Docente referente ao log
 *  * description (String): Opcional. Descrição da movimentação
 */
function ReportLog(props) {
  return (
    <div>
      <h1>{props.date}</h1>
      <h1 className={styles.reportTitle}>
        {props.title}
      </h1>
      <h1 className={styles.reportDescription}>
        {props.description
          ? `${props.siape} - ${props.professor}: "${props.description}"`
          : `${REPORT_UPDATE_FILLER[props.type]} ${props.siape} - ${
              props.professor
            }`}
      </h1>
      <hr/>
    </div>
  );
}

export default ReportLog;
