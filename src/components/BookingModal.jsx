import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const BookingModal = ({ isOpen, editBooking, venues, onClose, onSave }) => {
  const [venueId, setVenueId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (editBooking) {
      setVenueId(editBooking.venueId || '');
      setStartTime(editBooking.startTime || '');
      setEndTime(editBooking.endTime || '');
    } else {
      setVenueId('');
      setStartTime('');
      setEndTime('');
    }
  }, [editBooking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ venueId, startTime, endTime });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={editBooking ? 'Редактировать бронирование' : 'Создать бронирование'}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editBooking ? 'Редактировать бронирование' : 'Создать бронирование'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="venueId" className="block text-gray-600 font-medium mb-2">
            Площадка:
          </label>
          <select
            id="venueId"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Выберите площадку
            </option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startTime" className="block text-gray-600 font-medium mb-2">
            Время начала:
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-gray-600 font-medium mb-2">
            Время окончания:
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editBooking ? 'Сохранить изменения' : 'Создать бронирование'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;
