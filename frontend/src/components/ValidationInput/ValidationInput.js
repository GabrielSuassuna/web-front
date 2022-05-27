import { useState } from "react";
import styles from "./ValidationInput.module.css";

/**
 * Componente que representa um campo de input que pode ser validado.
 *
 * props:
 *  * label (String): Texto que indica sobre o que é o campo
 *  * hint (String): Dica que aparece quando o campo está vazio
 *  * name (String): Nome do input
 *  * type (String): Tipo do input
 *  * inputRef (Ref): Referência do valor do campo
 *  * validation (Function): Função que faz a validação do input e retorna uma mensagem indicando o possível erro de validação.
 *      Retorno da função validation: Object {  isValid: Boolean,  message: String (opcional)  }
 */
function ValidationInput(props) {
  let [shouldValidate, setShouldValidate] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const validationCheck = () => {
    let validation = props.validation(props.inputRef);
    if(validation.isValid)
      setErrorMessage('')
    else
      setErrorMessage(validation.message)
  }

  

  return (
    <div>
      <label htmlFor="validationInput">{props.label}:</label>
      <input
        className={styles.validationInput}
        type={props.type}
        id="validationInput"
        onFocus={() => setShouldValidate(true)}
        ref={props.inputRef}
        name={props.name}
        placeholder={props.hint}
        onChange={validationCheck}
      />
      {shouldValidate && errorMessage && (
        <small className={styles.validationError}>
          {errorMessage}
        </small>
      )}
    </div>
  );
}

export default ValidationInput;
