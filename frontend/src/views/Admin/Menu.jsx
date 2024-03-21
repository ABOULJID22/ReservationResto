import {useEffect, useState} from "react";
import axiosClient from "../../axois-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [totalMenus, setTotalMenus] = useState(0);

  useEffect(() => {
    getMenus();
  }, []);

  const onDeleteClick = (menu) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce menu ?")) {
      return;
    }
    axiosClient
      .delete(`/menus/${menu.id}`)
      .then(() => {
        setNotification("Le menu a été supprimé avec succès");
        getMenus();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du menu :", error);
      });
  };

  const getMenus = () => {
    setLoading(true);
    axiosClient
      .get("/menus")
      .then(({ data }) => {
        setLoading(false);
        setMenus(data.data);
        setTotalMenus(data.data.length);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erreur lors de la récupération des menus :", error);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bienvenue, Admin !</h1>
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          to="/menus/new"
        >
          Ajouter
        </Link>
      </div>
      <p className="mt-4">Total des menus : {totalMenus}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          menus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-40 object-cover"
                src={menu.img}
                alt={menu.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{menu.title}</h2>
                <p className="text-gray-700 mb-2">Type : {menu.type}</p>
                <p className="text-gray-700 mb-2">Prix : {menu.price}</p>
                <p className="text-gray-700 mb-4">
                  Nouveau prix : {menu.new_price}
                </p>
                {/* Afficher la catégorie */}
                <p className="text-gray-700 mb-2">Catégorie : {menu.category.title}</p>
                {/* Ajoutez d'autres détails du menu ici */}
                <div className="flex justify-between">
                  <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    to={`/menus/${menu.id}`}
                  >
                    Éditer
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => onDeleteClick(menu)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
