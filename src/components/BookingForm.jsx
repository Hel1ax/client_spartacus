import React from 'react';

const BookingForm = ({
  venues,
  selectedVenue,
  startDateTime,
  endDateTime,
  onChangeSelectedVenue,
  onChangeStartDateTime,
  onChangeEndDateTime,
  onCreateBooking,
}) => (
  <div className="booking-form bg-gray-50 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Создать бронирование</h2>

    <label htmlFor="venue" className="block mb-2 text-gray-700 font-medium">
      Выберите площадку:
    </label>
    <select
      name="venue"
      id="venue"
      className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      value={selectedVenue}
      onChange={(e) => onChangeSelectedVenue(e.target.value)}
    >
      <option value="" disabled>
        Выберите площадку
      </option>
      {venues.map((venue) => (
        <option key={venue.id} value={venue.id} className="text-gray-600">
          {venue.name}
        </option>
      ))}
    </select>

    <label htmlFor="startDateTime" className="block mb-2 text-gray-700 font-medium">
      Укажите дату и время начала:
    </label>
    <input
      type="datetime-local"
      id="startDateTime"
      className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      value={startDateTime}
      onChange={(e) => onChangeStartDateTime(e.target.value)}
    />

    <label htmlFor="endDateTime" className="block mb-2 text-gray-700 font-medium">
      Укажите дату и время окончания:
    </label>
    <input
      type="datetime-local"
      id="endDateTime"
      className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      value={endDateTime}
      onChange={(e) => onChangeEndDateTime(e.target.value)}
    />

    <button
      onClick={onCreateBooking}
      disabled={!selectedVenue || !startDateTime || !endDateTime}
      className={`w-full py-2 px-4 rounded font-bold text-white ${
        !selectedVenue || !startDateTime || !endDateTime
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      Забронировать
    </button>
  </div>
);

export default BookingForm;
