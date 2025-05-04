import React, { useState } from 'react';

const MyProfile = () => {
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown USA',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [editedEmail, setEditedEmail] = useState(currentUser.email);
  const [editedPhone, setEditedPhone] = useState(currentUser.phone);
  const [editedAddress, setEditedAddress] = useState(currentUser.address);

  const handleSaveClick = () => {

    // 1. Make an API call to update the user data
    // 2. Handle success/error responses
    // 3. Update the currentUser object (or application state)

    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="profile-info">
        {isEditing ? (
          <div className="edit-form space-y-4">
            <label className="block">
              <span className="text-gray-700 font-bold">Name:</span>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-bold">Email:</span>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-bold">Phone:</span>
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-bold">Address:</span>
              <input
                type="text"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <button
              onClick={handleSaveClick}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p>
              <span className="font-bold">Name:</span> {currentUser.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {currentUser.email}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {currentUser.phone}
            </p>
            <p>
              <span className="font-bold">Address:</span> {currentUser.address}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-red-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Optional: Order History */}
      {/* <div className="order-history">
        <h3 className="text-xl font-semibold mt-8 mb-4">Order History</h3>
        {/* Display order history here */}
      {/* </div> */}
    </div>
  );
};

export default MyProfile;