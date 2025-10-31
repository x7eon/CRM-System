import "./AddTodo.scss";
import { type SyntheticEvent, useEffect, useState } from "react";
import ErrorValidateText from "../ErrorValidateText/ErrorValidateText.tsx";
import getValidateErrorText from "../../helpers/getValidateErrorText.ts";
import { addTodoApi } from "../../api/api.ts";

interface AddTodoProps {
  updateTodos: () => Promise<void>;
}

function AddTodo(props: AddTodoProps) {
  const { updateTodos } = props;

  const [isValidTodoTitle, setIsValidTodoTitle] = useState<boolean>(false);
  const [validateErrorText, setValidateErrorText] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const validateResult = getValidateErrorText(inputText);
    setValidateErrorText(validateResult);
    setIsValidTodoTitle(!validateResult);
  }

  function handleInputTextChange(e: SyntheticEvent<HTMLInputElement>): void {
    setInputText(e.currentTarget.value);
  }

  async function addTodo(title: string): Promise<void> {
    try {
      await addTodoApi({ title });
    } catch {
      alert("Ошибка добавления задачи. Попробуйте снова");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (isValidTodoTitle) {
          await addTodo(inputText);
          await updateTodos();
          setInputText("");
          setIsValidTodoTitle(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [isValidTodoTitle]);

  return (
    <>
      <form className="addTodoForm" onSubmit={handleSubmit} noValidate={true}>
        <input
          className="addTodoInput"
          type="text"
          placeholder="Task To Be Done..."
          value={inputText}
          onChange={handleInputTextChange}
        />
        <button type="submit" className="AddButton">
          Add
        </button>
      </form>
      <ErrorValidateText
        validateErrorText={validateErrorText}
        isValid={isValidTodoTitle}
      ></ErrorValidateText>
    </>
  );
}

export default AddTodo;
