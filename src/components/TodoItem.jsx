import { Button, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";

function TodoItem({
  todo,
  updateId,
  updateText,
  setUpdateText,
  cancelUpdate,
  updateTodo,
  handleToggle,
  startUpdate,
  deleteTodo,
}) {
  return (
    <li className="todo-item">
      {updateId === todo.id ? (
        <>
          {" "}
          {/* 수정모드 */}
          <div className="update-contents">
            <Input
              type="text"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              onPressEnter={updateTodo}
            />
            <Button icon={<CloseOutlined />} onClick={cancelUpdate}>
              <span className="blind">취소</span>
            </Button>
            <Button icon={<CheckOutlined />} onClick={updateTodo}>
              <span className="blind">저장</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          {" "}
          {/* 일반모드 */}
          <div className="contents">
            <strong
              className={`todo-text ${todo.isDone ? "isDone" : ""}`}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </strong>
            <p>{todo.datetime}</p>
          </div>
          <div className="btn-group">
            <Button
              color="default"
              variant="filled"
              icon={<EditFilled />}
              onClick={() => startUpdate(todo)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              variant="filled"
              icon={<DeleteFilled />}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
