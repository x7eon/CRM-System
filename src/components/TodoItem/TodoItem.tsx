import "./TodoItem.scss";
import {
  type ReactElement,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import ErrorValidateText from "../ErrorValidateText/ErrorValidateText.tsx";
import type { Todo } from "../../types/types.ts";
import validateTitle from "../../helpers/validateTitle.ts";
import { deleteTodoApi, editTodoApi } from "../../api/api.ts";

export interface ITodoItemProps {
  todo: Todo;
  updateTodos: () => Promise<void>;
}

function TodoItem(props: ITodoItemProps): ReactElement {
  const { todo, updateTodos } = props;

  const id = todo.id;
  const todoTitle = todo.title;

  const [inputText, setInputText] = useState<string>(todo.title);
  const [checkBoxIsDone, setCheckBoxIsDone] = useState<boolean>(todo.isDone);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [validateErrorText, setValidateErrorText] = useState<string>("");
  const [isValidTodoTitle, setIsValidTodoTitle] = useState<boolean>(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] =
    useState<boolean>(false);

  function handleInputTextChange(e: SyntheticEvent<HTMLInputElement>): void {
    setInputText(e.currentTarget.value);
    if (e.currentTarget.value === todoTitle) {
      setIsDisabledSaveButton(true);
    } else {
      setIsDisabledSaveButton(false);
    }
  }

  function editButtonHandler(): void {
    setIsEditMode(true);
    setIsDisabledSaveButton(true);
  }

  async function saveButtonHandler(): Promise<void> {
    try {
      if (isEditMode) {
        const validateResult = validateTitle(inputText);
        setValidateErrorText(validateResult.errorText);
        setIsValidTodoTitle(validateResult.isValid);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteButtonHandler(): Promise<void> {
    try {
      await deleteTodo(id);
      await updateTodos();
    } catch (e) {
      console.log(e);
    }
  }

  function cancelButtonHandler(): void {
    if (isEditMode) {
      setIsEditMode(false);
      setInputText(todoTitle);
      setValidateErrorText("");
    }
  }

  async function inputCheckboxHandler(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    try {
      setCheckBoxIsDone(e.target.checked);
      await editTodo(id, inputText, e.target.checked);
      await updateTodos();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTodo(id: number): Promise<void> {
    try {
      await deleteTodoApi(id);
    } catch {
      alert("Ошибка удаления задачи. Попробуйте снова");
    }
  }

  async function editTodo(
    id: number,
    title?: string,
    isDone?: boolean,
  ): Promise<void> {
    try {
      await editTodoApi(id, { title, isDone });
    } catch {
      alert("Ошибка изменения задачи. Попробуйте снова");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (isValidTodoTitle) {
          await editTodo(id, inputText);
          await updateTodos();
          setIsEditMode(false);
          setIsValidTodoTitle(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isValidTodoTitle]);

  return (
    <div className="todoItemContainer">
      <div className="todoItemTextCheckGroup">
        <input
          className="todoItemCheckbox"
          type="checkbox"
          id="checkbox"
          checked={checkBoxIsDone}
          onChange={inputCheckboxHandler}
        />
        <input
          type="text"
          className="todoItemInputTitle"
          value={inputText}
          disabled={!isEditMode}
          onChange={handleInputTextChange}
        />
      </div>
      <div className="todoItemButtons">
        {!isEditMode ? (
          <>
            <button
              className="todoButton todoItemEditButton"
              onClick={editButtonHandler}
            />
            <button
              className="todoButton todoItemDeleteButton"
              onClick={deleteButtonHandler}
            />
          </>
        ) : (
          <>
            <button
              className="todoButton todoItemSaveButton"
              onClick={saveButtonHandler}
              disabled={isDisabledSaveButton}
            />
            <button
              className="todoButton todoItemCancelButton"
              onClick={cancelButtonHandler}
            />
          </>
        )}
      </div>
      <ErrorValidateText
        validateErrorText={validateErrorText}
        styles={{ marginLeft: 32 }}
        isValid={isValidTodoTitle}
      ></ErrorValidateText>
    </div>
  );
}

export default TodoItem;
