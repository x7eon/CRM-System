import "./TodoItem.scss";
import {
  type ReactElement,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useRef } from "react";
import ErrorValidate from "../ErrorValidate/ErrorValidate.tsx";

export interface ITodoItem {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface ITodoItemProps {
  todo: ITodoItem;
  getTodos: (status: string) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, title?: string, isDone?: boolean) => void;
  activeTab: string;
  removeItemFromList: (id: number) => void;
  validateTitle: (
    title: string,
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
    setValidateErrorText: (value: string) => void,
  ) => void;
}

function TodoItem(props: ITodoItemProps): ReactElement {
  const {
    todo,
    deleteItem,
    editItem,
    activeTab,
    removeItemFromList,
    validateTitle,
    getTodos,
  } = props;

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
        validateTitle(
          inputTextRef!.current!.value,
          isValid,
          errorTextRef,
          setValidateErrorText,
        );
        if (isValid.current) {
          await editItem(id, inputText);
          if (activeTab === "inWork") {
            await getTodos("inWork");
          } else if (activeTab === "completed") {
            await getTodos("completed");
          } else {
            await getTodos("all");
          }
          inputToggle();
        } else {
          inputTextRef!.current!.focus();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  function deleteButtonHandler() {
    deleteItem(id);
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
      editItem(id, inputText, e.target.checked);
      if (activeTab !== "all") {
        removeItemFromList(id);
      }
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
      <ErrorValidate
        validateErrorText={validateErrorText}
        errorTextRef={errorTextRef}
        marginLeftValue={32}
      ></ErrorValidate>
    </div>
  );
}

export default TodoItem;
