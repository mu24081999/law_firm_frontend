import { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import StatusBadge from "../components/common/StatusBadge";
import EmptyState from "../components/common/EmptyState";
import {
  PlusIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import CaseForm from "./caseManagementComponents/CaseForm";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCaseApi,
  getUserCasesApi,
  updateCaseApi,
} from "../../redux/services/case";
import CaseDetails from "./caseManagementComponents/CaseDetails";

function CaseManagement() {
  const { user, token } = useSelector((state) => state.auth);
  const { cases: caseData } = useSelector((state) => state.case);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  // Mock case data

  const filteredCases = caseData?.filter((caseItem) => {
    const matchTab = selectedTab === "all" || caseItem.status === selectedTab;

    const matchSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.case_number?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType =
      selectedType === "All Types" || caseItem.case_type === selectedType;

    return matchTab && matchSearch && matchType;
  });

  const handleOnSubmitCase = (data) => {
    console.log("Submitted Case Data:", data);
    const params = {
      ...data,
      userId: user?.id,
      notes: [data?.notes],
    };
    selectedCase
      ? dispatch(updateCaseApi(token, params, selectedCase?.id))
      : dispatch(addCaseApi(token, params));
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getUserCasesApi(token, user?.id));
  }, [dispatch, token, user]);

  return (
    <div>
      <PageHeader
        title="Case Management"
        subtitle="Manage your legal cases and track their progress"
        actions={
          <button
            className="bg-blue-600 float-end ms-4 flex px-2 py-2 rounded text-white items-center"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            New Case
          </button>
        }
      />

      {/* Filters and search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search cases..."
            className="ml-2 flex-1 bg-transparent border-none focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {/* <button className="btn btn-outline inline-flex items-center bg-white p-2 rounded">
            <FunnelIcon className="w-5 h-5 mr-1" />
            Filter
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </button> */}

          <select
            className="form-input px-3 py-2 pr-8 bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>All Types</option>
            <option>Family Law</option>
            <option>Corporate</option>
            <option>Estate Planning</option>
            <option>Personal Injury</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setSelectedTab("all")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === "all"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300"
            }`}
          >
            All Cases
          </button>
          <button
            onClick={() => setSelectedTab("open")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === "open"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedTab("on-hold")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === "on-hold"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300"
            }`}
          >
            On Hold
          </button>
          <button
            onClick={() => setSelectedTab("closed")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === "closed"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300"
            }`}
          >
            Completed
          </button>
        </nav>
      </div>

      {/* Cases list */}
      {filteredCases?.length > 0 ? (
        <div className="space-y-4 bg-white rounded">
          {filteredCases?.map((caseItem) => (
            <Card
              key={caseItem?.id}
              className="p-0 overflow-hidden hover:shadow- border transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {caseItem?.title}
                      </h3>
                      <span className="ml-3 text-sm text-gray-500">
                        ({caseItem?.case_number})
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-4">Type: {caseItem?.case_type}</span>
                      <span>Client: {caseItem?.client_name}</span>
                    </div>
                  </div>
                  <StatusBadge status={caseItem?.status} />
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-800">Notes:</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {typeof caseItem?.notes === "string"
                      ? JSON.parse(caseItem?.notes)?.[0]
                      : caseItem?.notes?.[0]}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(caseItem?.updatedAt).toLocaleDateString()}
                </div>

                <div className="flex space-x-2">
                  <button
                    className="btn btn-outline text-sm py-1"
                    onClick={() => {
                      setSelectedCase(caseItem);
                      setIsOpen(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No cases found"
          description="Get started by creating your first case"
          icon={<FolderIcon className="w-8 h-8 text-gray-400" />}
          action={
            <button className="btn btn-primary inline-flex items-center">
              <PlusIcon className="w-5 h-5 mr-1" />
              New Case
            </button>
          }
        />
      )}
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedCase(null);
          }}
          title={selectedCase ? "Case Details" : "New Case"}
          size={"xl"}
          body={
            // selectedCase ? (
            //   <CaseDetails data={selectedCase} />
            // ) : (
            <CaseForm
              onSubmit={handleOnSubmitCase}
              selectedCase={selectedCase}
            />
            // )
          }
        />
      </div>
    </div>
  );
}

export default CaseManagement;
