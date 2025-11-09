import React, { useState, useEffect, useContext } from 'react'
import ViewMedicalHistory from "./ViewMedicalHistory.jsx"
import EmptyMedicalHistory from "./EmptyMedicalHistory.jsx"
import { medicalHistoryService } from "@/services/medicalHistoryService"
import { toast } from 'react-hot-toast'
import { ProfileContext } from '../Profile/ProfileMenu'
import { format } from "date-fns"
import { FaSearch, FaTimes } from 'react-icons/fa'

const MedicalHistory = () => {
  const { activeProfile } = useContext(ProfileContext);
  const [selectedHistory, setSelectedHistory] = useState(null)
  const [medicalHistories, setMedicalHistories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const fetchMedicalHistories = async (query = '') => {
    try {
      setLoading(true);
      console.log('Fetching medical histories');
      const response = await medicalHistoryService.getAllMedicalHistory(query);
      
      if (response.status === 'success' && response.data) {
        setMedicalHistories(response.data);
        console.log('Successfully fetched medical histories:', response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching medical histories:', err);
      setError(err.message || 'Failed to fetch medical histories');
      toast.error('Failed to load medical histories');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (activeProfile?.isMember) {
      fetchMedicalHistories();
    } else {
      setLoading(false);
    }
  }, [activeProfile]);



  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    fetchMedicalHistories(searchQuery.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchMedicalHistories('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38B6FF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchMedicalHistories}
            className="px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show not a member message if user is not a member
  if (!activeProfile?.isMember) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Not a Member</h2>
            <p className="text-gray-600">
              You need to be a member to access medical history. Please subscribe to our membership to unlock this feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
          <div className="bg-white rounded-xl shadow-sm">
        {/* Header with Search bar */}
            <div className="p-6 border-b border-gray-200">
          <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
                <p className="text-gray-600 mt-1">View your medical records</p>
              </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by condition, medication, doctor, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2 transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
            </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {medicalHistories.length === 0 ? (
            <EmptyMedicalHistory />
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {medicalHistories.map((history) => (
                  <div
                    key={history._id}
                    onClick={() => setSelectedHistory(history)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#38B6FF]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {format(new Date(history.createdAt), 'MMMM dd, yyyy')}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {/* Summary of medical conditions */}
                      {history.previousMedicalConditions.length > 0 && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Medical Conditions: </span>
                          {history.previousMedicalConditions.map(condition => condition.condition).join(', ')}
                        </div>
                      )}
                      {/* Summary of medications */}
                      {history.currentMedications.length > 0 && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Current Medications: </span>
                          {history.currentMedications.map(med => med.name).join(', ')}
                      </div>
                      )}
                      {/* Lifestyle habits */}
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Lifestyle: </span>
                        Smoking: {history.lifestyleHabits.smoking}, 
                        Alcohol: {history.lifestyleHabits.alcoholConsumption}, 
                        Exercise: {history.lifestyleHabits.exercise}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedHistory && (
        <ViewMedicalHistory
          history={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </div>
  );
};

export default MedicalHistory 