import styles from "./HalfStar.module.css";
import star_filled_left from "./star_filled_left.png";
import star_filled_right from "./star_filled_right.png";
import star_unfilled_left from "./star_unfilled_left.png";
import star_unfilled_right from "./star_unfilled_right.png";

function HalfStar(props) {

  const filled = props.left ? star_filled_left : star_filled_right;
  const unfilled = props.left ? star_unfilled_left : star_unfilled_right;

  return (
    <img
      className={`${styles.halfStar}`}
      src={props.previewGrade >= props.minGrade ? filled : unfilled}
      onClick={()=>props.gradeHandler(props.minGrade === props.grade ? 0 : props.minGrade)}
      onMouseOver={()=>props.previewGradeHandler(props.minGrade)}
      onMouseOut={()=>props.previewGradeHandler(props.grade)}
      alt={props.grade}
    />
  );
}

export default HalfStar;