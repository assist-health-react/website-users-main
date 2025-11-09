import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaCalendarPlus, FaSpinner } from 'react-icons/fa';
import AddAppointmentForm from "./AddAppointmentForm";
import AppointmentTypeSelector from "./AppointmentTypeSelector";
import { getAppointments } from "@/services/appointmentService"
import { format } from "date-fns"

const Appointments = () => {
  // Check if user is a member
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const isMember = userProfile.isMember;

  // If not a member, show the membership required message
  if (!isMember) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-800">Not a Member</h2>
          <p className="text-gray-600">
            Access to appointment scheduling and management is available exclusively to our members. Subscribe to book and manage appointments with our healthcare professionals.
          </p>
        </div>
      </div>
    );
  }

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isSearching, setIsSearching] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchAppointments()
  }, [selectedStatus]) // Fetch when status changes

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAppointments(selectedStatus, searchQuery);
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }

  const formatDateTime = (dateTime) => {
    try {
      return format(new Date(dateTime), 'PPpp')
    } catch (err) {
      return 'Invalid Date'
    }
  }

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = (
      appointment.memberId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile)
    setShowTypeSelector(false)
    setShowAddForm(true)
  }

  const handleAppointmentCreated = async () => {
    await fetchAppointments() // Refresh the appointments list
    setShowAddForm(false) // Close the form
  }

  const handleSearch = () => {
    setIsSearching(true);
    fetchAppointments();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    fetchAppointments();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header with search, filter, and book button */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-4 bg-white border-b sticky top-0">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent w-64"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="p-1 hover:text-gray-700 text-gray-500"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="p-1 hover:text-gray-700 text-gray-500 disabled:opacity-50"
                >
                  {isSearching ? (
                    <FaSpinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <FaSearch className="w-4 h-4" />
                  )}
                </button>
              </div>
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowTypeSelector(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#38B6FF] hover:bg-[#2090d1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B6FF]"
        >
          <FaCalendarPlus className="mr-2 -ml-1 h-5 w-5" />
          Book Appointment
        </button>
      </div>

      {/* Table Container */}
        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center py-4">
            <FaSpinner className="w-6 h-6 text-[#38B6FF] mr-2 animate-spin" />
              <span className="ml-2 text-gray-600">Loading appointments...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p>{error}</p>
              <button 
                onClick={fetchAppointments}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          <table className="min-w-full divide-y divide-gray-200 table-fixed bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40px] bg-gray-50">S.No</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px] bg-gray-50">Name</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px] bg-gray-50">Service</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px] bg-gray-50">Type</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] bg-gray-50">Date & Time</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[90px] bg-gray-50">Status</th>
                <th scope="col" className="sticky top-0 px-2 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell w-[130px] bg-gray-50">Additional Info</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-2 py-4 whitespace-nowrap text-sm">{startIndex + index + 1}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm overflow-hidden">
                    <div className="truncate">{appointment.memberId.name}</div>
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm">{appointment.service}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm capitalize">{appointment.appointmentType}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm">
                    {appointment.date} {appointment.time}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-sm hidden lg:table-cell">
                    <div className="truncate max-w-[130px]" title={appointment.additionalInfo}>
                      {appointment.additionalInfo || '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredAppointments.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 border-t mt-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-start">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${currentPage === 1
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${currentPage === totalPages
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Modals */}
      {showTypeSelector && (
        <AppointmentTypeSelector
          onClose={() => setShowTypeSelector(false)}
          onSelect={handleProfileSelect}
        />
      )}

      {showAddForm && (
        <AddAppointmentForm
          onClose={() => setShowAddForm(false)}
          selectedProfile={selectedProfile}
          onSuccess={handleAppointmentCreated}
        />
      )}
    </div>
  )
}

export default Appointments 