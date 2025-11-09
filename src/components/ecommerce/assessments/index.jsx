import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes, FaDownload, FaUpload } from 'react-icons/fa';
import ViewAssessmentDetails from "./ViewAssessmentDetails";
import ReportFilters from "./ReportFilters";

// Sample data for assessments
const assessmentData = Array.from({ length: 40 }, (_, index) => ({
  id: `ASS${(index + 1).toString().padStart(3, '0')}`,
  studentId: `STU${(index + 1).toString().padStart(3, '0')}`,
  name: `Student ${index + 1}`,
  school: `School ${Math.floor(index / 10) + 1}`,
  class: `Grade ${Math.floor(Math.random() * 12) + 1}`,
  section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
  date: new Date(2024, 0, index + 1).toISOString(),
  temperature: (35.5 + Math.random() * 2).toFixed(1),
  mobile: `98765${(index + 1).toString().padStart(5, '0')}`,
  gender: ['Male', 'Female'][Math.floor(Math.random() * 2)]
}));

const AssessmentReport = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    school: '',
    class: '',
    section: '',
    fromDate: '',
    toDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const tableRef = useRef(null);

  const filteredData = useMemo(() => {
    return assessmentData.filter(assessment => {
      // Search term filter
      const searchMatch = 
        assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.school.toLowerCase().includes(searchTerm.toLowerCase());

      // Filters
      const schoolMatch = !filters.school || assessment.school === filters.school;
      const classMatch = !filters.class || assessment.class === filters.class;
      const sectionMatch = !filters.section || assessment.section === filters.section;
      const dateMatch = (!filters.fromDate || new Date(assessment.date) >= new Date(filters.fromDate)) &&
                       (!filters.toDate || new Date(assessment.date) <= new Date(filters.toDate));

      return searchMatch && schoolMatch && classMatch && sectionMatch && dateMatch;
    });
  }, [searchTerm, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset pagination when filters change
    setVisibleRange({ start: 0, end: 20 });
    setHasMore(true);
  };

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    if (scrollPercentage > 80 && !loading && hasMore) {
      loadMoreItems();
    }
  }, [loading, hasMore]);

  const loadMoreItems = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleRange(prev => ({
        start: prev.start,
        end: Math.min(prev.end + 10, filteredData.length)
      }));
      setHasMore(visibleRange.end + 10 < filteredData.length);
      setLoading(false);
    }, 500);
  };

  const handleViewDetails = (assessment) => {
    setSelectedAssessment(assessment);
    setShowDetails(true);
  };

  const handleBulkUpload = () => {
    console.log('Bulk upload clicked');
    // Implement bulk upload functionality
  };

  const handleDownload = () => {
    console.log('Download clicked');
    // Implement download functionality
  };

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
      return () => tableElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-full bg-white p-6">
      {/* Search and Actions Bar */}
      <div className="mb-6">
        <div className="relative flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 px-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <FaFilter />
            Filters
          </button>
          <button
            onClick={handleBulkUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <FaUpload />
            Upload
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
          >
            <FaDownload />
            Download
          </button>
        </div>

        {/* Active Filters Display */}
        {Object.values(filters).some(value => value) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <div key={key} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <span>{key}: {value}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="flex-1 border rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-gray-50 border-b sticky top-0 z-10">
          <div className="text-sm font-semibold text-gray-700">Sl.No</div>
          <div className="text-sm font-semibold text-gray-700">Student ID</div>
          <div className="text-sm font-semibold text-gray-700">Name</div>
          <div className="text-sm font-semibold text-gray-700">Mobile Number</div>
          <div className="text-sm font-semibold text-gray-700">Gender</div>
          <div className="text-sm font-semibold text-gray-700">Grade</div>
          <div className="text-sm font-semibold text-gray-700">Temperature</div>
          <div className="text-sm font-semibold text-gray-700 text-center">Action</div>
        </div>

        {/* Table Body */}
        <div 
          ref={tableRef}
          className="overflow-y-auto max-h-[calc(100vh-300px)]"
        >
          {filteredData.slice(visibleRange.start, visibleRange.end).map((assessment, index) => (
            <div 
              key={assessment.id} 
              className="grid grid-cols-8 gap-4 px-6 py-4 border-b hover:bg-gray-50"
            >
              <div className="flex items-center text-gray-600">
                {visibleRange.start + index + 1}
              </div>
              <div className="flex items-center text-gray-600">
                {assessment.studentId}
              </div>
              <div className="flex items-center text-gray-700 font-medium">
                {assessment.name}
              </div>
              <div className="flex items-center text-gray-600">
                {assessment.mobile}
              </div>
              <div className="flex items-center text-gray-600">
                {assessment.gender}
              </div>
              <div className="flex items-center text-gray-600">
                {assessment.class} - {assessment.section}
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  parseFloat(assessment.temperature) > 37 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {assessment.temperature}°C
                </span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleViewDetails(assessment)}
                  className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
                >
                  View
                </button>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="px-6 py-8 text-center text-gray-500 bg-gray-50 border-b">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <div className="mt-2">Loading more items...</div>
            </div>
          )}

          {/* Empty state */}
          {filteredData.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-lg mb-2">No assessments found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search terms or filters</div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination info */}
      <div className="mt-4 px-2 text-sm text-gray-600 flex items-center justify-between">
        <div>
          Showing {visibleRange.start + 1} to {Math.min(visibleRange.end, filteredData.length)} of {filteredData.length} entries
        </div>
        {hasMore && (
          <div className="text-gray-500">
            Scroll down to load more
          </div>
        )}
      </div>

      {/* Assessment Details Modal */}
      <ViewAssessmentDetails
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedAssessment(null);
        }}
        assessment={selectedAssessment}
      />

      {/* Filters Modal */}
      <ReportFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default AssessmentReport; 