import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline'; // Impor ikon XCircleIcon

function DeleteConfirmationPopup() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleDeleteClick = () => {
    setPopupVisible(true);
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleConfirm = () => {
    // Lakukan aksi delete di sini
    console.log('Item deleted');
    setPopupVisible(false);
  };

  return (
    <div className="relative p-6">
      {/* Button Delete */}
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        onClick={handleDeleteClick}
      >
        Delete
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Confirmation</h2>
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleCancel}
              >
                <XCircleIcon className="w-6 h-6" /> {/* Gunakan XCircleIcon */}
              </button>
            </div>

            {/* Message */}
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the Brand?
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteConfirmationPopup;
