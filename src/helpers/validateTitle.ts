interface ValidateResult {
  isValid: boolean;
  errorText: string;
}

function validateTitle(title: string): ValidateResult {
  const trimmedTitle = title.trim();
  const validateResult = {
    isValid: true,
    errorText: "",
  };

  if (trimmedTitle === "") {
    validateResult.isValid = false;
    validateResult.errorText = "Поле не заполнено или содержит только пробелы";
  } else if (trimmedTitle.length < 2) {
    validateResult.isValid = false;
    validateResult.errorText = "Минимальная длина текста 2 символа";
  } else if (trimmedTitle.length > 64) {
    validateResult.isValid = false;
    validateResult.errorText = "Максимальная длина текста 64 символа";
  }

  return validateResult;
}

export default validateTitle;
