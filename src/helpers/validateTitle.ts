function validateTitle(title: string) {
  const titleLength = title.length;
  if (title === "") {
    return { isValid: false, errorText: "Это поле не может быть пустым" };
  } else if (
    titleLength < 2 ||
    (title.trim().length < 2 && title.trim() !== "")
  ) {
    return {
      isValid: false,
      errorText: "Минимальная длина текста 2 символа",
    };
  } else if (titleLength > 64) {
    return {
      isValid: false,
      errorText: "Максимальная длина текста 64 символа",
    };
  } else if (title.trim() === "") {
    return {
      isValid: false,
      errorText: "Текст не должен быть пустым",
    };
  } else {
    return { isValid: true, errorText: "" };
  }
}

export default validateTitle;
