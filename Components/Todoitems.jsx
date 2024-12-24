import React, { useRef } from "react";
import Delete from "../assets/delete.png";
import Tick from "../assets/tick.png";
import Not_tick from "../assets/not_tick.png";
const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-9 gap-4">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={isComplete ? Tick : Not_tick} alt="" className="w-7" />
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div> 
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={Delete}
        alt=""
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default Todoitems;
