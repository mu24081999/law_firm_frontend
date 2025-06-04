import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical } from "lucide-react"; // using lucide icons

const formatPhone = (phone) => {
  if (!phone) return "";
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

const SortableLead = ({ lead, boardId, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: lead?.id,
      data: { boardId, type: "lead" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative bg-white p-3 rounded-xl shadow border border-gray-200 cursor-grab hover:shadow-md transition-all"
    >
      {/* Dropdown icon */}
      <div className="absolute top-2 right-2" ref={dropdownRef}>
        {/* <button
          onClick={() => {
            console.log("click");
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreVertical size={18} />
        </button> */}
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-md z-10">
            <button
              onClick={() => {
                onDelete(lead?.id, boardId);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-left hover:bg-red-100 text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Lead Content */}
      <p className="font-semibold text-lg text-gray-800">{lead?.name}</p>
      <p className="text-sm text-gray-600">{lead?.email}</p>
      {lead?.phone && (
        <p className="text-sm text-gray-600">📞 {formatPhone(lead?.phone)}</p>
      )}
      {lead?.company && (
        <p className="text-sm text-gray-500">🏢 {lead?.company}</p>
      )}
      {lead?.source && (
        <p className="text-sm text-gray-500">🔗 Source: {lead?.source}</p>
      )}
      {lead?.status && (
        <p className="text-sm text-gray-500">📌 Status: {lead?.status}</p>
      )}
      {lead?.assignTo && (
        <p className="text-sm text-gray-500">
          👤 Assigned To: {lead?.assignTo}
        </p>
      )}
      {lead?.lastContact && (
        <p className="text-sm text-gray-400 italic">
          Last Contact: {new Date(lead?.lastContact).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default SortableLead;
