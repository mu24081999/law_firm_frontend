import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import PageHeader from "./components/ui/PageHeader";
import { employees, departments, roles } from "../data/employeesData";

function Employees() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    type: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        !filters.department || employee.department === filters.department;

      const matchesRole = !filters.role || employee.role === filters.role;

      const matchesType = !filters.type || employee.type === filters.type;

      return matchesSearch && matchesDepartment && matchesRole && matchesType;
    });
  }, [search, filters]);

  const resetFilters = () => {
    setFilters({
      department: "",
      role: "",
      type: "",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Employees"
        subtitle="Manage your law firm's employees"
        action={<button className="btn btn-primary">Add Employee</button>}
      />

      <div className="bg-white shadow-card rounded-lg overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employees..."
                className="input pl-10"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
              {(filters.department || filters.role || filters.type) && (
                <span className="ml-2 bg-primary-100 text-primary-800 py-0.5 px-2 rounded-full text-xs font-medium">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="department" className="label">
                  Department
                </label>
                <select
                  id="department"
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                  className="input"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="role" className="label">
                  Role
                </label>
                <select
                  id="role"
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                  className="input"
                >
                  <option value="">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="type" className="label">
                  Type
                </label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value="attorney">Attorney</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              {(filters.department || filters.role || filters.type) && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary/Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={employee.profileImage}
                          alt={employee.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <Link
                            to={`/employees/${employee.id}`}
                            className="hover:text-primary-600"
                          >
                            {employee.name}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.type === "attorney"
                          ? "bg-primary-100 text-primary-800"
                          : "bg-secondary-100 text-secondary-800"
                      }`}
                    >
                      {employee.type === "attorney" ? "Attorney" : "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.type === "attorney" ? (
                      <div>
                        <div>${employee.salary.toLocaleString()}/year</div>
                        <div className="text-xs text-gray-400">
                          ${employee.hourlyRate}/hour billable
                        </div>
                      </div>
                    ) : (
                      <div>${employee.salary.toLocaleString()}/year</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === "active"
                          ? "bg-success-50 text-success-900"
                          : "bg-error-50 text-error-900"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/lawfirm/payroll/employees/${employee.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View
                    </Link>
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
