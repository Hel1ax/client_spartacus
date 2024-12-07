const BookingData = ({ role, bookings }) => {
    return (
      role && (
        <div className="dashboard bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Ваши бронирования</h2>
          <ul className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="border border-gray-300 bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="font-bold text-lg mb-2 text-blue-600">
                    Место: {booking?.venue?.name || "Не указано"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Начало:</span>{" "}
                    {new Date(booking.startTime).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Окончание:</span>{" "}
                    {new Date(booking.endTime).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Общая цена:</span> ${booking.totalPrice}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-center">У вас пока нет бронирований.</p>
            )}
          </ul>
        </div>
      )
    );
  };
  
  export default BookingData;
  