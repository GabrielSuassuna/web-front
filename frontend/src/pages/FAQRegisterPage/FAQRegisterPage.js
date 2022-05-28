import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import styles from "./FAQRegisterPage.module.css";

function FAQRegisterPage() {

  const navigate = useNavigate();

  const faqQuestionRef = useRef(null);
  const faqAnswerRef = useRef(null);

  const validationStringChecker = (inputRef) => {
    if (
      inputRef &&
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.length >= 0
    ) {
      return { isValid: true };
    }
    return { isValid: false, message: "Esse campo não pode estar vazio" };
  };

  const registerFAQHandler = () => {
    if (
      !validationStringChecker(faqQuestionRef).isValid ||
      !validationStringChecker(faqAnswerRef).isValid
    )
      return alert("Dados inválidos!");
    
    let requestData = {
      question: faqQuestionRef.current.ref,
      answer: faqAnswerRef.current.id
    };
    alert("Registro realizado!")
    console.log(requestData)
    navigate('/faq')
  };

  return (
    <div>
      <h1>Fazer Registro</h1>

      <ValidationInput
        label="Pergunta"
        hint="ex: Meu feedback é anônimo?"
        type="text"
        name='question'
        inputRef={faqQuestionRef}
        validation={validationStringChecker}
      />
      <ValidationInput
        label="Resposta"
        hint="ex: Sim! Seu feedback é completamente anônimo, porém, não viole os nossos termos de uso."
        type="text"
        name='answer'
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
