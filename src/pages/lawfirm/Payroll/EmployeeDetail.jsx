import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Card from "./components/ui/Card";
import { employees } from "../data/employeesData";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const emp = employees.find((e) => e.id === parseInt(id, 10));
    setEmployee(emp);
  }, [id]);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading employee data...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link
          to="/employees"
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Employees
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
        <div className="bg-primary-950 h-32 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="pt-20 pb-6 px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.name}
              </h1>
              <p className="text-gray-600">
                {employee.role} - {employee.department}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button className="btn btn-outline">Edit Profile</button>
              <button className="btn btn-primary">Run Payroll</button>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "payroll"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("payroll")}
              >
                Payroll History
              </button>
              <button
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "documents"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </button>
            </nav>
          </div>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </h4>
                  <p className="text-gray-900">{employee.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </h4>
                  <p className="text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Department
                  </h4>
                  <p className="text-gray-900">{employee.department}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Role
                  </h4>
                  <p className="text-gray-900">{employee.role}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Employee Type
                  </h4>
                  <p className="text-gray-900 capitalize">{employee.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Hire Date
                  </h4>
                  <p className="text-gray-900">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Compensation">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Annual Salary
                  </h4>
                  <p className="text-xl font-medium text-gray-900">
                    ${employee.salary.toLocaleString()}
                  </p>
                </div>
                {employee.type === "attorney" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Billable Rate
                    </h4>
                    <p className="text-xl font-medium text-gray-900">
                      ${employee.hourlyRate}/hour
                    </p>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Benefits
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Insurance</span>
                      <span className="text-gray-900">Enrolled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">401(k)</span>
                      <span className="text-gray-900">8% contribution</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dental</span>
                      <span className="text-gray-900">Enrolled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vision</span>
                      <span className="text-gray-900">Enrolled</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "payroll" && (
        <Card title="Payroll History">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pay Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pay Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Pay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Oct 1-15, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Oct 20, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $5,769.23
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $1,731.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $692.31
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    $3,345.92
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Sep 16-30, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Oct 5, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $5,769.23
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $1,731.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $692.31
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    $3,345.92
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Sep 1-15, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Sep 20, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $5,769.23
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $1,731.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $692.31
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    $3,345.92
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card title="Documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">2025 W-2 Form</h4>
                  <p className="text-sm text-gray-500 mt-1">Tax Year 2025</p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Employment Contract</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Signed on {formatDate(employee.hireDate)}
                  </p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Direct Deposit Form</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated Oct 2, 2025
                  </p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Benefits Enrollment</h4>
                  <p className="text-sm text-gray-500 mt-1">Plan Year 2025</p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default EmployeeDetail;
