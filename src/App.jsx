import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

import InputTodo from "./components/InputTodo";
import TodoItem from "./components/TodoItem";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState(() => {
    const getTodos = localStorage.getItem("stTodos");
    return getTodos ? JSON.parse(getTodos) : [];
  });
  const [inputTodo, setInputTodo] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [updateText, setUpdateText] = useState("");

  useEffect(() => {
    localStorage.setItem("stTodos", JSON.stringify(todos));
    console.log("setStorage 실행");
  }, [todos]);

  // todo 만들기
  const createTodo = () => {
    if (!inputTodo.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputTodo,
      isDone: false,
      datetime: dayjs().format("MM.DD.YYYY / hh:mm a"),
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setInputTodo("");
  };

  // todo 수정하기
  const startUpdate = (selectedTodo) => {
    setUpdateId(selectedTodo.id);
    setUpdateText(selectedTodo.text);
  };

  const cancelUpdate = () => {
    setUpdateId(null);
    setUpdateText("");
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updateId
        ? {
            ...todo,
            text: updateText,
            datetime: dayjs().format("MM.DD.YYYY / hh:mm a"),
          }
        : todo
    );
    setTodos(updatedTodos);
    cancelUpdate();
  };

  // todo 삭제하기
  const deleteTodo = (selectedId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== selectedId);
    setTodos(updatedTodos);
  };

  // 토글 함수
  const handleToggle = (selectedId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === selectedId ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  // InputTodo에 전달할 props
  const inputProps = { inputTodo, setInputTodo, createTodo };

  // Todostats에 전달할 props
  const itemProps = {
    updateId,
    updateText,
    setUpdateText,
    cancelUpdate,
    updateTodo,
    handleToggle,
    startUpdate,
    deleteTodo,
  };

  return (
    <>
      <div className="todo-container">
        <Title level={1}>Siwon To-do</Title>

        <InputTodo {...inputProps} />

        <TodoStats todos={todos} />

        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} {...itemProps} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
