import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axois-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function MenuForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [menu, setMenu] = useState({
    id: null,
    title: '',
    type: '',
    price: '',
    new_price: '',
    img: '',
    offer: '',
    views: '',
    is_popular: '',
    is_available_delivery: '',
    quantity_served: '',
    with_sauce: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/categories`)
      .then(({ data }) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    if (id) {
      setLoading(true);
      axiosClient.get(`/menus/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setMenu(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const formData = {
      title: menu.title,
      type: menu.type,
      price: menu.price,
      new_price: menu.new_price,
      views: menu.views,
      offer: menu.offer,
      is_popular: menu.is_popular,
      quantity_served: menu.quantity_served,
      is_available_delivery: menu.is_available_delivery,
      with_sauce: menu.with_sauce,
      category_id: menu.category_id
    };

    if (id) {
      axiosClient.put(`/menus/${id}`, formData)
        .then(() => {
          setNotification('Le menu a été mis à jour avec succès.');
          navigate('/menus');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/menus', formData)
        .then(() => {
          setNotification('Le menu a été créé avec succès.');
          navigate('/menus');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {menu.id && <h1>Modifier le menu : {menu.title}</h1>}
      {!menu.id && <h1>Nouveau menu</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Chargement...
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={menu.title} onChange={ev => setMenu({ ...menu, title: ev.target.value })} placeholder="Titre" required />
            <input value={menu.type} onChange={ev => setMenu({ ...menu, type: ev.target.value })} placeholder="Type" required />
            <input value={menu.price} onChange={ev => setMenu({ ...menu, price: ev.target.value })} placeholder="Prix" required />
            <input value={menu.new_price} onChange={ev => setMenu({ ...menu, new_price: ev.target.value })} placeholder="Nouveau Prix" />
            <input value={menu.views} onChange={ev => setMenu({ ...menu, views: ev.target.value })} placeholder="Vues" />
            <input value={menu.offer} onChange={ev => setMenu({ ...menu, offer: ev.target.value })} placeholder="Offre (ex: 20% de réduction)" />
            <input type="checkbox" checked={menu.is_popular} onChange={ev => setMenu({ ...menu, is_popular: ev.target.checked })} />
            <label htmlFor="is_popular">Populaire</label>
            <input value={menu.quantity_served} onChange={ev => setMenu({ ...menu, quantity_served: ev.target.value })} placeholder="Quantité servie" />
            <input type="checkbox" checked={menu.is_available_delivery} onChange={ev => setMenu({ ...menu, is_available_delivery: ev.target.checked })} />
            <label htmlFor="is_available_delivery">Disponible pour la livraison</label>
            <input value={menu.with_sauce} onChange={ev => setMenu({ ...menu, with_sauce: ev.target.value })} placeholder="Avec sauce" />
            <select value={menu.category_id} onChange={ev => setMenu({ ...menu, category_id: ev.target.value })}>
              <option value="">Sélectionner une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
            <button className="btn" type="submit">Enregistrer</button>
          </form>
        )}
      </div>
    </>
  );
}
