import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import { apiRequest } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

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

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "POST",
      url + "/faq/",
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
      token
    );
  };

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-4xl font-bold mb-6">
        Cadastro de FAQ (Pergunta Frequentes)
      </h1>

      <div className="flex flex-col w-6/12">
        <ValidationInput
          label="Título"
          hint="ex: Meu feedback é anônimo?"
          type="text"
          name="question"
          inputRef={faqQuestionRef}
          validation={validationStringChecker}
        />
        <div className="w-full mt-2">
          <ValidationInput
            label="Resposta"
            hint="ex: Sim! Seu feedback é completamente anônimo, porém, não viole os nossos termos de uso."
            type="text"
            name="answer"
            inputRef={faqAnswerRef}
            validation={validationStringChecker}
            inputClasses={["h-40"]}
            isTextArea
          />
        </div>
        <IconButton
          className={[
            "w-full",
            "bg-green-700",
            "text-white",
            "py-2",
            "text-xs",
            "rounded",
            "mt-2",
            "mb-10",
          ]}
          content="Registrar FAQ"
          onClick={registerFAQHandler}
        />
      </div>
    </div>
  );
}

export default FAQRegisterPage;
