import React from 'react';
import { useNavigate } from 'react-router-dom'; // Используем React Router для редиректа

const Header = ({ user }) => {
  const navigate = useNavigate(); // Хук для навигации

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-lg font-semibold">Добро пожаловать, {user.name || 'Пользователь'}!</p>
              <p className="text-sm text-gray-200">Email: {user.email}</p>
            </div>
          ) : (
            <p className="text-lg font-semibold">Добро пожаловать, Гость!</p>
          )}
        </div>
        <div className="space-x-4">
          {user ? (
            <button
              onClick={onLogout}
              className="bg-white text-blue-500 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
            >
              Выйти
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-blue-500 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
              >
                Вход
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
