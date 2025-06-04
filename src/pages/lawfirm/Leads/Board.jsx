import React, { useRef, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableLead from "./SortableLead";
import { MoreVertical } from "lucide-react";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateBoardApi } from "../../../redux/services/board";

const Board = ({ board, boardId, handleSetOpen }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newBoardColor, setNewBoardColor] = useState("#fcba03");
  const [boardTextColor, setBoardTextColor] = useState("#03fc1c");
  const [newBoardName, setNewBoardName] = useState("");
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  function hexToRGBA(hex, opacity) {
    let c = hex.replace("#", "");

    if (c.length === 3) {
      c = c
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const bigint = parseInt(c, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const { setNodeRef } = useDroppable({
    id: boardId,
    data: { boardId },
  });

  const updateBoard = (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    const params = {
      name: newBoardName,
      textColor: boardTextColor,
      backgroundColor: newBoardColor,
    };
    dispatch(updateBoardApi(token, params, board?.id));
    setIsOpen(false);
  };
  return (
    <>
      <div
        ref={setNodeRef}
        className=" lg:w-1/4 sm:w-full min-w-64 bg-gray-50 p-4 rounded shadow space-y-4 border border-gray-200"
      >
        <div className="relative float-end" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-full"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-md z-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setIsOpen(true);
                  setNewBoardColor(board?.backgroundColor);
                  setNewBoardName(board?.name);
                  setBoardTextColor(board?.textColor);
                }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-blue-100 text-blue-600"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-1 mb-5">
          <p
            className="text-sm font-semibold px-2 py-1"
            style={{
              backgroundColor: hexToRGBA(board?.backgroundColor, 0.2),
              color: board?.textColor,
              opacity: "",
            }}
          >
            {board.name}
          </p>
          <div className="float-end">{board?.items?.length}</div>
        </div>

        {board?.leads?.length > 0 && (
          <SortableContext
            items={board?.leads?.map((item) => item?.id)}
            strategy={verticalListSortingStrategy}
          >
            {board?.leads?.length > 0 &&
              board?.leads?.map((lead, index) => (
                <>
                  <SortableLead key={index} lead={lead} boardId={boardId} />
                </>
              ))}
          </SortableContext>
        )}
        <button
          onClick={() => handleSetOpen(true, board)}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          + Add Lead
        </button>
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Reciept Details"
          noStartMargin={true}
          size="sm"
          body={
            <form onSubmit={updateBoard}>
              <div className="flex flex-col gap-5">
                <label className="block">
                  <p className="text-gray-700 font-medium">Background Color</p>
                  <input
                    type="text"
                    placeholder="Board Name"
                    className="border p-2"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                  />
                </label>
                <label className="block">
                  <p className="text-gray-700 font-medium">Background Color</p>
                  <input
                    type="color"
                    value={newBoardColor}
                    onChange={(e) => setNewBoardColor(e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer shadow-sm mt-2"
                  />
                </label>
                <label className="block">
                  <p className="text-gray-700 font-medium">Text Color</p>
                  <input
                    type="color"
                    value={boardTextColor}
                    onChange={(e) => setBoardTextColor(e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer shadow-sm mt-2"
                  />
                </label>
                <button
                  onClick={updateBoard}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          }
        />
      </div>
    </>
  );
};

export default Board;
