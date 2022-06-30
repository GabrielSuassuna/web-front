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

function FeedbackCreationPage() {
  const navigate = useNavigate();

  const feedbackTitleRef = useRef(null);
  const feedbackDescriptionRef = useRef(null);
  const feedbackPeriodRef = useRef(null);
  const feedbackAssiduityScoreRef = useRef(null);
  const feedbackClarityScoreRef = useRef(null);
  const feedbackRelationshipScoreRef = useRef(null);

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
      !validationStringChecker(feedbackPeriodRef).isValid
    )
      return alert("Dados inválidos!");

    let generalScore =
      (Number(feedbackAssiduityScoreRef.current.value) +
        Number(feedbackClarityScoreRef.current.value) +
        Number(feedbackRelationshipScoreRef.current.value)) /
      3;

    let { token, id: userId } = getAuthData(navigate);

    if (!token) return;

    let requestData = {
      lecturingId: query.get("lecturingId"),
      studentId: userId,
      title: feedbackTitleRef.current.value,
      description: feedbackDescriptionRef.current.value,
      period: feedbackPeriodRef.current.value,
      generalScore: generalScore,
      assiduityScore: feedbackAssiduityScoreRef.current.value,
      clarityScore: feedbackClarityScoreRef.current.value,
      relationshipScore: feedbackRelationshipScoreRef.current.value,
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
      <ValidationInput
        label="Período quando cursou a disciplina"
        hint="ex: 2020.1"
        type="text"
        inputRef={feedbackPeriodRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Nota: Assiduidade do Professor"
        hint="ex: 10"
        type="number"
        min={0}
        max={10}
        inputRef={feedbackAssiduityScoreRef}
      />
      <ValidationInput
        label="Nota: Clareza das aulas"
        hint="ex: 10"
        type="number"
        min={0}
        max={10}
        inputRef={feedbackClarityScoreRef}
      />
      <ValidationInput
        label="Nota: Relacionamento do professor com a turma"
        hint="ex: 10"
        type="number"
        min={0}
        max={10}
        inputRef={feedbackRelationshipScoreRef}
      />
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
