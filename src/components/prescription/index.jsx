import React, { useState, useRef } from 'react'
import Tabs from "./Tabs"
import SearchBar from "./SearchBar"
import ContentTable from "./ContentTable"
import Pagination from "./Pagination"
import { FaPrescription } from 'react-icons/fa'

const PrescriptionManager = () => {
  // Check if user is a member
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const isMember = userProfile.isMember;

  // If not a member, show the membership required message
  if (!isMember) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="text-6xl mb-4">💊</div>
          <h2 className="text-2xl font-bold text-gray-800">Not a Member</h2>
          <p className="text-gray-600">
            Access to your prescription history and medical documents is available exclusively to our members. Subscribe to securely store and manage all your healthcare records in one place.
          </p>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('prescriptions')
  const [searchQuery, setSearchQuery] = useState('')
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      name: "James Wilson",
      doctorName: "Dr. Sarah Smith (Cardiologist)",
      date: "Jan 15, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_1.pdf"
    },
    {
      id: 2,
      name: "Emma Thompson",
      doctorName: "Dr. John Doe (General Physician)",
      date: "Jan 16, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_2.pdf"
    },
    {
      id: 3,
      name: "Alexander Lee",
      doctorName: "Dr. Emily Brown (Pediatrician)",
      date: "Jan 17, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_3.pdf"
    },
    {
      id: 4,
      name: "Sophia Martinez",
      doctorName: "Dr. Michael Chen (Neurologist)",
      date: "Jan 18, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_4.pdf"
    },
    {
      id: 5,
      name: "Oliver Brown",
      doctorName: "Dr. Lisa Wang (Dermatologist)",
      date: "Jan 19, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_5.pdf"
    },
    {
      id: 6,
      name: "Isabella Garcia",
      doctorName: "Dr. Robert Johnson (Orthopedist)",
      date: "Jan 20, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_6.pdf"
    },
    {
      id: 7,
      name: "William Taylor",
      doctorName: "Dr. Maria Rodriguez (Endocrinologist)",
      date: "Jan 21, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_7.pdf"
    },
    {
      id: 8,
      name: "Ava Johnson",
      doctorName: "Dr. David Kim (Psychiatrist)",
      date: "Jan 22, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_8.pdf"
    },
    {
      id: 9,
      name: "Lucas Anderson",
      doctorName: "Dr. Jennifer Lee (Ophthalmologist)",
      date: "Jan 23, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_9.pdf"
    },
    {
      id: 10,
      name: "Mia Rodriguez",
      doctorName: "Dr. Sarah Smith (Cardiologist)",
      date: "Jan 24, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_10.pdf"
    },
    {
      id: 11,
      name: "Ethan Wilson",
      doctorName: "Dr. John Doe (General Physician)",
      date: "Jan 25, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_11.pdf"
    },
    {
      id: 12,
      name: "Charlotte Davis",
      doctorName: "Dr. Emily Brown (Pediatrician)",
      date: "Jan 26, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_12.pdf"
    },
    {
      id: 13,
      name: "Henry Miller",
      doctorName: "Dr. Michael Chen (Neurologist)",
      date: "Jan 27, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_13.pdf"
    },
    {
      id: 14,
      name: "Amelia White",
      doctorName: "Dr. Lisa Wang (Dermatologist)",
      date: "Jan 28, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_14.pdf"
    },
    {
      id: 15,
      name: "Sebastian Clark",
      doctorName: "Dr. Robert Johnson (Orthopedist)",
      date: "Jan 29, 2024",
      fileUrl: "https://example.com/prescriptions/prescription_15.pdf"
    }
  ])
  
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Blood Test Report",
      type: "PDF",
      date: "Jan 15, 2024",
      fileUrl: "https://example.com/files/blood_test.pdf"
    },
    {
      id: 2,
      name: "X-Ray Report",
      type: "PDF",
      date: "Jan 16, 2024",
      fileUrl: "https://example.com/files/xray.pdf"
    }
  ])

  const [images, setImages] = useState([
    {
      id: 1,
      name: "X-Ray Image",
      type: "Image",
      date: "Jan 15, 2024",
      fileUrl: "https://example.com/images/xray.jpg"
    },
    {
      id: 2,
      name: "MRI Scan",
      type: "Image",
      date: "Jan 16, 2024",
      fileUrl: "https://example.com/images/mri.jpg"
    }
  ])

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(2)
  const observer = useRef()

  const handleDownload = async (fileUrl, itemId) => {
    try {
      const response = await fetch(fileUrl)
      if (!response.ok) throw new Error('Failed to fetch file')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `file_${itemId}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleAdd = (type) => {
    // This function will be implemented later to handle adding new items
    console.log(`Adding new ${type}`)
  }

  const getFilteredData = () => {
    switch (activeTab) {
      case 'prescriptions':
        return prescriptions.filter(prescription => 
          prescription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prescription.date.toLowerCase().includes(searchQuery.toLowerCase())
        )
      case 'files':
        return files.filter(file =>
          file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.date.toLowerCase().includes(searchQuery.toLowerCase())
        )
      case 'images':
        return images.filter(image =>
          image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.date.toLowerCase().includes(searchQuery.toLowerCase())
        )
      default:
        return []
    }
  }

  const filteredData = getFilteredData().slice((page - 1) * 10, page * 10)

  return (
    <div className="flex flex-col space-y-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <SearchBar
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAdd={handleAdd}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ContentTable
          activeTab={activeTab}
          filteredData={filteredData}
          handleDownload={handleDownload}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          handlePageChange={handlePageChange}
        />
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  )
}

export default PrescriptionManager 