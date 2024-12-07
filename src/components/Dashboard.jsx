import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import Header from './Header';
import VenueList from './VenueList';
import BookingForm from './BookingForm';
import VenueModal from './VenueModal';
import BookingModal from './BookingModal'; // Новый компонент
import BookingData from './BookingData';

const Dashboard = () => {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isVenueModalOpen, setVenueModalOpen] = useState(false);
  const [venueForm, setVenueForm] = useState({
    name: '',
    description: '',
    location: '',
    capacity: '',
    type: '',
    pricePerHour: '',
  });
  const [editVenue, setEditVenue] = useState(null);

  const [isBookingModalOpen, setBookingModalOpen] = useState(false); // Управление модальным окном бронирования
  const [editBooking, setEditBooking] = useState(null); // Для редактирования бронирования

  const fetchDashboardData = async () => {
    try {
      const venuesResponse = await axios.get('venues');
      setVenues(venuesResponse.data);

      const currentUser = await axios.get('users/profile', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setUser(currentUser.data);
      setRole(currentUser.data?.role);

      if (currentUser.data?.role) {
        const bookingsResponse = await axios.get('bookings');
        setBookings(bookingsResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const createBooking = async () => {
    try {
      const bookingData = {
        venueId: selectedVenue,
        startTime: startDateTime,
        endTime: endDateTime,
        userId: user?.id,
      };

      const response = await axios.post('bookings', bookingData);
      setBookings([...bookings, response.data]);

      setSelectedVenue(null);
      setStartDateTime('');
      setEndDateTime('');

      alert('Бронирование успешно создано!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Ошибка при создании бронирования');
    }
  };

  const handleEditBooking = (booking) => {
    setEditBooking(booking);
    setBookingModalOpen(true);
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`bookings/${bookingId}`);
      setBookings(bookings.filter((b) => b.id !== bookingId));
      alert('Бронирование успешно удалено!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Ошибка при удалении бронирования');
    }
  };

  const handleCreateOrEditVenue = async () => {
    try {
      if (editVenue) {
        // Редактирование существующей площадки
        await axios.put(`venues/${editVenue.id}`, venueForm);
        setVenues((prev) =>
          prev.map((venue) =>
            venue.id === editVenue.id ? { ...venue, ...venueForm } : venue
          )
        );
        alert('Площадка успешно обновлена!');
      } else {
        // Создание новой площадки
        const response = await axios.post('venues', venueForm);
        setVenues([...venues, response.data]);
        alert('Площадка успешно создана!');
      }
  
      // Сброс состояния
      setVenueModalOpen(false);
      setEditVenue(null);
      setVenueForm({
        name: '',
        description: '',
        location: '',
        capacity: '',
        type: '',
        pricePerHour: '',
      });
    } catch (error) {
      console.error('Error saving venue:', error);
      alert('Ошибка при сохранении площадки');
    }
  };

  const handleSaveBooking = async (bookingData) => {
    try {
      if (editBooking) {
        // Редактирование бронирования
        await axios.put(`bookings/${editBooking.id}`, bookingData);
        setBookings((prev) =>
          prev.map((b) => (b.id === editBooking.id ? { ...b, ...bookingData } : b))
        );
        alert('Бронирование успешно обновлено!');
      } else {
        // Создание нового бронирования
        const response = await axios.post('bookings', bookingData);
        setBookings([...bookings, response.data]);
        alert('Бронирование успешно создано!');
      }

      setBookingModalOpen(false);
      setEditBooking(null);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Ошибка при сохранении бронирования');
    }
  };

  

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header user={user} role={role}  />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Панель управления бронированием</h1>

      <VenueList
        venues={venues}
        bookings={bookings}
        role={role}
        onEditVenue={(venue) => {
          setVenueForm({
            name: venue.name,
            description: venue.description,
            location: venue.location,
            capacity: venue.capacity,
            type: venue.type,
            pricePerHour: venue.pricePerHour,
          });
          setEditVenue(venue);
          setVenueModalOpen(true);
        }}
        onEditBooking={handleEditBooking}
        onDeleteBooking={handleDeleteBooking}
      />

      {role && (
        <BookingForm
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          startDateTime={startDateTime}
          setStartDateTime={setStartDateTime}
          endDateTime={endDateTime}
          setEndDateTime={setEndDateTime}
          onCreateBooking={createBooking}
        />
      )}

      <BookingData role={role} bookings={bookings} />

      {role === 'admin' && (
        <button
          onClick={() => setVenueModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-600 transition duration-200"
        >
          Создать площадку
        </button>
      )}

      <VenueModal
        isOpen={isVenueModalOpen}
        venueForm={venueForm}
        setVenueForm={setVenueForm}
        onClose={() => {
          setVenueModalOpen(false);
          setEditVenue(null);
        }}
        onSubmit={handleCreateOrEditVenue}
        editVenue={editVenue}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        editBooking={editBooking}
        venues={venues}
        onClose={() => {
          setBookingModalOpen(false);
          setEditBooking(null);
        }}
        onSave={handleSaveBooking}
      />
    </div>
  );
};

export default Dashboard;
