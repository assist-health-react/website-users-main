import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaStar, FaStarHalf, FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import ProductCard from "./ProductCard"
import ProductDetails from "./ProductDetails"
import Cart from "./Cart"
import PaymentModal from "./PaymentModal"
import { getAllProducts } from "@/services/productService"
import { toast } from 'react-toastify'

const Ecommerce = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      // Transform API data to match our UI structure
      const transformedProducts = data.map(product => ({
        id: product._id,
        name: product.name,
        image: product.images[0], // Using first image from array
        description: product.description,
        price: product.mrp,
        discountPrice: product.sellingPrice,
        rating: 4.5, // Default rating since not in API
        reviews: 100, // Default reviews since not in API
        category: product.category,
        stock: product.stock
      }))
      setProducts(transformedProducts)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const cartTotal = cart.reduce((total, item) => total + (item.discountPrice * item.quantity), 0)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />)
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400" />)
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-yellow-400" />)
    }

    return stars
  }

  return (
    <div className="flex flex-col space-y-6 relative">
      <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-[#38B6FF]/10 shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">E-commerce Store</h2>
            <p className="text-gray-600">Welcome to our medical supplies and products store.</p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#38B6FF] text-white p-3 rounded-full shadow-lg hover:bg-[#2090d1] transition-colors relative"
          >
            <FaShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                setSelectedProduct(product)
                setIsProductDetailsOpen(true)
              }}
              renderRatingStars={renderRatingStars}
            />
          ))
        )}
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-[#38B6FF] font-bold">₹{item.discountPrice.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          <FaMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          <FaPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="text-2xl font-bold text-[#38B6FF]">₹{cartTotal.toLocaleString()}</span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                setIsCartOpen(false)
                setIsPaymentModalOpen(true)
              }}
              className="w-full bg-[#38B6FF] text-white py-3 rounded-lg hover:bg-[#2090d1] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cartTotal={cartTotal}
      />

      {/* Product Details Modal */}
      <ProductDetails
        product={selectedProduct}
        isOpen={isProductDetailsOpen}
        onClose={() => {
          setIsProductDetailsOpen(false)
          setSelectedProduct(null)
        }}
        onAddToCart={addToCart}
        renderRatingStars={renderRatingStars}
      />
    </div>
  )
}

export default Ecommerce 