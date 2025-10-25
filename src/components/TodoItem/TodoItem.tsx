import "./TodoItem.scss";
import {
  type ReactElement,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useRef } from "react";
import ErrorValidateText from "../ErrorValidateText/ErrorValidateText.tsx";
import type { ITodoItem } from "../../types/types.ts";
import validateTitle from "../../helpers/validateTitle.ts";

export interface ITodoItemProps {
  todo: ITodoItem;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title?: string, isDone?: boolean) => void;
  updateTodosWithFiltering: () => void;
}

function TodoItem(props: ITodoItemProps): ReactElement {
  const { todo, deleteTodo, editTodo, updateTodosWithFiltering } = props;

  const id = todo.id;
  const todoTitle = todo.title;

  const [inputText, setInputText] = useState<string>(todo.title);
  const [checkBoxIsDone, setCheckBoxIsDone] = useState<boolean>(todo.isDone);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [validateErrorText, setValidateErrorText] = useState<string>("");
  const [isDisabledSaveButton, setIsDisabledSaveButton] =
    useState<boolean>(false);

  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const errorTextRef = useRef<HTMLSpanElement | null>(null);
  const isValid = useRef<boolean>(false);

  useEffect(() => {
    inputTextRef!.current!.focus();
  }, [isDisabledInput]);

  function inputToggle() {
    setIsDisabledInput((prev) => !prev);
  }

  function inputTextHandler(e: SyntheticEvent<HTMLInputElement>) {
    setInputText(e.currentTarget.value);
    if (e.currentTarget.value === todoTitle) {
      setIsDisabledSaveButton(true);
    } else {
      setIsDisabledSaveButton(false);
    }
  }

  function editButtonHandler() {
    inputToggle();
    setIsDisabledSaveButton(true);
  }

  async function saveButtonHandler() {
    try {
      if (!isDisabledInput) {
        const validateResult = validateTitle(inputTextRef!.current!.value);
        setValidateErrorText(validateResult.errorText);
        isValid.current = validateResult.isValid;

        if (isValid.current) {
          await editTodo(id, inputText);
          await updateTodosWithFiltering();
          inputToggle();
        } else {
          inputTextRef!.current!.focus();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteButtonHandler() {
    try {
      await deleteTodo(id);
      await updateTodosWithFiltering();
    } catch (e) {
      console.log(e);
    }
  }

  function cancelButtonHandler() {
    if (!isDisabledInput) {
      inputToggle();
      setInputText(todoTitle);
      setValidateErrorText("");
    }
  }

  async function inputCheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setCheckBoxIsDone(e.target.checked);
      await editTodo(id, inputText, e.target.checked);
      await updateTodosWithFiltering();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="todoItemContainer">
      <div className="todoItemTextCheckGroup">
        <input
          className="todoItemCheckbox"
          type="checkbox"
          id="checkbox"
          checked={checkBoxIsDone}
          onChange={inputCheckboxHandler}
        ></input>
        <input
          type="text"
          className="todoItemInputTitle"
          value={inputText}
          disabled={isDisabledInput}
          ref={inputTextRef}
          onChange={inputTextHandler}
        />
      </div>
      <div className="todoItemButtons">
        {isDisabledInput ? (
          <button
            className="todoButton todoItemEditButton"
            onClick={editButtonHandler}
          ></button>
        ) : (
          <button
            className="todoButton todoItemSaveButton"
            onClick={saveButtonHandler}
            disabled={isDisabledSaveButton}
          ></button>
        )}
        {isDisabledInput ? (
          <button
            className="todoButton todoItemDeleteButton"
            onClick={deleteButtonHandler}
          ></button>
        ) : (
          <button
            className="todoButton todoItemCancelButton"
            onClick={cancelButtonHandler}
          ></button>
        )}
      </div>
      <ErrorValidateText
        errorValidateText={validateErrorText}
        errorTextRef={errorTextRef}
        styles={{ marginLeft: 32 }}
        isValid={isValid.current}
      ></ErrorValidateText>
    </div>
  );
}

export default TodoItem;
