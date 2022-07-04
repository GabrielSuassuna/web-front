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

const validationNumberChecker = (inputRef) => {
  if (inputRef && inputRef.current && inputRef.current.value) {
    if (Number.isNaN(inputRef.current.value) || inputRef.current.value <= 0)
      return { isValid: false, message: "Valor numérico inválido!" };
    return { isValid: true };
  }
  return { isValid: false, message: "Esse campo não pode estar vazio" };
};

const validationPasswordChecker = (inputRef) => {
  if (
    inputRef &&
    inputRef.current &&
    inputRef.current.value &&
    inputRef.current.value.length >= 0
  ) {
    if (inputRef.current.value.length < 6)
      return {
        isValid: false,
        message: "Sua senha não pode ter menos de 6 caracteres",
      };
    return { isValid: true };
  }
  return { isValid: false, message: "Esse campo não pode estar vazio" };
};

const validationPasswordConfirmChecker = (inputRef, passwordInputRef) => {
  if (
    inputRef &&
    inputRef.current &&
    inputRef.current.value &&
    inputRef.current.value.length >= 0 &&
    inputRef.current.value === passwordInputRef.current.value
  ) {
    return { isValid: true };
  }
  return { isValid: false, message: "As senhas não coincidem" };
};

const validationOptionalPasswordChecker = (inputRef) => {
  if (inputRef.current.value.length !== 0 && inputRef.current.value.length < 6)
    return {
      isValid: false,
      message: "Sua senha não pode ter menos de 6 caracteres",
    };
  return { isValid: true };
};

const validationOptionalPasswordConfirmChecker = (
  inputRef,
  passwordInputRef
) => {
  if (
    inputRef &&
    inputRef.current &&
    inputRef.current.value === passwordInputRef.current.value
  ) {
    return { isValid: true };
  }
  return { isValid: false, message: "As senhas não coincidem" };
};

export {
  validationStringChecker,
  validationNumberChecker,
  validationPasswordChecker,
  validationPasswordConfirmChecker,
  validationOptionalPasswordChecker,
  validationOptionalPasswordConfirmChecker
};
