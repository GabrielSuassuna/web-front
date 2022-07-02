import useQuery from "../../hooks/useQuery";
import { useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styles from "./FeedbackCreationPage.module.css";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import IconButton from "../../components/IconButton/IconButton";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { useNavigate } from "react-router-dom";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { getAuthData } from "../../utils/auth";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import { genPeriodOptions } from "../../utils/periods";
import HalfStar from "../../components/HalfStar/HalfStar";

function FeedbackCreationPage() {
  const navigate = useNavigate();

  const feedbackTitleRef = useRef(null);
  const feedbackDescriptionRef = useRef(null);

  const [assiduityScore, setAssiduityGrade] = useState(0);
  const [previewAssiduityScore, setPreviewAssiduityGrade] = useState(0);
  const [clarityScore, setClarityScore] = useState(0);
  const [previewClarityScore, setPreviewClarityGrade] = useState(0);
  const [relationshipScore, setRelationshipScore] = useState(0);
  const [previewRelationshipScore, setPreviewRelationshipGrade] = useState(0);
  const [feedbackPeriod, setFeedbackPeriod] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  let query = useQuery();

  const { data: lecturing, error: lecturingError } = useSWR(
    `${url}/lecturing/${query.get("lecturingId")}`,
    fetcher
  );
  const { data: professor, error: professorError } = useSWR(
    () => `${url}/professor/${lecturing.data[0].professor_id}`,
    fetcher
  );
  const { data: discipline, error: disciplineError } = useSWR(
    () => `${url}/discipline/${lecturing.data[0].discipline_id}`,
    fetcher
  );
  const { data: tags, error: tagsError } = useSWR(() => `${url}/tag/`, fetcher);

  checkForErrors([lecturingError, professorError, disciplineError, tagsError]);

  const toggleTagHandler = (tagId) => {
    if (selectedTags.find((t) => t.id === tagId)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t.id !== tagId));
    } else if (selectedTags.length < 3) {
      let selectedTag = tags.data.find((t) => t.id === tagId);
      setSelectedTags((prevTags) => [...prevTags, selectedTag]);
    }
  };

  const registerFeedbackHandler = () => {
    if (
      !validationStringChecker(feedbackTitleRef).isValid ||
      !validationStringChecker(feedbackDescriptionRef).isValid ||
      feedbackPeriod.length === 0
    )
      return alert("Dados inválidos!");

    let generalScore = (assiduityScore + clarityScore + relationshipScore) / 3;

    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;

    let requestData = {
      lecturingId: query.get("lecturingId"),
      studentId: userId,
      title: feedbackTitleRef.current.value,
      description: feedbackDescriptionRef.current.value,
      period: feedbackPeriod,
      generalScore: generalScore,
      assiduityScore: assiduityScore,
      clarityScore: clarityScore,
      relationshipScore: relationshipScore,
      date: new Date(),
      tags: selectedTags.map((t) => t.id),
    };

    console.log(requestData);

    apiRequest(
      "POST",
      url + "/feedback/",
      requestData,
      (res) => {
        alert("Registro de feedback realizado!");
        console.log(res);
        navigate("/");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      token
    );
  };

  if (!lecturing || !professor || !discipline || !tags) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  const possibleGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <h1>FeedbackCreationPage</h1>
      <ValidationInput
        label="Título do Feedback"
        hint="ex: Ótimo professor!"
        type="text"
        inputRef={feedbackTitleRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Descrição do Feedback"
        hint="ex: Ótimo professor!"
        type="text"
        inputRef={feedbackDescriptionRef}
        validation={validationStringChecker}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <ValidationSelect
        name="periodSel"
        label="Período que cursou a disciplina"
        hint="Selecione um período"
        value={feedbackPeriod}
        valueHandler={setFeedbackPeriod}
        options={genPeriodOptions()}
      />
      <div>
        <h1>Nota: Assiduidade do Professor</h1>
        <div>
          {possibleGrades.map((g) => (
            <HalfStar
              key={`halfStarKey${g}`}
              left={g % 2 !== 0}
              grade={assiduityScore}
              minGrade={g}
              gradeHandler={setAssiduityGrade}
              previewGrade={previewAssiduityScore}
              previewGradeHandler={setPreviewAssiduityGrade}
            />
          ))}
        </div>
      </div>
      <div>
        <h1>Nota: Clareza das aulas</h1>
        <div>
          {possibleGrades.map((g) => (
            <HalfStar
              key={`halfStarKey${g}`}
              left={g % 2 !== 0}
              grade={clarityScore}
              minGrade={g}
              gradeHandler={setClarityScore}
              previewGrade={previewClarityScore}
              previewGradeHandler={setPreviewClarityGrade}
            />
          ))}
        </div>
      </div>

      <div>
        <h1>Nota: Relacionamento com a turma</h1>
        <div>
          {possibleGrades.map((g) => (
            <HalfStar
              key={`halfStarKey${g}`}
              left={g % 2 !== 0}
              grade={relationshipScore}
              minGrade={g}
              gradeHandler={setRelationshipScore}
              previewGrade={previewRelationshipScore}
              previewGradeHandler={setPreviewRelationshipGrade}
            />
          ))}
        </div>
      </div>
      <h2>Selectione até 3 características:</h2>
      {tags.data.map((t) => {
        return (
          <h2
            className={
              selectedTags.find((tag) => t.id === tag.id) ? styles.selected : ""
            }
            onClick={() => toggleTagHandler(t.id)}
            key={t.id}
          >
            {t.name}
          </h2>
        );
      })}
      <IconButton
        content="Publicar feedback"
        onClick={registerFeedbackHandler}
      />
    </div>
  );
}

export default FeedbackCreationPage;
