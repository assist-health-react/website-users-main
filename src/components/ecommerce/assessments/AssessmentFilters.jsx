const AssessmentFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange('date', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assessment Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Types</option>
            <option value="physical">Physical</option>
            <option value="mental">Mental</option>
            <option value="dental">Dental</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFilters; 