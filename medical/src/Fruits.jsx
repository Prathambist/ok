import React, { useEffect, useState } from 'react';
import ProduceGrid from './ProduceGrid';

function Fruits() {
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    const data = [
      { name: 'Apple', imageKey: 'apple', type: 'fruit', price: 120 },
      { name: 'Banana', imageKey: 'banana', type: 'fruit', price: 90 },
      { name: 'Orange', imageKey: 'orange', type: 'fruit', price: 100 },
      { name: 'Strawberry', imageKey: 'strawberry', type: 'fruit', price: 150 },
      { name: 'Mango', imageKey: 'mango', type: 'fruit', price: 130 },
      { name: 'Pineapple', imageKey: 'pineapple', type: 'fruit', price: 160 },
      { name: 'Grapes', imageKey: 'grapes', type: 'fruit', price: 110 },
      { name: 'Watermelon', imageKey: 'watermelon', type: 'fruit', price: 140 }
    ];
    setProduce(data);
  }, []);

  return (
    <div className="bg-purple-700 min-h-screen p-6">
      <h2 className="text-white text-3xl font-bold text-center mb-8">🍓 All Fruits</h2>
      <ProduceGrid items={produce} type="fruit" />
    </div>
  );
}

export default Fruits;
