import "./AddTodo.scss";
import { type SyntheticEvent, useRef, useState } from "react";
import ErrorValidateText from "../ErrorValidateText/ErrorValidateText.tsx";
import validateTitle from "../../helpers/validateTitle.ts";

interface AddTodoProps {
  addTodo: (title: string, activeTab: string) => void;
  activeTab: string;
  updateTodosWithFiltering: () => void;
}

function AddTodo(props: AddTodoProps) {
  const { addTodo, activeTab, updateTodosWithFiltering } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const errorTextRef = useRef<HTMLSpanElement | null>(null);
  const isValid = useRef<boolean>(false);
  const [validateErrorText, setValidateErrorText] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const validateResult = validateTitle(inputRef.current!.value);
      setValidateErrorText(validateResult.errorText);
      isValid.current = validateResult.isValid;
      if (isValid.current) {
        await addTodo(inputRef!.current!.value, activeTab);
        updateTodosWithFiltering();
        inputRef!.current!.value = "";
        isValid.current = false;
      } else {
        inputRef.current!.focus();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <form className="addTodoForm" onSubmit={handleSubmit} noValidate={true}>
        <input
          className="addTodoInput"
          type="text"
          placeholder="Task To Be Done..."
          ref={inputRef}
        ></input>
        <button type="submit" className="AddButton">
          Add
        </button>
      </form>
      <ErrorValidateText
        errorValidateText={validateErrorText}
        errorTextRef={errorTextRef}
        isValid={isValid.current}
      ></ErrorValidateText>
    </>
  );
}

export default AddTodo;
