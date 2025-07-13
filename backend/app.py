from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 🔌 Connexion MySQL
def get_mysql_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="anime-recomender"  
    )

# ✅ Nouvelle route : Infos utilisateur + animes notés

@app.route("/api/user/<int:user_id>", methods=["GET"])
def get_user_profile(user_id):
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor(dictionary=True)

        # 🔍 Récupérer les infos utilisateur
        cursor.execute("SELECT * FROM users WHERE id_user = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Utilisateur non trouvé"}), 404

        # 📦 Récupérer les animes notés par l'utilisateur
        cursor.execute("""
            SELECT a.anime_id, a.name, a.image_url, r.rating
            FROM rating r
            JOIN anime a ON a.anime_id = r.anime_id
            WHERE r.user_id = %s
            ORDER BY r.rating DESC
            LIMIT 20
        """, (user_id,))
        animes = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({"user": user, "animes": animes})

    except Exception as e:
        print("Erreur récupération profil:", e)
        return jsonify({"error": "Erreur serveur"}), 500

# 🔐 Route login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"status": "error", "message": "Email et mot de passe requis."}), 400

    try:
        conn = get_mysql_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user and user['password'] == password:
            return jsonify({
                "status": "success",
                "message": "Connexion réussie",
                "user": {
                    "id": user["id_user"],
                    "email": user["email"],
                    "nom": user.get("nom", ""),
                    "prenom": user.get("prenom", ""),
                    "type": user.get("type", ""),
                    "status": user.get("status", "")
                }
            }), 200
        return jsonify({"status": "error", "message": "Identifiants incorrects."}), 401

    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 📦 Liste des animes
@app.route('/animes', methods=['GET'])
def get_animes():
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM anime LIMIT 20")
        animes = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "data": animes}), 200
    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 🔝 Meilleurs animes
@app.route('/top-animes', methods=['GET'])
def get_top_animes():
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM anime WHERE rating IS NOT NULL ORDER BY rating DESC LIMIT 20")
        animes = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "data": animes}), 200
    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 🔍 Recherche anime
@app.route('/search-animes', methods=['GET'])
def search_animes():
    keyword = request.args.get('q', '').strip()
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT anime_id, name FROM anime WHERE name LIKE %s LIMIT 10", (f"%{keyword}%",))
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "data": results}), 200
    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ▶️ Lancer le serveur
if __name__ == '__main__':
    app.run(debug=True, port=5000)
