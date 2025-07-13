const API_URL = "http://127.0.0.1:5000"; // Adresse de ton backend Flask

const AuthService = {
  // ✅ Connexion de l'utilisateur
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ✅ Vérification de la réponse
      if (!response.ok || !data || data.status !== "success" || !data.user) {
        throw new Error(data.message || "Échec de la connexion.");
      }

      // ✅ Stocker l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;

    } catch (error) {
      console.error("❌ Erreur de connexion:", error.message);
      throw error;
    }
  },

  // ✅ Déconnexion
  logout: () => {
    localStorage.removeItem("user");
  },

  // ✅ Obtenir l'utilisateur actuellement connecté
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
};

export default AuthService;
