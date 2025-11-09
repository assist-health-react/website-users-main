const AssessmentList = ({ assessments, onViewDetails, loading, onLoadMore }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {assessments.map((assessment) => (
          <li key={assessment.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                 onClick={() => onViewDetails(assessment)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {assessment.studentName}
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    ID: {assessment.studentId}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${assessment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {assessment.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <div className="text-sm text-gray-500">
                    Type: {assessment.type}
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Date: {new Date(assessment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="flex justify-center py-4">
          <div className="loader">Loading...</div>
        </div>
      )}
      {!loading && assessments.length > 0 && (
        <div className="flex justify-center py-4">
          <button
            onClick={onLoadMore}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentList; 