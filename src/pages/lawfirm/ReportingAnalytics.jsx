import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ReportingAnalytics() {
  const [dateRange, setDateRange] = useState("month");
  const [reportType, setReportType] = useState("overview");

  // Mock data for charts

  // Monthly revenue data
  const revenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          12500, 15200, 18900, 14300, 16700, 19800, 22400, 21300, 23500, 24800,
          26200, 29100,
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
      {
        label: "Expenses",
        data: [
          8200, 9100, 9800, 10300, 10500, 11200, 12100, 11800, 12300, 13100,
          13800, 14200,
        ],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Case distribution by type
  const caseTypeData = {
    labels: [
      "Family Law",
      "Corporate",
      "Estate Planning",
      "Personal Injury",
      "Criminal",
      "Real Estate",
      "Other",
    ],
    datasets: [
      {
        label: "Cases",
        data: [32, 25, 18, 15, 10, 8, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          "rgba(16, 185, 129, 0.8)", // green
          "rgba(245, 158, 11, 0.8)", // amber
          "rgba(239, 68, 68, 0.8)", // red
          "rgba(139, 92, 246, 0.8)", // purple
          "rgba(14, 165, 233, 0.8)", // light blue
          "rgba(156, 163, 175, 0.8)", // gray
        ],
        borderWidth: 0,
      },
    ],
  };

  // Task completion stats
  const taskCompletionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [18, 25, 22, 30],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "New Tasks",
        data: [22, 28, 20, 25],
        backgroundColor: "rgba(245, 158, 11, 0.7)",
      },
    ],
  };

  // Billable hours by user
  const billableHoursData = {
    labels: [
      "John Doe",
      "Jane Smith",
      "Mike Brown",
      "Sarah Johnson",
      "Robert Wilson",
    ],
    datasets: [
      {
        label: "Billable Hours",
        data: [145, 165, 132, 128, 118],
        backgroundColor: "rgba(6, 182, 212, 0.7)",
      },
    ],
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Mock KPI data
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$245,600",
      change: "+15.2%",
      isPositive: true,
    },
    { title: "Active Cases", value: "48", change: "+8.3%", isPositive: true },
    {
      title: "Average Time to Close",
      value: "36 days",
      change: "-5.8%",
      isPositive: true,
    },
    {
      title: "Conversion Rate",
      value: "28.4%",
      change: "+3.2%",
      isPositive: true,
    },
  ];

  // Mock report list
  const availableReports = [
    {
      id: "revenue",
      title: "Revenue Report",
      description: "Monthly revenue breakdown and trends",
    },
    {
      id: "cases",
      title: "Case Analysis",
      description: "Case statistics and outcome analysis",
    },
    {
      id: "productivity",
      title: "Team Productivity",
      description: "Billable hours and task completion",
    },
    {
      id: "clients",
      title: "Client Acquisition",
      description: "Lead conversion and client retention",
    },
    {
      id: "performance",
      title: "Performance Metrics",
      description: "KPIs and business health indicators",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Reporting & Analytics"
        subtitle="Gain insights into your practice performance and make data-driven decisions"
        actions={
          <button className="btn btn-outline inline-flex items-center">
            <ArrowDownTrayIcon className="w-5 h-5 mr-1" />
            Export Report
          </button>
        }
      />

      {/* Report Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setReportType("overview")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              reportType === "overview"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setReportType("finance")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              reportType === "finance"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Finance
          </button>
          <button
            onClick={() => setReportType("cases")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              reportType === "cases"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Cases
          </button>
          <button
            onClick={() => setReportType("productivity")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              reportType === "productivity"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Productivity
          </button>
        </div>

        <div className="flex gap-2">
          <select
            className="form-input text-sm py-1 px-3"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateRange === "custom" && (
            <div className="flex gap-2">
              <input type="date" className="form-input text-sm py-1 px-3" />
              <span className="self-center text-gray-500">to</span>
              <input type="date" className="form-input text-sm py-1 px-3" />
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-sm text-gray-500">{kpi.title}</h3>
            <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            <div className="mt-1 text-xs">
              <span
                className={kpi.isPositive ? "text-green-600" : "text-red-600"}
              >
                {kpi.change}
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Overview Report */}
      {reportType === "overview" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Revenue & Expenses">
              <div className="h-80">
                <Line data={revenueData} options={lineOptions} />
              </div>
            </Card>

            <Card title="Case Distribution by Type">
              <div className="h-80">
                <Doughnut
                  data={caseTypeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        },
                      },
                    },
                  }}
                />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Task Completion">
              <div className="h-80">
                <Bar data={taskCompletionData} options={barOptions} />
              </div>
            </Card>

            <Card title="Billable Hours by User">
              <div className="h-80">
                <Bar
                  data={billableHoursData}
                  options={{
                    ...barOptions,
                    indexAxis: "y",
                  }}
                />
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Finance Report */}
      {reportType === "finance" && (
        <div className="space-y-6">
          <Card title="Revenue Breakdown">
            <div className="h-80">
              <Line data={revenueData} options={lineOptions} />
            </div>
          </Card>

          {/* Additional finance-specific reports would go here */}
        </div>
      )}

      {/* Cases Report */}
      {reportType === "cases" && (
        <div className="space-y-6">
          <Card title="Case Distribution">
            <div className="h-80">
              <Doughnut
                data={caseTypeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>

          {/* Additional case-specific reports would go here */}
        </div>
      )}

      {/* Productivity Report */}
      {reportType === "productivity" && (
        <div className="space-y-6">
          <Card title="Task Completion">
            <div className="h-80">
              <Bar data={taskCompletionData} options={barOptions} />
            </div>
          </Card>

          <Card title="Billable Hours by User">
            <div className="h-80">
              <Bar
                data={billableHoursData}
                options={{
                  ...barOptions,
                  indexAxis: "y",
                }}
              />
            </div>
          </Card>

          {/* Additional productivity-specific reports would go here */}
        </div>
      )}

      {/* Available Reports */}
      <Card title="Available Reports" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableReports.map((report) => (
            <div
              key={report.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {report.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {report.description}
                  </p>
                  <button className="mt-2 text-xs text-primary-600 font-medium">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ReportingAnalytics;
