import type { RuleObject } from "antd/lib/form";

async function validator(_: RuleObject, title: string): Promise<void> {
  const trimmedTitle = title && title.trim();
  const maxTitleLength = 64;
  const minTitleLength = 2;
  return new Promise((resolve, reject) => {
    if (title === undefined || trimmedTitle === "") {
      reject("Поле не заполнено или содержит только пробелы");
    } else if (trimmedTitle.length < minTitleLength) {
      reject("Минимальная длина текста 2 символа");
    } else if (trimmedTitle.length > maxTitleLength) {
      reject("Максимальная длина текста 64 символа");
    } else {
      resolve();
    }
  });
}

export default validator;
