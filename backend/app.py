from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 🔌 Connexion MySQL (XAMPP)
def get_mysql_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",         # ou ton utilisateur
        password="",         # mot de passe vide par défaut sous XAMPP
        database="anime-recomender"  # nom correct de ta base
    )

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

        if user:
            if user['password'] == password:  # ✅ Comparaison directe
                return jsonify({
                    "status": "success",
                    "message": "Connexion réussie",
                    "user": {
                        "id": user["id_user"],  # ✅ Nom de champ correct
                        "email": user["email"],
                        "name": user.get("name", ""),
                        "role": user.get("role", "user")
                    }
                }), 200
            else:
                return jsonify({"status": "error", "message": "Mot de passe incorrect."}), 401
        else:
            return jsonify({"status": "error", "message": "Utilisateur non trouvé."}), 404

    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": f"Erreur MySQL : {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
