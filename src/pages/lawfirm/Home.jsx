import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFirmAnalytics } from "../../redux/services/analytics";
import PageHeader from "../components/common/PageHeader";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/common/Card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function LawFirmHome() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.analytics);
  const [analyticsData, setAnalyticsData] = useState({});
  const navigateTo = useNavigate();
  const handleNavigate = () => {
    navigateTo(`/${user.id}/login`);
  };

  useEffect(() => {
    dispatch(getFirmAnalytics(token, user.id));
  }, [token, user, dispatch]);
  useEffect(() => {
    if (analytics) {
      setAnalyticsData(analytics);
    }
  }, [analytics]);
  const summaryCards = [
    {
      title: "Active Cases",
      value: "24",
      change: "+2.5%",
      isPositive: true,
      icon: <DocumentTextIcon className="w-6 h-6 text-primary-600" />,
    },
    {
      title: "New Leads",
      value: "12",
      change: "+5.0%",
      isPositive: true,
      icon: <UserGroupIcon className="w-6 h-6 text-secondary-600" />,
    },
    {
      title: "Pending Tasks",
      value: "18",
      change: "-4.3%",
      isPositive: false,
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-warning-500" />,
    },
    {
      title: "Revenue this month",
      value: "$8,450",
      change: "+12.2%",
      isPositive: true,
      icon: <CreditCardIcon className="w-6 h-6 text-success-500" />,
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "Case",
      title: "Smith vs. Anderson",
      action: "New document added",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "Task",
      title: "Review contract",
      action: "Marked as completed",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "Lead",
      title: "Johnson Corporation",
      action: "Converted to client",
      time: "3 hours ago",
    },
    {
      id: 4,
      type: "Invoice",
      title: "INV-1234",
      action: "Payment received",
      time: "5 hours ago",
    },
  ];

  // Case distribution chart data
  const caseDistributionData = {
    labels: ["Family Law", "Corporate", "Criminal", "Property", "Other"],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          "#3B82F6", // blue
          "#06B6D4", // cyan
          "#F59E0B", // amber
          "#10B981", // green
          "#6B7280", // gray
        ],
        borderWidth: 0,
      },
    ],
  };

  // Monthly revenue chart data
  const monthlyRevenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [4500, 6000, 5200, 7800, 8200, 8450],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
  return (
    <div>
      <div>
        <div>
          <Button
            type="button"
            onClick={handleNavigate}
            className="max-w-52 float-end"
          >
            Client Portal
          </Button>
        </div>
        <PageHeader
          title="Dashboard Overview"
          subtitle="Welcome back! Here's what's happening with your practice today."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  py-5">
          <div className="bg-blue-50 p-4 ">
            <h2 className="text-sm font-medium text-blue-700 border ">
              Total Clients
            </h2>
            <p className="text-3xl font-bold text-blue-900 mt-2">
              {analyticsData?.totalClients}
            </p>
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium flex items-center ${
                  analyticsData?.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {analyticsData?.isPositive ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {11.2}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 ">
            <h2 className="text-sm font-medium text-yellow-700">
              Active Service Requests
            </h2>
            <p className="text-3xl font-bold text-yellow-900 mt-2">
              {analyticsData?.activeCases}
            </p>
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium flex items-center ${
                  analyticsData?.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {analyticsData?.isPositive ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {11.2}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-green-50 p-4 ">
            <h2 className="text-sm font-medium text-green-700">
              Completed Service Requests
            </h2>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {analyticsData?.completedCases}
            </p>
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium flex items-center ${
                  analyticsData?.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {analyticsData?.isPositive ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {11.2}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card, index) => (
            <Card key={index} className="p-4 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium flex items-center ${
                        card.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {card.isPositive ? (
                        <ArrowUpIcon className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="w-3 h-3 mr-1" />
                      )}
                      {card.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">{card.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card title="Case Distribution" className="bg-white p-5">
            <div className="h-64">
              <Doughnut
                data={caseDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%",
                  plugins: {
                    legend: {
                      position: "bottom",
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

          <Card title="Monthly Revenue" className="bg-white p-5">
            <div className="h-64">
              <Bar data={monthlyRevenueData} options={barOptions} />
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card title="Recent Activity" className="bg-white p-5">
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((item, index) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {index !== recentActivity.length - 1 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {item.type === "Case" && (
                            <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                          )}
                          {item.type === "Task" && (
                            <ClipboardDocumentListIcon className="h-5 w-5 text-warning-500" />
                          )}
                          {item.type === "Lead" && (
                            <UserGroupIcon className="h-5 w-5 text-secondary-600" />
                          )}
                          {item.type === "Invoice" && (
                            <CreditCardIcon className="h-5 w-5 text-success-500" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">
                              {item.title}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {item.action}
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
              View all activity
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LawFirmHome;
