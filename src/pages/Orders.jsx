import React, { useState, useEffect } from 'react';
import { mockOrders } from '../assets/mockOrders'; //  Import the mock data

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null); //  For showing order details

  useEffect(() => {
    //  Simulate fetching data (e.g., a delay)
    const simulateFetch = () => {
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 500); //  0.5 second delay
    };

    simulateFetch();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  if (loading) {
    return <div className="text-center py-8">Loading Order History...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-8">Error: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-gray-500 py-8">No order history found.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-700 shadow-md rounded-xl">
      <h2 className="text-2xl text-slate-100 text-font-semibold mb-6">Order History (not connected to backend)</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.orderId}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderDetails(order.orderId)}>
                  <td className="py-2 px-4 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b rounded-lg bg-red-600 hover:bg-red-700">
                    {expandedOrderId === order.orderId ? 'Hide Details' : 'View Details'}
                  </td>
                </tr>
                {/* Optional: Order Details Row */}
                {expandedOrderId === order.orderId && (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <h4 className="font-semibold">Order Details</h4>
                      <ul className="list-disc list-inside">
                        {order.items.map(item => (
                          <li key={item.productId}>
                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                      <p>Shipping To: {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                      {/* Add more details as needed */}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional: Pagination (if you want to implement it with mock data) */}
    </div>
  );
};

export default Orders;