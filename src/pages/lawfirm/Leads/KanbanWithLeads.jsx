// KanbanWithLeads.jsx
import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuid } from "uuid";
import Board from "./Board";

const KanbanWithLeads = () => {
  const [boards, setBoards] = useState([
    { id: "board-1", name: "New Leads", items: [] },
    { id: "board-2", name: "Contacted", items: [] },
  ]);

  const [newLead, setNewLead] = useState({ name: "", email: "" });
  const [newBoardName, setNewBoardName] = useState("");

  const addLead = () => {
    const lead = { id: uuid(), ...newLead };
    setBoards((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        items: [...updated[0].items, lead],
      };
      return updated;
    });
    setNewLead({ name: "", email: "" });
  };

  const addBoard = () => {
    if (!newBoardName.trim()) return;
    setBoards((prev) => [
      ...prev,
      { id: uuid(), name: newBoardName, items: [] },
    ]);
    setNewBoardName("");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeBoardId = active.data.current?.boardId;
    const overBoardId = over.data.current?.boardId;

    // Sort boards themselves
    if (active.data.current?.type === "board") {
      const oldIndex = boards.findIndex((b) => b.id === active.id);
      const newIndex = boards.findIndex((b) => b.id === over.id);
      setBoards(arrayMove(boards, oldIndex, newIndex));
      return;
    }

    // Sort or move leads
    if (activeBoardId && overBoardId) {
      const activeBoardIndex = boards.findIndex((b) => b.id === activeBoardId);
      const overBoardIndex = boards.findIndex((b) => b.id === overBoardId);

      const activeItemIndex = boards[activeBoardIndex].items.findIndex(
        (i) => i.id === active.id
      );

      const overItemIndex = boards[overBoardIndex].items.findIndex(
        (i) => i.id === over.id
      );

      if (activeItemIndex === -1) return;

      const item = boards[activeBoardIndex].items[activeItemIndex];

      const updatedBoards = [...boards];
      updatedBoards[activeBoardIndex].items.splice(activeItemIndex, 1);
      if (activeBoardId === overBoardId) {
        updatedBoards[overBoardIndex].items = arrayMove(
          updatedBoards[overBoardIndex].items,
          activeItemIndex,
          overItemIndex
        );
      } else {
        updatedBoards[overBoardIndex].items.splice(
          overItemIndex >= 0 ? overItemIndex : 0,
          0,
          item
        );
      }

      setBoards(updatedBoards);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Lead Name"
          className="border p-2"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Lead Email"
          className="border p-2"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
        />
        <button
          onClick={addLead}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add Lead
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Board Name"
          className="border p-2"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button
          onClick={addBoard}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add Board
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext
          items={boards.map((b) => b.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 overflow-auto">
            {boards.map((board) => (
              <Board key={board.id} board={board} boardId={board.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default KanbanWithLeads;
