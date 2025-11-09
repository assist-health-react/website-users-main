import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTimes, FaPlus, FaMinus, FaCreditCard, FaPaypal } from 'react-icons/fa'

const PaymentModal = ({ isOpen, onClose, cartTotal }) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle payment processing here
    alert('Payment processed successfully!')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
            <div className="bg-[#38B6FF]/5 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-[#38B6FF]">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === 'card' ? 'border-[#38B6FF] bg-[#38B6FF]/5' : 'border-gray-200'
                  }`}
                >
                  <FaCreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#38B6FF]' : 'text-gray-400'}`} />
                  <span className={paymentMethod === 'card' ? 'text-[#38B6FF]' : 'text-gray-600'}>Credit/Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === 'paypal' ? 'border-[#38B6FF] bg-[#38B6FF]/5' : 'border-gray-200'
                  }`}
                >
                  <FaPaypal className={`w-6 h-6 ${paymentMethod === 'paypal' ? 'text-[#38B6FF]' : 'text-gray-400'}`} />
                  <span className={paymentMethod === 'paypal' ? 'text-[#38B6FF]' : 'text-gray-600'}>PayPal</span>
                </button>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Card Details - Show only if card payment is selected */}
            {paymentMethod === 'card' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Card Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#38B6FF] text-white py-3 rounded-lg hover:bg-[#2090d1] transition-colors"
            >
              Pay ₹{cartTotal.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal 