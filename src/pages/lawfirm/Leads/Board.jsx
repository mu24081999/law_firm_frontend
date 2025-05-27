import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableLead from "./SortableLead";

const Board = ({ board, boardId, handleSetOpen }) => {
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
  return (
    <div
      ref={setNodeRef}
      className=" lg:w-1/4 sm:w-full bg-gray-50 p-4 rounded shadow space-y-4 border border-gray-200"
    >
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
  );
};

export default Board;
