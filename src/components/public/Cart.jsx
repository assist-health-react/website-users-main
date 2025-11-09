import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Cart = ({ items, onRemoveItem }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">₹{calculateTotal()}</span>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
              <Button
                className="w-1/2"
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default Cart; 