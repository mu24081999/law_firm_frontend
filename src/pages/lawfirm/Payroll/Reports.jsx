import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import PageHeader from "./components/ui/PageHeader";
import Card from "./components/ui/Card";

function Reports() {
  const [selectedReport, setSelectedReport] = useState("payroll-summary");
  const [dateRange, setDateRange] = useState({
    start: "2025-01-01",
    end: "2025-12-31",
  });

  const reports = [
    { id: "payroll-summary", name: "Payroll Summary" },
    { id: "tax-liability", name: "Tax Liability" },
    { id: "employee-earnings", name: "Employee Earnings" },
    { id: "department-cost", name: "Department Cost Analysis" },
    { id: "timesheet-summary", name: "Timesheet Summary" },
    { id: "contractor-payments", name: "Contractor Payments" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Reports"
        subtitle="Generate and download payroll reports"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Report Types
            </h3>
            <nav className="space-y-1">
              {reports.map((report) => (
                <button
                  key={report.id}
                  className={`w-full px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    selectedReport === report.id
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  {report.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {reports.find((r) => r.id === selectedReport)?.name}
              </h3>
              <p className="text-sm text-gray-500">
                Generate a detailed report with all payroll data for the
                selected period.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="start-date" className="label">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="start-date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="input pl-10"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="end-date" className="label">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="end-date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="department" className="label">
                  Department (Optional)
                </label>
                <select id="department" className="input">
                  <option value="">All Departments</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="family">Family Law</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="ip">Intellectual Property</option>
                </select>
              </div>
              <div>
                <label htmlFor="employee-type" className="label">
                  Employee Type (Optional)
                </label>
                <select id="employee-type" className="input">
                  <option value="">All Types</option>
                  <option value="attorney">Attorneys</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="format" className="label">
                Report Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative border border-gray-300 rounded-md p-4 flex cursor-pointer hover:bg-gray-50 focus:outline-none">
                  <input
                    type="radio"
                    name="report-format"
                    value="pdf"
                    className="h-4 w-4 mt-0.5 cursor-pointer text-primary-600 border-gray-300 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label
                    htmlFor="report-format-pdf"
                    className="ml-3 flex flex-col cursor-pointer"
                  >
                    <span className="block text-sm font-medium text-gray-900">
                      PDF Format
                    </span>
                    <span className="block text-sm text-gray-500">
                      Standard printable format
                    </span>
                  </label>
                </div>
                <div className="relative border border-gray-300 rounded-md p-4 flex cursor-pointer hover:bg-gray-50 focus:outline-none">
                  <input
                    type="radio"
                    name="report-format"
                    value="excel"
                    className="h-4 w-4 mt-0.5 cursor-pointer text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="report-format-excel"
                    className="ml-3 flex flex-col cursor-pointer"
                  >
                    <span className="block text-sm font-medium text-gray-900">
                      Excel Format
                    </span>
                    <span className="block text-sm text-gray-500">
                      Spreadsheet for analysis
                    </span>
                  </label>
                </div>
                <div className="relative border border-gray-300 rounded-md p-4 flex cursor-pointer hover:bg-gray-50 focus:outline-none">
                  <input
                    type="radio"
                    name="report-format"
                    value="csv"
                    className="h-4 w-4 mt-0.5 cursor-pointer text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="report-format-csv"
                    className="ml-3 flex flex-col cursor-pointer"
                  >
                    <span className="block text-sm font-medium text-gray-900">
                      CSV Format
                    </span>
                    <span className="block text-sm text-gray-500">
                      Raw data for import
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" className="btn btn-outline">
                Preview Report
              </button>
              <button type="button" className="btn btn-primary">
                Generate Report
              </button>
            </div>
          </Card>

          {selectedReport === "payroll-summary" && (
            <div className="mt-6">
              <Card title="Recent Reports">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Generated On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Payroll Summary
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 1, 2025 - Jun 30, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jul 5, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PDF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Payroll Summary
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 1, 2025 - Mar 31, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Apr 5, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Excel
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Payroll Summary
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 1, 2024 - Dec 31, 2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 15, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PDF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
