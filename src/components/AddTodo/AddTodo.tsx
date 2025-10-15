import "./AddTodo.scss";
import { type SyntheticEvent, useRef, useState } from "react";
import ErrorValidate from "../ErrorValidate/ErrorValidate.tsx";

interface AddTodoProps {
  addTodo: (title: string) => void;
  validateTitle: (
    title: string,
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
    setValidateErrorText: (value: string) => void,
  ) => void;
}

function AddTodo(props: AddTodoProps) {
  const { addTodo, validateTitle } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const errorTextRef = useRef<HTMLSpanElement | null>(null);
  const isValid = useRef<boolean>(false);

  const [validateErrorText, setValidateErrorText] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    validateTitle(
      inputRef.current!.value,
      isValid,
      errorTextRef,
      setValidateErrorText,
    );

    if (isValid.current) {
      try {
        addTodo(inputRef!.current!.value);
        inputRef!.current!.value = "";
        isValid.current = false;
      } catch (e) {
        console.error(e);
      }
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
      <ErrorValidate
        validateErrorText={validateErrorText}
        errorTextRef={errorTextRef}
      ></ErrorValidate>
    </>
  );
}

export default AddTodo;
