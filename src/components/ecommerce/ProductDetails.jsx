import React from 'react'
import { FaTimes, FaShoppingCart } from 'react-icons/fa'

const ProductDetails = ({ product, isOpen, onClose, onAddToCart, renderRatingStars }) => {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Product content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </div>
            </div>

            {/* Product information */}
            <div className="space-y-6">
              {/* Price section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-purple-600">₹{product.discountPrice.toLocaleString()}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="text-green-600 font-medium">
                  You save: ₹{(product.price - product.discountPrice).toLocaleString()}
                </div>
              </div>

              {/* Rating section */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="text-gray-600">
                  {product.rating} out of 5 ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>High accuracy measurements</li>
                  <li>Easy to use interface</li>
                  <li>Compact and portable design</li>
                  <li>Long battery life</li>
                  <li>Digital display with backlight</li>
                </ul>
              </div>

              {/* Add to cart button */}
              <button
                onClick={() => {
                  onAddToCart(product)
                  onClose()
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <FaShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 