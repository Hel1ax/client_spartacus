import React from 'react';

const VenueList = ({ venues, bookings, role, onEditVenue }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Доступные площадки</h2>
    <ul className="space-y-6">
      {venues.map((venue) => (
        <li key={venue.id} className="border border-gray-300 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">{venue.name}</h3>
          <p className="mb-4 text-gray-600">{venue.description}</p>
          <p className="mb-2 text-gray-600">
            <span className="font-semibold">Локация:</span> {venue.location} | 
            <span className="font-semibold"> Вместимость:</span> {venue.capacity} | 
            <span className="font-semibold"> Тип:</span> {venue.type} | 
            <span className="font-semibold"> Цена:</span> {venue.pricePerHour}₽/час
          </p>
          <p className="mb-2 font-medium text-gray-700">График бронирования:</p>
          {bookings.filter((b) => b.venueId === venue.id).length > 0 ? (
            <ul className="list-disc pl-6">
              {bookings
                .filter((b) => b.venueId === venue.id)
                .map((b) => (
                  <li key={b.id} className="mb-1 text-gray-600">
                    {new Date(b.startTime).toLocaleString()} - {new Date(b.endTime).toLocaleString()}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">Нет запланированных бронирований.</p>
          )}
          {role === 'admin' && (
            <button
              onClick={() => onEditVenue(venue)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Редактировать площадку
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default VenueList;
