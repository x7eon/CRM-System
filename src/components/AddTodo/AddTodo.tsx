import "./AddTodo.scss";
import { type SyntheticEvent, useRef, useState } from "react";
import ErrorValidateText from "../ErrorValidateText/ErrorValidateText.tsx";

interface AddTodoProps {
  addTodo: (title: string) => void;
  validateTitle: (title: string) => { isValid: boolean; errorText: string };
  toggleShowValidateError: (
    isValid: boolean,
    errorElement: React.RefObject<HTMLSpanElement | null>,
  ) => void;
}

function AddTodo(props: AddTodoProps) {
  const { addTodo, validateTitle, toggleShowValidateError } = props;

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
      toggleShowValidateError(isValid.current, errorTextRef);
      if (isValid.current) {
        addTodo(inputRef!.current!.value);
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
      ></ErrorValidateText>
    </>
  );
}

export default AddTodo;
