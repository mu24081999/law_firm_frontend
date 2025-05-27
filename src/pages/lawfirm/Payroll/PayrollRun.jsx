import { useState } from "react";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "./components/ui/PageHeader";
import Card from "./components/ui/Card";
import { employees } from "../data/employeesData";
import { payrollItems } from "../data/payrollData";

function PayrollRun() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState(
    employees.map((e) => e.id)
  );
  const [payPeriod] = useState({
    start: "October 16, 2025",
    end: "October 31, 2025",
    payDate: "November 5, 2025",
  });

  const totalGross = payrollItems.reduce((sum, item) => sum + item.grossPay, 0);
  const totalTaxes = payrollItems.reduce(
    (sum, item) =>
      sum +
      item.federalTax +
      item.stateTax +
      item.medicareTax +
      item.socialSecurityTax,
    0
  );
  const totalDeductions = payrollItems.reduce(
    (sum, item) =>
      sum + item.healthInsurance + item.retirement401k + item.otherDeductions,
    0
  );
  const totalNet = payrollItems.reduce((sum, item) => sum + item.netPay, 0);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map((e) => e.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const toggleEmployee = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Run Payroll"
        subtitle="Process payroll for the current period"
      />

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                currentStep >= 1
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setCurrentStep(1)}
            >
              <span className="bg-primary-100 text-primary-700 h-5 w-5 rounded-full inline-flex items-center justify-center mr-2 text-xs">
                1
              </span>
              Review
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                currentStep >= 2
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
            >
              <span
                className={`h-5 w-5 rounded-full inline-flex items-center justify-center mr-2 text-xs ${
                  currentStep >= 2
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                2
              </span>
              Approve
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                currentStep >= 3
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => currentStep >= 3 && setCurrentStep(3)}
            >
              <span
                className={`h-5 w-5 rounded-full inline-flex items-center justify-center mr-2 text-xs ${
                  currentStep >= 3
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                3
              </span>
              Submit
            </button>
          </nav>
        </div>
      </div>

      {currentStep === 1 && (
        <>
          <div className="mb-6">
            <Card>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-gray-700 mb-4">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      Pay Period:{" "}
                      <strong>
                        {payPeriod.start} - {payPeriod.end}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      Pay Date: <strong>{payPeriod.payDate}</strong>
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Approval
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Employees</h3>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={selectedEmployees.length === employees.length}
                    onChange={toggleSelectAll}
                  />
                  <span className="ml-2 text-sm text-gray-700">Select All</span>
                </label>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regular Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overtime Hours
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollItems.map((item) => {
                    const taxes =
                      item.federalTax +
                      item.stateTax +
                      item.medicareTax +
                      item.socialSecurityTax;
                    const deductions =
                      item.healthInsurance +
                      item.retirement401k +
                      item.otherDeductions;

                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={selectedEmployees.includes(
                              item.employeeId
                            )}
                            onChange={() => toggleEmployee(item.employeeId)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.regularHours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.overtimeHours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $
                          {item.grossPay.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $
                          {taxes.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $
                          {deductions.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          $
                          {item.netPay.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                    >
                      Totals:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $
                      {totalGross.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $
                      {totalTaxes.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $
                      {totalDeductions.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $
                      {totalNet.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(2)}
              >
                Continue to Approval
              </button>
            </div>
          </Card>
        </>
      )}

      {currentStep === 2 && (
        <Card>
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Payroll Summary
            </h3>
            <p className="text-gray-500">
              Please review the payroll details before submitting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Pay Period
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{payPeriod.start}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{payPeriod.end}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay Date:</span>
                  <span className="font-medium">{payPeriod.payDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">Totals</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">
                    {selectedEmployees.length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Gross Pay:</span>
                  <span className="font-medium">
                    $
                    {totalGross.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total Taxes:</span>
                  <span className="font-medium">
                    $
                    {totalTaxes.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total Deductions:</span>
                  <span className="font-medium">
                    $
                    {totalDeductions.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="font-medium">Net Pay:</span>
                  <span className="font-bold text-primary-900">
                    $
                    {totalNet.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="flex items-center mb-2">
                <input
                  id="approve"
                  name="approve"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="approve" className="ml-2 text-sm text-gray-700">
                  I approve this payroll for processing
                </label>
              </div>
              <p className="text-xs text-gray-500 max-w-md text-center">
                By checking this box, you confirm that you have reviewed the
                payroll and authorize the payment of $
                {totalNet.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                to {selectedEmployees.length} employees.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                className="btn btn-outline"
                onClick={() => setCurrentStep(1)}
              >
                Back to Review
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(3)}
              >
                Submit Payroll
              </button>
            </div>
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-50 mb-6">
              <CheckCircleIcon className="h-10 w-10 text-success-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Payroll Successfully Submitted
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              The payroll for {payPeriod.start} - {payPeriod.end} has been
              scheduled for payment on {payPeriod.payDate}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="btn btn-outline">View Details</button>
              <button className="btn btn-primary">Return to Dashboard</button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default PayrollRun;
