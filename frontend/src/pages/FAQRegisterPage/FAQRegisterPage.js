import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import styles from "./FAQRegisterPage.module.css";
import { DUMMY_AUTH_TOKEN } from "../../utils/consts";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";

function FAQRegisterPage() {
  const navigate = useNavigate();

  const faqQuestionRef = useRef(null);
  const faqAnswerRef = useRef(null);

  const registerFAQHandler = async () => {
    if (
      !validationStringChecker(faqQuestionRef).isValid ||
      !validationStringChecker(faqAnswerRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      question: faqQuestionRef.current.value,
      answer: faqAnswerRef.current.value,
    };

    apiRequest(
      'POST',
      "http://localhost:3000/faq/",
      requestData,
      (res) => {
        alert("Registro de pergunta realizado!");
        console.log(res);
        navigate("/faq");
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
      <h1>Fazer Registro</h1>

      <ValidationInput
        label="Pergunta"
        hint="ex: Meu feedback é anônimo?"
        type="text"
        name="question"
        inputRef={faqQuestionRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Resposta"
        hint="ex: Sim! Seu feedback é completamente anônimo, porém, não viole os nossos termos de uso."
        type="text"
        name="answer"
        inputRef={faqAnswerRef}
        validation={validationStringChecker}
        inputClasses={[styles.inputQuestion]}
        isTextArea
      />
      <IconButton content="Registrar FAQ" onClick={registerFAQHandler} />
    </div>
  );
}

export default FAQRegisterPage;
