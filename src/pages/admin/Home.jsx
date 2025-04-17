function AdminHome() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-indigo-700">Total Law Firms</h2>
          <p className="text-3xl font-bold text-indigo-900 mt-2">0</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-700">Total Users</h2>
          <p className="text-3xl font-bold text-green-900 mt-2">0</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-purple-700">Active Cases</h2>
          <p className="text-3xl font-bold text-purple-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;