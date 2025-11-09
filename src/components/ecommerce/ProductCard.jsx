const ProductCard = ({ product, onClick, renderRatingStars }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {renderRatingStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#38B6FF]">₹{product.discountPrice.toLocaleString()}</span>
          <span className="text-sm text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 