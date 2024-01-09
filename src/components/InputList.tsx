import { useState } from "react";
import { useTodoList } from "../context/TodosContext";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

type Inputs = {
  listName: string;
};

function InputList() {
  const [isShown, setIsShown] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { addList } = useTodoList();

  const showHandler = () => {
    setIsShown(true);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addList(data.listName);
    setIsShown(false);
    reset();
  };

  if (!isShown) {
    return (
      <button
        onClick={showHandler}
        className="rounded-xl min-w-80 border-slate-400 border-2 border-dashed p-3 h-max text-slate-400"
      >
        <span className="block text-3xl font-semibold">+</span>Click For Create
        List
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-xl min-w-80 h-max bg-slate-400 p-3 shadow-xl justify-center items-center"
    >
      <input
        type="text"
        placeholder="listname..."
        autoFocus
        className="mb-3 w-full p-3 bg-slate-600 focus:outline-none rounded-xl text-white"
        {...register("listName", { required: true, maxLength: 20 })}
      />
      {errors.listName?.type === "required" && (
        <p role="alert" className="error w-full text-red-700">
          listname is required
        </p>
      )}
      {errors.listName?.type === "maxLength" && (
        <p role="alert" className="error w-full text-red-700">
          listname is longer
        </p>
      )}

      <div className="text-white w-40 flex justify-between">
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

export default InputList;
