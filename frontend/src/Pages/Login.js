import React, { useState } from 'react';
import './Login.css';
import './Reset.css';
import AuthService from "../Services/auth.service";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/eso Animate rio.json';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const redirectByRole = (role) => {
    const r = role?.toLowerCase();
    if (r === "admin") navigate("/recommendation");
    else navigate("/recommendation"); // tu peux changer par /profile si besoin
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setMessage("");
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    try {
      const user = await AuthService.login(email, password);

      // ✅ Sauvegarder les données essentielles dans localStorage (sans mot de passe)
      localStorage.setItem("user_id", user.id);

      redirectByRole(user.type);
    } catch (error) {
      setMessage(error.message || "Erreur lors de la connexion.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo-home-container">
          <img src="/images/reco.png" alt="Logo Anime" className="navbar-logo" />
          <Link to="/" className="home-link">
            <HomeIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
            <span>Accueil</span>
          </Link>
        </div>
      </div>

      <div className="login-container">
        <div className="login-image">
          <Lottie animationData={loginAnimation} loop autoplay style={{ height: 280 }} />
        </div>

        <div className="login-form">
          <h2>Bienvenue sur Anime Recommender</h2>
          <p>Connectez-vous à votre compte</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="icon" />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
                required
              />
              <FaLock className="icon" />
            </div>

            <div className="effacer-formulaire">
              <label onClick={handleCancel}>Effacer ?</label>
              <Link to="/register">Créer un compte</Link>
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Connexion en cours..." : "Connexion"}
            </button>

            {message && (
              <div className="alert alert-danger mt-3" role="alert">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
