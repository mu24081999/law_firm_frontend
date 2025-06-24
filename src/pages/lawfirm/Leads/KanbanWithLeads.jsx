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
import Card from "../../components/common/Card";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import StatusBadge from "../../components/common/StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoardApi,
  addLeadApi,
  deleteLeadApi,
  getUserBoardsApi,
  getUserLeads,
  updateLead,
} from "../../../redux/services/board";
import { getUserMembersApi } from "../../../redux/services/team";
const KanbanWithLeads = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { members } = useSelector((state) => state.team);
  const { boards: boardsData, leads } = useSelector((state) => state.board);
  const [boards, setBoards] = useState([]);
  const [view, setView] = useState("kanban");
  const [isOpen, setIsOpen] = useState(false);
  const [newBoardColor, setNewBoardColor] = useState("#fcba03");
  const [boardTextColor, setBoardTextColor] = useState("#03fc1c");
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
      ...newLead,
      boardId: selectedBoard?.id,
      userId: user?.id,
      assignTo: newLead?.assignTo === "" ? "nill" : newLead?.assignTo,
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
      // updatedBoards[activeBoardIndex].leads.splice(activeItemIndex, 1);

      if (activeBoardId === overBoardId) {
        const leads = updatedBoards[overBoardIndex]?.leads || [];
        if (
          Array.isArray(leads) &&
          activeItemIndex >= 0 &&
          overItemIndex >= 0 &&
          activeItemIndex < leads.length &&
          overItemIndex < leads.length
        ) {
          updatedBoards[overBoardIndex].leads = arrayMove(
            leads,
            activeItemIndex,
            overItemIndex
          );
        }
        console.log("🚀 ~ handleDragEnd ~ leads:", leads);
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
  const handleDeleteLead = (leadId) => {
    dispatch(deleteLeadApi(token, leadId, user?.id));
  };
  useEffect(() => {
    const query = `userId=${user?.id}`;
    dispatch(getUserBoardsApi(token, query));
    dispatch(getUserLeads(token, query));
    dispatch(
      getUserMembersApi(token, user?.member ? user?.member?.id : user?.id)
    );
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
        {/* <div>
          <select className="form-input text-sm py-1 px-3">
            <option>All Sources</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Social Media</option>
            <option>Conference</option>
          </select>
        </div> */}
      </div>
      {view === "kanban" && (
        <div className="p-4 space-y-4">
          <div className=" gap-2">
            <div className="flex gap-5 flex-wrap">
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
              <label className="">
                <p className="text-gray-700 font-medium">Background Color</p>
                <input
                  type="color"
                  value={newBoardColor}
                  onChange={(e) => setNewBoardColor(e.target.value)}
                  className="h-10 rounded w-12  border-gray-300 cursor-pointer shadow-sm"
                />
              </label>
              <label className="block">
                <p className="text-gray-700 font-medium">Text Color</p>
                <input
                  type="color"
                  value={boardTextColor}
                  onChange={(e) => setBoardTextColor(e.target.value)}
                  className="h-10 rounded w-12  border-gray-300 cursor-pointer shadow-sm"
                />
              </label>
              <button
                onClick={addBoard}
                className="bg-green-500 text-white h-10 mt-6 px-4 py-2 rounded"
              >
                Add Board
              </button>
            </div>
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
                    boards?.map((board, index) => (
                      <React.Fragment key={index}>
                        <Board
                          key={board.id}
                          board={board}
                          boardId={board.id}
                          handleSetOpen={handleSetOpen}
                        />
                      </React.Fragment>
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <div>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Lead Form"
              noStartMargin={true}
              size="md"
              body={
                <div className="w-full bg-white space-y-4">
                  <div className=" grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Lead Name"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Company"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.company}
                      onChange={(e) =>
                        setNewLead({ ...newLead, company: e.target.value })
                      }
                    />

                    <input
                      type="email"
                      placeholder="Lead Email"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Lead Phone"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.phone}
                      onChange={(e) =>
                        setNewLead({ ...newLead, phone: e.target.value })
                      }
                    />
                    <select
                      onChange={(e) =>
                        setNewLead({ ...newLead, source: e.target.value })
                      }
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.source}
                    >
                      <option value="">Select a source</option>
                      <option value="website">Website</option>
                      <option value="referal">Referal</option>
                      <option value="social-media">Social Media</option>
                      <option value="conference">Conference</option>
                    </select>

                    <select
                      onChange={(e) =>
                        setNewLead({ ...newLead, status: e.target.value })
                      }
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.status}
                    >
                      <option value="">Select a status</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On-hold</option>
                      <option value="completed">Completed</option>
                    </select>

                    <select
                      onChange={(e) =>
                        setNewLead({ ...newLead, assignTo: e.target.value })
                      }
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={newLead.assignTo}
                    >
                      <option value="">Select a member</option>
                      {Array.isArray(members?.members) &&
                        members?.members?.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.firstname + " " + member.lastname}
                          </option>
                        ))}
                    </select>

                    <input
                      type="date"
                      placeholder="Last Contact"
                      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                {leads?.map((lead) => (
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
                      {/* <button
                        className="text-primary-600 hover:text-primary-800 mr-3"
                        onClick={handleEditLead}
                      >
                        Edit
                      </button> */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteLead(lead?.id)}
                      >
                        Delete
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
