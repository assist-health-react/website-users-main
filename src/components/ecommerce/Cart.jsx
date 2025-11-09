import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'

const Cart = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
  onCheckout,
  calculateTotal
}) => {
  if (!isOpen) return null

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Cart Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-6 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <div className="text-purple-600 font-medium mt-1">
                    ₹{item.discountPrice.toLocaleString()}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <FaMinus className="w-4 h-4 text-gray-500" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <FaPlus className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="text-2xl font-bold text-purple-600">
              ₹{calculateTotal().toLocaleString()}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart 