import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import styles from "./TagRegisterPage.module.css";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";

function TagRegisterPage() {
  const navigate = useNavigate();

  const tagNameRef = useRef(null);
  const tagDescriptionRef = useRef(null);

  const registerTagHandler = async () => {
    if (
      !validationStringChecker(tagNameRef).isValid ||
      !validationStringChecker(tagDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      name: tagNameRef.current.value,
      description: tagDescriptionRef.current.value,
    };

    apiRequest(
      "POST",
      url + "/tag/",
      requestData,
      (res) => {
        alert("Registro de tag realizado!");
        console.log(res);
        navigate("/");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      DUMMY_AUTH_TOKEN
    );
  };

  return (
    <div>
      <h1>Cadastrar nova Tag (Característica)</h1>

      <ValidationInput
        label="Nome"
        hint="ex: Aulas objetivas"
        type="text"
        name="name"
        inputRef={tagNameRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Descrição"
        hint="ex: O docente é muito direto em suas aulas, não perdendo o tempo com conversas paralelas ou perdendo o foco durante a aula."
        type="text"
        name="description"
        inputRef={tagDescriptionRef}
        validation={validationStringChecker}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <IconButton content="Registrar Tag" onClick={registerTagHandler} />
    </div>
  );
}

export default TagRegisterPage;
