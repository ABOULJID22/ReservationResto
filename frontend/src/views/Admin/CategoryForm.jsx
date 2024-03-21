import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../axois-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function CategoryForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    title: '',
    item_count: 0,
    img: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    axiosClient.post('/categories', category)
      .then(() => {
        setNotification('La catégorie a été ajoutée avec succès.');
        navigate('/categories');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Nouvelle catégorie</h1>
      <div className="card animated fadeInDown">
        <form onSubmit={onSubmit}>
          <input value={category.title} onChange={ev => setCategory({ ...category, title: ev.target.value })} placeholder="Titre de la catégorie" required />
          <input value={category.item_count} onChange={ev => setCategory({ ...category, item_count: ev.target.value })} type="number" placeholder="Nombre d'articles" />
          <input value={category.img} onChange={ev => setCategory({ ...category, img: ev.target.value })} placeholder="URL de l'image" />
          <button className="btn" type="submit">Enregistrer</button>
        </form>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
