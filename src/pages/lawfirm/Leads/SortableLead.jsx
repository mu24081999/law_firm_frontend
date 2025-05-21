import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableLead = ({ lead, boardId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: lead.id,
      data: { boardId, type: "lead" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded shadow cursor-pointer"
    >
      <p className="font-medium">{lead.name}</p>
      <p className="text-sm text-gray-600">{lead.email}</p>
    </div>
  );
};

export default SortableLead;
