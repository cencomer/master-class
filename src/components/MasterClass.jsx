import React, { useEffect, useState } from 'react';
import { FaGraduationCap, FaChevronRight, FaShareAlt, FaYoutube } from 'react-icons/fa';

const MasterClass = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("/data/listado.json")
      .then(response => response.json())
      .then(data => setSessions(data.masterClasses || [])) // Ajusta para acceder a `masterClasses`
      .catch(error => console.error("Error loading sessions:", error));
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Master Class - Conectando Voces',
          text: 'Accede a contenido educativo exclusivo de Conectando Voces.',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error al compartir', error);
      }
    } else {
      alert('La función de compartir no está soportada en este navegador.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
            <span className="text-4xl text-white">MV</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Master Class</h1>
          <p className="text-xl text-gray-300">Conectando Voces</p>
        </div>

        {/* Sessions Links */}
        <div className="space-y-2">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <a
                key={index} // Usa el índice como clave temporal si no hay un id único
                href={session.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaYoutube className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{session.nombre}</h3>
                    <p className="text-gray-400 text-sm">Ciudad: {session.ciudad} | Fecha: {session.fecha}</p>
                  </div>
                  <FaChevronRight className="text-gray-400 text-xl" />
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-400 text-center">No hay sesiones disponibles para mostrar.</p>
          )}
        </div>

        {/* Share Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleShare}
            className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl hover:bg-opacity-20 transition-all duration-300 text-white flex items-center justify-center space-x-2 w-full"
          >
            <FaShareAlt className="text-white text-lg" />
            <span>Compartir este sitio</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-6">
          <a
            href="https://www.conectandovoces.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl hover:bg-opacity-20 transition-all duration-300 max-w-md mx-auto"
          >
            <div className="flex items-center space-x-4 justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Plataforma de Clases</h3>
                <p className="text-gray-400 text-sm">Accede a todo el contenido</p>
              </div>
              <FaChevronRight className="text-gray-400 text-xl" />
            </div>
          </a>

          <div className="max-w-2xl mx-auto px-4 text-justify">
            <div className="p-4 bg-white bg-opacity-5 rounded-lg text-sm text-gray-400 space-y-2">
              <p>
                Todo el material audiovisual y contenido educativo son propiedad del{' '}
                <span className="text-white">Gobierno de Colombia</span>,{' '}
                <span className="text-white">Ministerio de las TIC</span> y la{' '}
                <span className="text-white">Universidad de Antioquia</span>.
              </p>
              <p>
                Este sitio web ha sido desarrollado usando React como una herramienta de ayuda y acceso al contenido educativo.
              </p>
            </div>
          </div>

          <div className="text-gray-400">
            <p>© 2024 Master Class - Conectando Voces</p>
            <p className="text-sm mt-2">
              Desarrollado por{' '}
              <a
                href="https://cencomer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Luis Cabezas / Cencomer.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MasterClass;
