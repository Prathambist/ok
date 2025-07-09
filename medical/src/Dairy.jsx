// Dairy.jsx
import React, { useState, useEffect } from 'react';
import ProduceGrid from './ProduceGrid'; // Assuming ProduceGrid is exported or copy the code here

function Dairy() {
  const [dairyItems, setDairyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dairy data (you can replace this with actual API calls)
    const data = [
      { name: 'Milk', imageKey: 'milk', type: 'dairy', price: 90 },
      { name: 'Cheese', imageKey: 'cheese', type: 'dairy', price: 250 },
      { name: 'Yogurt', imageKey: 'yogurt', type: 'dairy', price: 110 },
      { name: 'Butter', imageKey: 'butter', type: 'dairy', price: 180 },
      { name: 'Paneer', imageKey: 'paneer', type: 'dairy', price: 220 },
      // add more if you want
    ];

    setTimeout(() => {
      setDairyItems(data);
      setLoading(false);
    }, 700);
  }, []);

  return (
    <div className="bg-blue-600 min-h-screen p-8">
      <h2 className="text-white text-4xl font-bold mb-6 text-center">🥛 Dairy Products</h2>
      {loading ? (
        <div className="text-white text-xl text-center">Loading dairy products...</div>
      ) : (
        <ProduceGrid items={dairyItems} type="dairy" limit={0} showViewMore={false} />
      )}
    </div>
  );
}

export default Dairy;
