import React, { useState } from 'react';
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock, Trash2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Senior Care Package",
      description: "Monthly healthcare navigation service for seniors",
      price: 2999,
      quantity: 1
    },
    {
      id: 2,
      name: "Digital Health Records Management",
      description: "Annual subscription for digital health records",
      price: 1499,
      quantity: 1
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Cart
                </h2>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-4 text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-medium text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        className="text-red-500 hover:text-red-700 mt-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="pl-10"
                      />
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <div className="relative">
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="pl-10"
                        />
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <div className="relative">
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="pl-10"
                        />
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Name on Card</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18%)</span>
                    <span>₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-brand-blue text-white hover:bg-brand-blue/90"
                  size="lg"
                  onClick={() => navigate('/thank-you')}
                >
                  Complete Purchase
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  By completing this purchase, you agree to our{' '}
                  <button
                    className="text-brand-blue hover:underline"
                    onClick={() => navigate('/terms')}
                  >
                    Terms of Service
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout; 