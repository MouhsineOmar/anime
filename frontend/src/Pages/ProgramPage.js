import React from "react";
import "./BlogPage.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import ideaAnimation1 from "../assets/idea.json"; // animation Lottie
import ideaAnimation2 from "../assets/math.json"; // animation Lottie
import ideaAnimation3 from "../assets/physique.json"; // animation Lottie
import ideaAnimation4 from "../assets/card.json"; // animation Lottie
import ideaAnimation5 from "../assets/burea.json"; // animation Lottie





const PortfolioPage = () => {
  const navigate = useNavigate();

  return (
        <div className="cv-container">
          <button className="return-button" onClick={() => navigate("/")}>
      ⬅️ Retour à l'accueil
    </button>

      {/* Colonne gauche */}
      <div className="cv-sidebar">
        <img src="/images/omar.png" alt="Omar Mouhsine" className="cv-photo" />
        <h2>Omar Mouhsine</h2>
        <p>Étudiant en Master Ingénierie Informatique</p>
        <p>Développeur & Enseignant stagiaire en mathématiques</p>

        <div className="cv-contact">
          <p>📍 Oujda, Maroc</p>
          <p>📧 omarmouhsine2000@gmail.com</p>
        </div>

        <div className="cv-animation">
        <br/><br/><br/><br/><br/><br/>
          <Lottie animationData={ideaAnimation1} loop autoplay /><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Lottie animationData={ideaAnimation2} loop autoplay /><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Lottie animationData={ideaAnimation3} loop autoplay /><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Lottie animationData={ideaAnimation4} loop autoplay /><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Lottie animationData={ideaAnimation5} loop autoplay />



        </div>
      </div>

      {/* Colonne droite */}
      <div className="cv-main">
        <h1>À propos de moi</h1>
        <p>
          Je suis <strong>étudiant en Master Ingénierie Informatique</strong> et
          <strong> enseignant stagiaire en mathématiques</strong>. Passionné par le développement web, mobile,
          les systèmes complexes et l’intelligence artificielle, je combine rigueur scientifique et créativité logicielle.
        </p>
        <h2>Formation académique 🎓</h2>
          <ul>
            <li>
              <strong>2024</strong> – Licence en Mathématiques <br />
              <em>Faculté des Sciences, Université Mohammed Premier</em>
            </li>
            <li>
              <strong>2023</strong> – DEUG en Mathématiques et Informatique <br />
              <em>Université Mohammed Premier</em>
            </li>
            <li>
              <strong>2021</strong> – Baccalauréat en Sciences Physique-Chimie <br />
              <em>Lycée qualifiant</em>
            </li>
          </ul>

          <h2>Certifications 📜</h2>
          <ul>
            <li>✅<strong>Certification Cisco</strong> – Réseaux, IoT, Internet Protocols (IPT)</li>
          </ul>


        <h2>Compétences techniques 🧠</h2>

          <h4>Langages de programmation</h4>
          <ul>
            <li>☕Java / Java EE (J2EE)</li>
            <li>🐍Python</li>
            <li>💠C / C++</li>
            <li>🔷Kotlin</li>
            <li>⚛️React.js, Vue.js, JavaScript (JS)</li>
            <li>📱Flutter (Dart)</li>
            <li>🛠PHP</li>
            <li>🌐HTML5, CSS3</li>
          </ul>

          <h4>Outils de développement</h4>
          <ul>
            <li>🧩 VS Code, NetBeans, Android Studio</li>
            <li>🔧 Apache, WAMP Server, XAMPP</li>
            <li>🗃️ MySQL, SQL Server Management Studio</li>
          </ul>

          <h4>Technologies & Frameworks</h4>
          <ul>
            <li>🔌 Java EE (Servlet, JSP), JDBC</li>
            <li>⚙️ Git, GitHub</li>
            <li>📦 Node.js, Express.js</li>
          </ul>

          <h4>Outils bureautiques</h4>
          <ul>
            <li>📝 Microsoft Word, Excel, PowerPoint</li>
          </ul>

          <h4>Outils mathématiques / scientifiques</h4>
          <ul>
            <li>📐 MATLAB, GeoGebra</li>
          </ul>


        <h2>Projets réalisés 🛠️</h2>
          <ul>
            <li>🏥 <strong>Gestion de cabinet médical</strong> – application de gestion de rendez-vous, dossiers patients et ordonnances</li>
            <li>🏨 <strong>Gestion d'hôtel</strong> – gestion des réservations, chambres, clients et factures (web)</li>
            <li>🎓 <strong>Gestion d’étudiants</strong> – plateforme web avec système de notes, classes, inscriptions et profils</li>
            <li>🛍️ <strong>Site e-commerce</strong> – interface client et admin avec gestion produits, panier, paiement (React + PHP)</li>
            <li>🎙️ <strong>Application web de reconnaissance vocale</strong> – dictée automatique et transcription de texte</li>
            <li>🎬 <strong>Système de recommandation de films</strong> – modèle basé sur la similarité de contenu (style Netflix)</li>
            <li>🧠 <strong>Modèle IA de reconnaissance faciale</strong> – détection en temps réel des visages avec classification</li>
            <li>😊 <strong>Détection émotionnelle faciale</strong> – reconnaissance des émotions à partir d'images et webcam</li>
            <li>🗣️ <strong>Détection émotionnelle vocale</strong> – analyse des sentiments à partir d’extraits audio (voix)</li>
            <li>✍️ <strong>Détection émotionnelle textuelle</strong> – classification des émotions dans des phrases écrites</li>
          </ul>


        <h2>Projet 9RABCLIQUE 🚀</h2>
        <p>
          9RABCLIQUE est une plateforme numérique innovante dédiée aux collégiens, combinant vidéos pédagogiques,
          exercices interactifs, quiz, reconnaissance émotionnelle, et suivi personnalisé.
        </p>

        <h2>Objectifs professionnels</h2>
        <ul>
          <li>🎓 Finaliser mon Master & viser un doctorat en IA éducative</li>
          <li>📈 Déployer 9RABCLIQUE dans les établissements marocains</li>
          <li>🌍 Travailler sur des projets impactants et accessibles</li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioPage;
