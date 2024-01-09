import { TbListDetails } from "react-icons/tb";
import { TodoType, useTodoList } from "../context/TodosContext";
import { useCallback, useState } from "react";

import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { TextareaAutosize } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "./modal";
import { Box } from "@mui/material";
import { BoxButton, CancelButton, OkButton } from "./modalButtons";

type TodoProps = {
  todo: TodoType;
  listId: string;
};

type Inputs = {
  title: string;
  description: string;
};

function Todo({ todo, listId }: TodoProps) {
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>();

  const { removeTodo, editTodo } = useTodoList();

  // const isEditHandler = () => {
  //   setIsEditTodo((isEditTodo) => !isEditTodo);
  //   setValue("title", todo.todoTitle);
  //   setValue("description", todo.todoDescription);
  // };

  const isEditHandler = useCallback(() => {
    setIsEditTodo((isEditTodo) => !isEditTodo);
    setValue("title", todo.todoTitle);
    setValue("description", todo.todoDescription);
  }, [todo, listId]);

  // const deleteHandler = () => {
  //   removeTodo(listId, todo.todoId);
  // };

  const deleteHandler = useCallback(() => {
    removeTodo(listId, todo.todoId);
  }, [listId, todo.todoId]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    editTodo(listId, todo.todoId, data.title, data.description);
    setIsEditTodo(false);
    reset();
  };

  if (isEditTodo) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card mb-4 items-center"
      >
        <TextareaAutosize
          className="todoInput"
          {...register("title", { required: true, maxLength: 150 })}
        />
        {errors.title?.type === "required" && (
          <p role="alert" className="error w-full">
            title is required
          </p>
        )}
        {errors.title?.type === "maxLength" && (
          <p role="alert" className="error w-full">
            title is longer
          </p>
        )}

        <TextareaAutosize
          className="todoInput"
          {...register("description", { maxLength: 300 })}
        />
        {errors.description?.type === "maxLength" && (
          <p role="alert" className="error w-full">
            description is longer
          </p>
        )}

        <div className="w-40 flex justify-between text-white mt-3">
          <button
            onClick={isEditHandler}
            className="transition ease-in-out hover:-translate-y-1"
          >
            <FaXmark />
          </button>
          <button
            type="submit"
            className="transition ease-in-out hover:-translate-y-1"
          >
            <MdOutlineEdit />
          </button>
          <button
            // onClick={deleteHandler}
            onClick={() => {
              setShowModal(true);
              setIsEditTodo(false);
            }}
            className="transition ease-in-out hover:-translate-y-1"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      key={todo.todoId}
      className="card text-white mb-4 flex flex-row justify-between items-center"
    >
      <Modal isOpen={showModal} closeHandler={setShowModal}>
        <Box
          sx={{ fontWeight: "medium", fontSize: 14, color: "#334155", m: 1 }}
        >
          Are you sure you want to delete todo?
        </Box>
        <BoxButton>
          <CancelButton variant="outlined" onClick={() => setShowModal(false)}>
            Cancel
          </CancelButton>
          <OkButton variant="contained" onClick={deleteHandler}>
            Delete
          </OkButton>
        </BoxButton>
      </Modal>

      <div className="truncate">
        <p className="text-lg font-medium truncate">{todo.todoTitle}</p>
        <p className="text-xs font-extralight italic text-slate-300 truncate">
          {todo.todoDescription}
        </p>
      </div>
      <button className="ml-2" onClick={isEditHandler}>
        <TbListDetails />
      </button>
    </div>
  );
}

export default Todo;
