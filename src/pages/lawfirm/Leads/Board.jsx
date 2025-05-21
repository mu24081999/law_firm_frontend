import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableLead from "./SortableLead";

const Board = ({ board, boardId }) => {
  const { setNodeRef } = useDroppable({
    id: boardId,
    data: { boardId },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-64 bg-gray-100 p-4 rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">{board.name}</h2>
      <SortableContext
        items={board.items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {board.items.map((lead) => (
          <SortableLead key={lead.id} lead={lead} boardId={boardId} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Board;
