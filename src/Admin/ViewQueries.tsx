import React, { useState } from 'react';

const ViewQueries = () => {
  const [filter, setFilter] = useState(''); // Filter state

  // Dummy data for queries
  const queries = [
    { id: 1, owner: 'John Doe', customer: 'Jane Smith', query: 'When will my order arrive?', time: '10:30 AM' },
    { id: 2, owner: 'Alice Brown', customer: 'Michael Lee', query: 'How can I cancel my order?', time: '11:15 AM' },
    { id: 3, owner: 'David Green', customer: 'Sophia White', query: 'I received a damaged product.', time: '12:45 PM' },
    { id: 4, owner: 'Paul Adams', customer: 'Chris Evans', query: 'Do you have this item in stock?', time: '01:30 PM' },
  ];

  // Handle filter input
  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  // Filtered data based on filter input
  const filteredQueries = queries.filter(
    (q) =>
      q.owner.toLowerCase().includes(filter) ||
      q.customer.toLowerCase().includes(filter) ||
      q.query.toLowerCase().includes(filter)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Queries</h1>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by owner or customer"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left border border-gray-300">Owner Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Customer Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Query</th>
              <th className="px-4 py-2 text-left border border-gray-300">Time</th>
              <th className="px-4 py-2 text-left border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query) => (
                <tr key={query.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{query.owner}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.customer}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.query}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.time}</td>
                  <td className="px-4 py-2 border border-gray-300 space-x-4">
                    <button className="text-white border bg-blue-600 p-1 rounded-md">Approve</button>
                    <button className="text-white border bg-red-600 p-1 rounded-md">Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQueries;
