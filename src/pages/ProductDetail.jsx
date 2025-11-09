import React, { useState } from 'react';
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // This would typically come from an API or database
  const products = {
    'health-monitor': {
      name: "Digital Health Monitor",
      price: 4999,
      rating: 4.8,
      reviews: 128,
      description: "Advanced digital health monitor for tracking vital signs and health metrics.",
      features: [
        "Real-time vital sign monitoring",
        "Wireless connectivity",
        "Mobile app integration",
        "Long battery life",
        "Easy-to-read display"
      ],
      specifications: {
        "Dimensions": "12 x 8 x 3 cm",
        "Weight": "250g",
        "Battery": "Rechargeable Li-ion",
        "Display": "4.5-inch LCD",
        "Connectivity": "Bluetooth 5.0"
      },
      images: [
        "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/product-1-1.jpg",
        "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/product-1-2.jpg",
        "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/product-1-3.jpg"
      ],
      stock: 50
    }
    // Add more products as needed
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/shop')}>
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const updateQuantity = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                ₹{product.price.toLocaleString()}
              </div>

              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-brand-blue rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-600">{key}:</span>
                      <span className="text-gray-900 ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-8">
                <div className="flex items-center border rounded-lg mr-4">
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() => updateQuantity(-1)}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() => updateQuantity(1)}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.stock} units available
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-blue text-white hover:bg-brand-blue/90 flex-1"
                  onClick={() => navigate('/checkout')}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 