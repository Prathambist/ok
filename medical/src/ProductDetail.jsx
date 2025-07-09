import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const productData = [
  { name: 'Apple', imageKey: 'apple', type: 'fruit', price: 120 },
  { name: 'Banana', imageKey: 'banana', type: 'fruit', price: 90 },
  { name: 'Orange', imageKey: 'orange', type: 'fruit', price: 100 },
  { name: 'Strawberry', imageKey: 'strawberry', type: 'fruit', price: 150 },
  { name: 'Mango', imageKey: 'mango', type: 'fruit', price: 130 },
  { name: 'Pineapple', imageKey: 'pineapple', type: 'fruit', price: 160 },
  { name: 'Grapes', imageKey: 'grapes', type: 'fruit', price: 110 },
  { name: 'Watermelon', imageKey: 'watermelon', type: 'fruit', price: 140 },
  { name: 'Carrot', imageKey: 'carrot', type: 'vegetable', price: 60 },
  { name: 'Broccoli', imageKey: 'broccoli', type: 'vegetable', price: 80 },
  { name: 'Tomato', imageKey: 'tomato', type: 'vegetable', price: 55 },
  { name: 'Cucumber', imageKey: 'cucumber', type: 'vegetable', price: 50 },
  { name: 'Bell Pepper', imageKey: 'bellpepper', type: 'vegetable', price: 85 },
  { name: 'Spinach', imageKey: 'spinach', type: 'vegetable', price: 45 },
  { name: 'Potato', imageKey: 'potato', type: 'vegetable', price: 40 },
  { name: 'Onion', imageKey: 'onion', type: 'vegetable', price: 55 },
  { name: 'Almonds', imageKey: 'almonds', type: 'dryfruit', price: 300 },
        { name: 'Cashews', imageKey: 'cashews', type: 'dryfruit', price: 350 },
        { name: 'Raisins', imageKey: 'raisins', type: 'dryfruit', price: 200 },
        { name: 'Walnuts', imageKey: 'walnuts', type: 'dryfruit', price: 400 },
        { name: 'Pistachios', imageKey: 'pistachios', type: 'dryfruit', price: 380 },
        { name: 'Dates', imageKey: 'dates', type: 'dryfruit', price: 220 },
        { name: 'Figs', imageKey: 'figs', type: 'dryfruit', price: 260 },
        { name: 'Milk', imageKey: 'milk', type: 'dairy', price: 90 },
        { name: 'Cheese', imageKey: 'cheese', type: 'dairy', price: 250 },
        { name: 'Yogurt', imageKey: 'yogurt', type: 'dairy', price: 110 },
        { name: 'Butter', imageKey: 'butter', type: 'dairy', price: 180 },
        { name: 'Paneer', imageKey: 'paneer', type: 'dairy', price: 220 }

];

function ProductDetail() {
  const { name } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = productData.find(p => p.name.toLowerCase() === name.toLowerCase());
    setProduct(found);
  }, [name]);

  if (!product) return <div className="text-white p-6">Product not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <img
          src={`/src/assets/${product.imageKey}.jpg`}
          alt={product.name}
          className="w-64 h-64 object-contain mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg text-gray-600 mb-4">NPR {product.price}</p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
        <p className="text-xl font-semibold mb-4">Total: NPR {product.price * quantity}</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
