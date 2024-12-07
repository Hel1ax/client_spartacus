import React from 'react';
import Modal from 'react-modal';

const VenueModal = ({
  isOpen,
  onClose,
  venueForm,
  onChange,
  onSubmit,
  isEditing,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Venue Modal"
    className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      {isEditing ? 'Редактировать площадку' : 'Создать площадку'}
    </h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <label className="block text-gray-600">
        Название:
        <input
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          type="text"
          value={venueForm.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
        />
      </label>
      <label className="block text-gray-600">
        Описание:
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          value={venueForm.description}
          onChange={(e) => onChange('description', e.target.value)}
          required
        />
      </label>
      <label className="block text-gray-600">
        Локация:
        <input
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          type="text"
          value={venueForm.location}
          onChange={(e) => onChange('location', e.target.value)}
          required
        />
      </label>
      <label className="block text-gray-600">
        Вместимость:
        <input
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          type="number"
          value={venueForm.capacity}
          onChange={(e) => onChange('capacity', e.target.value)}
          required
        />
      </label>
      <label className="block text-gray-600">
        Тип:
        <input
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          type="text"
          value={venueForm.type}
          onChange={(e) => onChange('type', e.target.value)}
          required
        />
      </label>
      <label className="block text-gray-600">
        Цена за час:
        <input
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          type="number"
          value={venueForm.pricePerHour}
          onChange={(e) => onChange('pricePerHour', e.target.value)}
          required
        />
      </label>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Сохранить изменения' : 'Создать площадку'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Закрыть
        </button>
      </div>
    </form>
  </Modal>
);

export default VenueModal;
