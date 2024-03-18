import React, { useState, useEffect } from 'react';
import axiosClient from '../../axois-client';
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCog, faSignOutAlt,faShoppingBag,faHeart,faEnvelope } from '@fortawesome/free-solid-svg-icons';

function DashboardUser() {
  const { notification } = useStateContext();
  const [showProfile, setShowProfile] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [ShowSettings, setShowSettings] = useState(false);

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const handleLogout = () => {
    // Ajoutez la logique de déconnexion ici
  };

  const navigate = useNavigate();
  const { token } = useStateContext();

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    telephone: '',
    sexe: '',
    nationalite: '',
    photo: null,
    adresse: '',
    ville: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modificationSuccess, setModificationSuccess] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axiosClient.get(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
      })
      .catch(() => {
        setLoading(false);
      });
    }
  }, [token]);

  const updatePhoto = () => {
    const formData = new FormData();
    formData.append('photo', photo);

    axiosClient.post(`/users/${user.id}/update-photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => {
      setModificationSuccess(true);
      setTimeout(() => {
        setModificationSuccess(false);
        setShowProfile(true);
        setShowSettings(false);
      }, 2000);
    })
    .catch((err) => {
      console.error('Error updating photo:', err.response.data.error);
      // Affichez un message d'erreur à l'utilisateur ici...
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const updatedUser = { ...user };

    if (user.id) {
      axiosClient.put(`/users/${user.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        if (photo) {
          updatePhoto();
        } else {
          setModificationSuccess(true);
          setTimeout(() => {
            setModificationSuccess(false);
            /* navigate('/DashboardUser'); */
            setShowProfile(true);
            setShowSettings(false);
          }, 2000);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    } else {
      // ... code pour le cas où l'utilisateur est nouveau
    }
  };


  const handleChange = (field, value) => {
    if (field === 'photo') {
      setPhoto(value);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);
    handleChange('photo', file);
  };
  return (
    <div>
      <div id="defaultLayout">
      <aside className="bg-gray-800 text-white p-4 space-y-4 me-6">
  <div className="flex flex-col items-center space-y-2">
    <img
      className="w-20 h-20 border-4 border-white rounded-full"
      src={`http://localhost:8000/${user.photo}`}
      alt="User Image"
      loading="lazy"
    />

    <div className="flex items-center space-x-2">
      {user.id && (
        <p className="text-lg font-semibold">
          {user.name}
        </p>
      )}
    </div>
  </div>

  <button
    onClick={() => { setShowProfile(true); setShowChangePassword(false); setShowSettings(false); setShowOrders(false); setShowWhishlist(false); setShowMessages(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faUser} className="text-lg" />
    Profile
  </button>

  <button
    onClick={() => { setShowProfile(false); setShowChangePassword(true); setShowSettings(false); setShowOrders(false); setShowWhishlist(false); setShowMessages(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faLock} className="text-lg" />
    Changer le mot de passe
  </button>

  <button
    onClick={() => { setShowSettings(true); setShowProfile(false); setShowChangePassword(false); setShowOrders(false); setShowWhishlist(false); setShowMessages(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faCog} className="text-lg" />
    Settings
  </button>

  <button
    onClick={() => { setShowOrders(true); setShowProfile(false); setShowChangePassword(false); setShowSettings(false); setShowWhishlist(false); setShowMessages(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faShoppingBag} className="text-lg" />
    Order & Reordering
  </button>

  <button
    onClick={() => { setShowWhishlist(true); setShowProfile(false); setShowChangePassword(false); setShowSettings(false); setShowOrders(false); setShowMessages(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faHeart} className="text-lg" />
    Whishlist
  </button>

  <button
    onClick={() => { setShowMessages(true); setShowProfile(false); setShowChangePassword(false); setShowSettings(false); setShowOrders(false); setShowWhishlist(false); }}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
    Messages
  </button>

  <button
    onClick={handleLogout}
    className="flex items-center justify-start space-x-2 text-base py-2 px-4 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
  >
    <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
    Déconnexion
  </button>
</aside>



        <div className="content">
          <header></header>
          <main>
            <div className="h-full">
              {notification && (
                <div className="notification">{notification}</div>
              )}

              {showProfile && (
                <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center space-y-4">
                  {/* Contenu du profil */}
                  <img
                    className="w-40 border-4 border-white rounded-full"
                    src={`http://localhost:8000/${user.photo}`}
                    alt="User Image"
                    loading="lazy"
                  />

                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      {user.id && (
                        <p className="text-2xl">
                          {user.name}
                          <sup className="text-sm text-gray-500">{user.role}</sup>
                        </p>
                      )}
                    </div>

                    <p className="text-gray-700">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      {user.ville}, {user.nationalite}
                    </p>

                    <ul className="mt-2 text-gray-700">
                      <li className="flex border-b py-2">
                        <span className="font-bold">Nom complet :</span>
                        <span className="text-gray-700">{user.name}</span>
                      </li>
                      <li className="flex border-b py-2">
                        <span className="font-bold">Téléphone :</span>
                        <span className="text-gray-700">{user.telephone}</span>
                      </li>
                      <li className="flex border-b py-2">
                        <span className="font-bold">Email :</span>
                        <span className="text-gray-700">{user.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {showChangePassword && (
                <div>
                    <div className="h-full p-8">
                      <div className="bg-white rounded-lg shadow-xl pb-8">
                      {loading && (
                          <div   className="flex items-center justify-center h-screen" role="status">
                          <svg aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span class="sr-only">Loading...</span>
                      </div>)
                        }
                      {!loading && (
                        <form onSubmit={onSubmit} className="p-6">


                          <label htmlFor="password">Password:</label>
                          <input type="password"
                          onChange={ev => setUser({...user, password: ev.target.value})}
                          placeholder="Password"
                          />
                          <label htmlFor="password">Confirmation Password:</label>
                          <input type="password"
                          onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                          placeholder="Password Confirmation"/>




                          {modificationSuccess && (
                            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
                              Modification enregistrée avec succès!
                            </div>
                          )}

                          <button type="submit"  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                            Save
                          </button>
                        </form>
                        )}
                      </div>
                  </div>                </div>
              )}

              {ShowSettings && (
                <div>
                  <div className="h-full p-8">
                      <div className="bg-white rounded-lg shadow-xl pb-8">
                      {loading && (
                          <div   className="flex items-center justify-center h-screen" role="status">
                          <svg aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span class="sr-only">Loading...</span>
                      </div>)
                        }
                      {!loading && (
                        <form onSubmit={onSubmit} className="p-6">

                        <label htmlFor="photo">Photo de profil:</label>
                        <input
                          type="file"
                          id="photo"
                          accept="image/*"
                          onChange={handleImageChange}
                        />

                          <label htmlFor="name">Name:</label>
                          <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                          />

                          <label htmlFor="email">Email:</label>
                          <input
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                          />
                          <label htmlFor="telephone">Phone:</label>
                          <input
                            type="text"
                            id="telephone"
                            value={user.telephone}
                            onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                          />
                          <label htmlFor="sexe">Gender:</label>
                          <input
                            type="text"
                            id="sexe"
                            value={user.sexe}
                            onChange={(e) => setUser({ ...user, sexe: e.target.value })}
                          />
                          <label htmlFor="ville">Ville:</label>
                          <input
                            type="text"
                            id="ville"
                            value={user.ville}
                            onChange={(e) => setUser({ ...user, ville: e.target.value })}
                          />
                          <label htmlFor="nationalite">Nationalite:</label>
                          <input
                            type="text"
                            id="nationalite"
                            value={user.nationalite}
                            onChange={(e) => setUser({ ...user, nationalite: e.target.value })}
                          />
                          <label htmlFor="adresse">Adresse:</label>
                          <input
                            type="text"
                            id="adresse"
                            value={user.adresse}
                            onChange={(e) => setUser({ ...user, adresse: e.target.value })}
                          />
                          <label htmlFor="password">Password:</label>
                          <input type="password"
                          onChange={ev => setUser({...user, password: ev.target.value})}
                          placeholder="Password"
                          />
                          <label htmlFor="password">Confirmation Password:</label>
                          <input type="password"
                          onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                          placeholder="Password Confirmation"/>




                          {modificationSuccess && (
                            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
                              Modification enregistrée avec succès!
                            </div>
                          )}

                          <button type="submit"  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                            Save
                          </button>
                        </form>
                        )}
                      </div>
                  </div>
                </div>
              )}

              {/* Ajoutez d'autres sections selon les besoins */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
