import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from "../../axois-client";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, email } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post(`/reset-password/${token}/${email}`, {
        password,
        password_confirmation,
      });


      console.log('Réponse du serveur :', response); // Affichage de la réponse dans la console

      // Vérifier si la réponse du backend est définie
      if (response && response.data) {
        // Vérifier si la réponse contient un message de succès
        if (response.data.message) {
          alert(response.data.message);
          navigate('/login'); // Rediriger vers la page de connexion en cas de succès
        } else {
          // Si la réponse ne contient pas de message, afficher une erreur générique
          setErrors(["Une erreur inattendue s'est produite"]);
        }
      } else {
        // Si la réponse est vide ou n'est pas définie, afficher une erreur générique
        setErrors(["Une erreur inattendue s'est produite"]);
      }
    } catch (error) {
      // Afficher le message d'erreur dans la console
      console.error("Une erreur s'est produite :", error.message);
      setErrors(["Une erreur inattendue s'est produite"]);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmez le nouveau mot de passe :</label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>

        {/* Affichage des erreurs */}
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Bouton de soumission */}
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Mettre à jour le mot de passe'}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
