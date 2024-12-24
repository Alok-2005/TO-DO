import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; // Import custom styles for animation and tooltip

const Todo = () => {
  const [todolist, settodolist] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  );
  const [error, setError] = useState(false); // State for error
  const inputref = useRef();

  const add = () => {
    const inputText = inputref.current.value.trim();

    // Check if the input is empty
    if (inputText === "") {
      setError(true); // Set error state
      setTimeout(() => setError(false), 1500); // Remove error state after 1.5 seconds
      return;
    }

    const newtodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    settodolist((prev) => [...prev, newtodo]);
    inputref.current.value = "";
    setError(false); // Clear the error state after successful addition

    // Show success toast notification with a progress bar
    toast.success("Task added successfully!", {
      position: "top-right",
      autoClose: 3000, // The toast will close after 3 seconds
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteTodo = (id) => {
    settodolist((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);

      // Show toast notification when task is deleted
      toast.error("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000, // The toast will close after 3 seconds
        hideProgressBar: false, // Show the progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return updatedTodos;
    });
  };

  const toggle = (id) => {
    settodolist((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isComplete: !todo.isComplete };

          // Show toast notification when task is marked as complete
          if (updatedTodo.isComplete) {
            toast.info("Task marked as completed!", {
              position: "top-right",
              autoClose: 3000, // The toast will close after 3 seconds
              hideProgressBar: false, // Show the progress bar
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.warning("Task marked as incomplete!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          return updatedTodo;
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist)); // Store data in browser
    console.log(todolist);
  }, [todolist]);

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
          {/* Title */}
          <div className="flex gap-5">
            <img className="w-8" src={todo_icon} alt="Todo Icon" />
            <h1 className="text-3xl font-semibold">To-Do List</h1>
          </div>

          {/* Input box */}
          <div className="relative mt-4 flex items-center bg-gray-200 rounded-full">
            <input
              ref={inputref}
              className={`bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 ${
                error ? "border-2 border-red-500 glow-red" : ""
              }`}
              type="text"
              placeholder="Add your task"
            />
            <button
              onClick={add}
              className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium"
            >
              Add +
            </button>
            {/* Tooltip */}
            {error && (
              <div className="absolute -top-10 left-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg opacity-90 fade-in">
                Task cannot be empty!
              </div>
            )}
          </div>

          {/* Todo items */}
          <div>
            {todolist.map((item, index) => {
              return (
                <Todoitems
                  key={index}
                  text={item.text}
                  id={item.id}
                  isComplete={item.isComplete}
                  deleteTodo={deleteTodo}
                  toggle={toggle}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Todo;
