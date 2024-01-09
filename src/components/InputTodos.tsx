import { FaCheck } from "react-icons/fa";
import { useTodoList } from "../context/TodosContext";
import { useState } from "react";

// import TextareaAutosize from "react-textarea-autosize";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";

type InputTodosProps = {
  listId: string;
};

type Inputs = {
  title: string;
  description: string;
};

function InputTodos({ listId }: InputTodosProps) {
  const [isSHown, setIsShown] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // watch,
  } = useForm<Inputs>();

  const { addTodo } = useTodoList();

  const showHandler = () => {
    setIsShown(true);
  };

  // const onBlurHandler = () => {
  //   console.log(watch("title"), watch("description"));
  //   if (!(watch("title") || watch("description"))) {
  //     setIsShown(false);
  //   }
  // };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTodo(listId, data.title, data.description);
    setIsShown(false);
    reset();
  };

  if (!isSHown) {
    return (
      <button
        onClick={showHandler}
        className="border-slate-600 border-dashed border-2 text-slate-600 rounded-xl w-full mt-2 h-10 font-medium"
      >
        Add a card
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card items-center justify-center"
    >
      <TextareaAutosize
        placeholder="title"
        className="todoInput"
        autoFocus
        {...register("title", { required: true, maxLength: 150 })}
        // onBlur={onBlurHandler}
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
        placeholder="description"
        className="todoInput"
        {...register("description", { maxLength: 300 })}
        // onBlur={onBlurHandler}
      />
      {errors.description?.type === "maxLength" && (
        <p role="alert" className="error">
          description is longer
        </p>
      )}

      <div className="text-white w-40 flex justify-between items-center">
        <button
          className="transition ease-in-out hover:-translate-y-1"
          onClick={() => {
            setIsShown(false);
            reset();
          }}
        >
          <FaXmark />
        </button>

        <button
          type="submit"
          className="transition ease-in-out hover:-translate-y-1"
        >
          <FaCheck />
        </button>
      </div>
    </form>
  );
}

export default InputTodos;
