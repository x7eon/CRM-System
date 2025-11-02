// TODO удалить полностью

function getValidateErrorText(title: string): string {
  const maxTitleLength = 64;
  const minTitleLength = 2;

  const trimmedTitle = title.trim();
  let validateResult = "";

  if (trimmedTitle === "") {
    validateResult = "Поле не заполнено или содержит только пробелы";
  } else if (trimmedTitle.length < minTitleLength) {
    validateResult = "Минимальная длина текста 2 символа";
  } else if (trimmedTitle.length > maxTitleLength) {
    validateResult = "Максимальная длина текста 64 символа";
  }

  return validateResult;
}

export default getValidateErrorText;
