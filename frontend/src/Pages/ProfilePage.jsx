import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [animes, setAnimes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // 🔁 Charger les infos au démarrage
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    console.log("📦 user_id localStorage =", userId); // ✅ TEST ICI

    if (!userId) return;

    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then((res) => {
        setUser(res.data.user);
        setFormData(res.data.user); // initialiser les champs
        setAnimes(res.data.animes);
      })
      .catch((error) => console.error("Erreur chargement profil:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      await axios.put(`http://localhost:5000/api/user/${userId}`, formData);
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur mise à jour:", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (!user) return <div>Chargement du profil...</div>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1>Profil Utilisateur</h1>

      {editMode ? (
        <>
          <label>Nom : <input name="nom" value={formData.nom} onChange={handleChange} /></label><br />
          <label>Prénom : <input name="prenom" value={formData.prenom} onChange={handleChange} /></label><br />
          <label>Email : <input name="email" value={formData.email} onChange={handleChange} /></label><br />
          <label>Image URL : <input name="url_image_profile" value={formData.url_image_profile || ""} onChange={handleChange} /></label><br />
          <label>Type : <input name="type" value={formData.type} onChange={handleChange} disabled /></label><br />
          <button onClick={handleSave} style={{ marginTop: "1rem" }}>💾 Sauvegarder</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: "1rem" }}>❌ Annuler</button>
        </>
      ) : (
        <>
          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Prénom :</strong> {user.prenom}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Type :</strong> {user.type}</p>
          <p><strong>Date d’inscription :</strong> {user.date_inscription}</p>
          <p><strong>Status :</strong> {user.status}</p>
          {user.url_image_profile && (
            <p>
              <strong>Photo :</strong><br />
              <img src={user.url_image_profile} alt="profil" width="100" style={{ borderRadius: "10px" }} />
            </p>
          )}
          <button onClick={() => setEditMode(true)}>✏️ Modifier le profil</button>
        </>
      )}

      <h3 style={{ marginTop: "2rem" }}>Animes Notés :</h3>
      <ul>
        {animes.map((anime, index) => (
          <li key={index}>
            <img src={anime.image_url} alt={anime.name} width="50" style={{ verticalAlign: "middle", marginRight: "10px" }} />
            {anime.name} — Note : {anime.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
