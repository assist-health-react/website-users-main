import { FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa'

const NavigatorContactPopup = ({ navigator, onClose }) => {
  const handleCall = () => {
    window.location.href = `tel:${navigator.phone}`
  }

  const handleWhatsApp = () => {
    const phoneNumber = navigator.phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
  }

  return (
    <div className="absolute z-20 bg-white rounded-xl shadow-lg p-4 w-64 border border-gray-100 backdrop-blur-xl bg-white/80">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-800">{navigator.name}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={handleCall}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <FaPhone /> Call
        </button>
        <button
          onClick={handleWhatsApp}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <FaWhatsapp /> WhatsApp
        </button>
      </div>
    </div>
  )
}

export default NavigatorContactPopup 