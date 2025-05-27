import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Employees", href: "/employees", icon: UserGroupIcon },
  {
    name: "Payroll",
    items: [
      { name: "Run Payroll", href: "/payroll/run", icon: CurrencyDollarIcon },
      { name: "Payroll History", href: "/payroll/history", icon: ClockIcon },
      {
        name: "Salary Management",
        href: "/payroll/salary",
        icon: BanknotesIcon,
      },
      { name: "Tax Calculations", href: "/payroll/tax", icon: CalculatorIcon },
      { name: "Pay Slips", href: "/payroll/slips", icon: DocumentTextIcon },
    ],
  },
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Documents", href: "/documents", icon: DocumentChartBarIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const renderNavItem = (item) => {
    if (item.items) {
      return (
        <div key={item.name} className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {item.name}
          </div>
          {item.items.map((subItem) => {
            const Icon = subItem.icon;
            return (
              <NavLink
                key={subItem.name}
                to={subItem.href}
                className={({ isActive }) =>
                  `group flex items-center pl-5 px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {subItem.name}
              </NavLink>
            );
          })}
        </div>
      );
    }

    const Icon = item.icon;
    return (
      <NavLink
        key={item.name}
        to={item.href}
        className={({ isActive }) =>
          `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            isActive
              ? "bg-primary-100 text-primary-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`
        }
        onClick={() => setSidebarOpen(false)}
      >
        <Icon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        {item.name}
      </NavLink>
    );
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 "
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-xl font-bold text-primary-950">LawPay</h1>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((nav) => {
                    console.log(nav);
                  })}
                </nav>
              </div>
            </div>
          </Transition.Child>
          {/* <div className="flex-shrink-0 w-14" aria-hidden="true" /> */}
        </Dialog>
      </Transition.Root>

      {/* Desktop navigation */}
      <div className=" md:flex md:flex-col md:w-64 md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-primary-950">LawPay</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => renderNavItem(item))}
              {/* {renderNavItem({ name: "Dashboard", href: "/", icon: HomeIcon })} */}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
