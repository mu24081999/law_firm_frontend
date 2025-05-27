// KanbanWithLeads.jsx
import React, { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuid } from "uuid";
import Board from "./Board";
import Modal from "../../../components/Modal";
import PageHeader from "../../components/common/PageHeader";
import { PlusIcon } from "lucide-react";
import Card from "../../components/common/Card";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import StatusBadge from "../../components/common/StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoardApi,
  addLeadApi,
  getUserBoardsApi,
  getUserLeads,
  updateLead,
} from "../../../redux/services/board";
const KanbanWithLeads = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { boards: boardsData, leads } = useSelector((state) => state.board);
  // const leads = [
  //   {
  //     id: 1,
  //     name: "Robert Johnson",
  //     company: "Johnson Industries",
  //     email: "robert@johnson.com",
  //     phone: "(555) 123-4567",
  //     status: "New",
  //     source: "Website",
  //     assignedTo: "Jane Smith",
  //     lastContact: "2023-10-14",
  //     notes: "Interested in corporate legal services.",
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Williams",
  //     company: "Individual",
  //     email: "sarah.w@example.com",
  //     phone: "(555) 987-6543",
  //     status: "Contacted",
  //     source: "Referral",
  //     assignedTo: "Mike Brown",
  //     lastContact: "2023-10-12",
  //     notes: "Looking for estate planning advice.",
  //   },
  //   {
  //     id: 3,
  //     name: "David Chen",
  //     company: "Chen Technologies",
  //     email: "david@chentech.com",
  //     phone: "(555) 456-7890",
  //     status: "Qualified",
  //     source: "Conference",
  //     assignedTo: "Jane Smith",
  //     lastContact: "2023-10-10",
  //     notes: "Needs assistance with patent applications.",
  //   },
  //   {
  //     id: 4,
  //     name: "Maria Rodriguez",
  //     company: "Individual",
  //     email: "maria.r@example.com",
  //     phone: "(555) 234-5678",
  //     status: "Proposal",
  //     source: "Social Media",
  //     assignedTo: "John Doe",
  //     lastContact: "2023-10-08",
  //     notes: "Divorce case, follow up with fee structure.",
  //   },
  //   {
  //     id: 5,
  //     name: "Thomas Wilson",
  //     company: "Wilson & Sons",
  //     email: "thomas@wilsonsons.com",
  //     phone: "(555) 876-5432",
  //     status: "Negotiation",
  //     source: "Website",
  //     assignedTo: "Mike Brown",
  //     lastContact: "2023-10-05",
  //     notes: "Family business succession planning.",
  //   },
  //   {
  //     id: 6,
  //     name: "Jennifer Lee",
  //     company: "Individual",
  //     email: "jennifer.l@example.com",
  //     phone: "(555) 345-6789",
  //     status: "Won",
  //     source: "Referral",
  //     assignedTo: "Jane Smith",
  //     lastContact: "2023-10-01",
  //     notes: "Personal injury case, agreement signed.",
  //   },
  //   {
  //     id: 7,
  //     name: "Michael Baker",
  //     company: "Baker Enterprises",
  //     email: "michael@bakerenterprises.com",
  //     phone: "(555) 654-3210",
  //     status: "Lost",
  //     source: "Website",
  //     assignedTo: "John Doe",
  //     lastContact: "2023-09-28",
  //     notes: "Went with another firm due to pricing concerns.",
  //   },
  // ];
  const [boards, setBoards] = useState([]);
  const [view, setView] = useState("kanban");

  const [isOpen, setIsOpen] = useState(false);
  const [newBoardColor, setNewBoardColor] = useState("#ffffff");
  const [boardTextColor, setBoardTextColor] = useState("#ffffff");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newLead, setNewLead] = useState({ name: "", email: "" });
  const [newBoardName, setNewBoardName] = useState("");

  const addLead = () => {
    if (!selectedBoard) return; // prevent if no board is selected

    const lead = { id: uuid(), ...newLead };

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === selectedBoard.id
          ? { ...board, leads: [...board?.leads, lead] }
          : board
      )
    );
    const params = {
      boardId: selectedBoard?.id,
      userId: user?.id,
      ...newLead,
    };
    dispatch(addLeadApi(token, params));
    // Reset all lead fields
    setNewLead({
      name: "",
      company: "",
      email: "",
      phone: "",
      source: "",
      status: "",
      assignTo: "",
      lastContact: "",
    });
  };

  const addBoard = () => {
    if (!newBoardName.trim()) return;
    setBoards((prev) => [
      ...prev,
      {
        id: uuid(),
        name: newBoardName,
        leads: [],
        textColor: boardTextColor,
        backgroundColor: newBoardColor,
      },
    ]);
    const params = {
      id: uuid(),
      userId: user?.id,
      name: newBoardName,
      textColor: boardTextColor,
      backgroundColor: newBoardColor,
    };
    dispatch(addBoardApi(token, params));
    setNewBoardName("");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeBoardId = active.data.current?.boardId;
    const overBoardId = over.data.current?.boardId;

    // Sort boards themselves
    if (active.data.current?.type === "board") {
      const oldIndex = boards.findIndex((b) => b?.id === active?.id);
      const newIndex = boards.findIndex((b) => b?.id === over?.id);
      setBoards(arrayMove(boards, oldIndex, newIndex));
      return;
    }

    // Sort or move leads
    if (activeBoardId && overBoardId) {
      const activeBoardIndex = boards.findIndex((b) => b?.id === activeBoardId);
      const overBoardIndex = boards.findIndex((b) => b?.id === overBoardId);
      const activeItemIndex = boards[activeBoardIndex].leads.findIndex(
        (i) => i?.id === active?.id
      );
      const overItemIndex = boards[overBoardIndex].leads.findIndex(
        (i) => i?.id === over?.id
      );

      if (activeItemIndex === -1) return;
      const item = boards[activeBoardIndex].leads[activeItemIndex];
      const updatedBoards = [...boards];
      updatedBoards[activeBoardIndex].leads.splice(activeItemIndex, 1);
      if (activeBoardId === overBoardId) {
        updatedBoards[overBoardIndex].leads = arrayMove(
          updatedBoards[overBoardIndex].leads,
          activeItemIndex,
          overItemIndex
        );
      } else {
        updatedBoards[overBoardIndex].leads.splice(
          overItemIndex >= 0 ? overItemIndex : 0,
          0,
          item
        );
        const itemId = item?.id;
        const params = {
          userId: user?.id,
          boardId: overBoardId,
        };
        dispatch(updateLead(token, params, itemId));
      }

      setBoards(updatedBoards);
    }
  };
  const handleSetOpen = (value, board) => {
    setIsOpen(value);
    setSelectedBoard(board);
  };
  useEffect(() => {
    const query = `userId=${user?.id}`;
    dispatch(getUserBoardsApi(token, query));
    dispatch(getUserLeads(token, query));
    return () => {};
  }, [user, dispatch, token]);
  useEffect(() => {
    if (boardsData?.length > 0) {
      const sortedBoards = [...boardsData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const formattedBoards = sortedBoards.map((board) => ({
        ...board,
        leads: [...(board.leads || [])],
      }));

      setBoards(formattedBoards);
    }

    return () => {};
  }, [boardsData]);

  return (
    <div>
      <PageHeader
        title="Leads Management"
        subtitle="Track, manage, and convert your leads into clients"
        // actions={
        //   <button className="btn btn-primary inline-flex items-center">
        //     <PlusIcon className="w-5 h-5 mr-1" />
        //     New Lead
        //   </button>
        // }
      />
      {/* View toggle */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === "kanban"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === "list"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            List
          </button>
        </div>
        <div>
          <select className="form-input text-sm py-1 px-3">
            <option>All Sources</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Social Media</option>
            <option>Conference</option>
          </select>
        </div>
      </div>
      {view === "kanban" && (
        <div className="p-4 space-y-4">
          <div className=" gap-2">
            <div className="flex gap-5">
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
            </div>

            <button
              onClick={addBoard}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Board
            </button>
          </div>
          {Array.isArray(boards) && boards?.length > 0 && (
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={
                  Array.isArray(boards) &&
                  boards?.length > 0 &&
                  boards?.map((b) => b.id)
                }
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex  gap-4 overflow-auto">
                  {Array.isArray(boards) &&
                    boards?.length > 0 &&
                    boards?.map((board) => (
                      <Board
                        key={board.id}
                        board={board}
                        boardId={board.id}
                        handleSetOpen={handleSetOpen}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <div>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Add Lead"
              noStartMargin={true}
              size="md"
              body={
                <div className=" mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Lead Name"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Company"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.company}
                      onChange={(e) =>
                        setNewLead({ ...newLead, company: e.target.value })
                      }
                    />

                    <input
                      type="email"
                      placeholder="Lead Email"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Lead Phone"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.phone}
                      onChange={(e) =>
                        setNewLead({ ...newLead, phone: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Source"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.source}
                      onChange={(e) =>
                        setNewLead({ ...newLead, source: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Status"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.status}
                      onChange={(e) =>
                        setNewLead({ ...newLead, status: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Assign To"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.assignTo}
                      onChange={(e) =>
                        setNewLead({ ...newLead, assignTo: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      placeholder="Last Contact"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newLead.lastContact}
                      onChange={(e) =>
                        setNewLead({ ...newLead, lastContact: e.target.value })
                      }
                    />
                  </div>

                  <button
                    onClick={addLead}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    Add Lead
                  </button>
                </div>
              }
            />
          </div>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lead.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.source}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.assignTo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(lead.lastContact).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-800 mr-3">
                        Edit
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default KanbanWithLeads;
