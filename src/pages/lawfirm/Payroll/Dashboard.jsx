import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import PageHeader from "./components/ui/PageHeader";
import StatsCard from "./components/ui/StatsCard";
import PayrollSummary from "./components/dashboard/PayrollSummary";
import RecentPayments from "./components/dashboard/RecentPayments";
import { employees } from "../data/employeesData";
import { payrollHistory } from "../data/payrollData";

function PayrollDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeAttorneys: 0,
    lastPayrollAmount: "$0",
    averagePayroll: "$0",
    pendingRequests: 0,
  });

  useEffect(() => {
    // Calculate stats from the mock data
    const totalEmployees = employees.length;
    const activeAttorneys = employees.filter(
      (e) => e.type === "attorney" && e.status === "active"
    ).length;
    const lastPayrollAmount =
      payrollHistory.length > 0
        ? `$${payrollHistory[0].totalNet.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`
        : "$0";

    const avgPayroll =
      payrollHistory.reduce((sum, item) => sum + item.totalNet, 0) /
      payrollHistory.length;
    const averagePayroll = `$${avgPayroll.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}`;

    setStats({
      totalEmployees,
      activeAttorneys,
      lastPayrollAmount,
      averagePayroll,
      pendingRequests: 3, // Mock value
    });
  }, []);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your law firm's payroll"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<UserGroupIcon className="h-6 w-6" />}
          description="Active employees in the system"
        />
        <StatsCard
          title="Active Attorneys"
          value={stats.activeAttorneys}
          icon={<UserGroupIcon className="h-6 w-6" />}
          description="Billable team members"
        />
        <StatsCard
          title="Last Payroll"
          value={stats.lastPayrollAmount}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ positive: true, value: "2.4%" }}
          description="Total amount processed"
        />
        <StatsCard
          title="Average Payroll"
          value={stats.averagePayroll}
          icon={<CreditCardIcon className="h-6 w-6" />}
          description="Based on last 6 months"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PayrollSummary />
        <RecentPayments />
      </div>
    </div>
  );
}

export default PayrollDashboard;
