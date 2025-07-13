import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import adminWelcomeAnim from '../assets/welcom.json';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔄 Récupérer l'utilisateur connecté
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔐 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-4 text-center">
      {/* ✅ Bouton Déconnexion en haut à droite */}
      <div className="d-flex justify-content-end mb-2">
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          🚪 تسجيل الخروج
        </button>
      </div>

      {/* ✅ Animation d'accueil */}
      <div className="d-flex justify-content-center mb-3">
        <Lottie animationData={adminWelcomeAnim} loop autoplay style={{ width: 280 }} />
      </div>

      {/* ✅ Message de bienvenue */}
      {user && (
        <h2 className="mb-3">
          👋 مرحباً {user.nom} {user.prenom} في لوحة تحكم المشرف
        </h2>
      )}

      {/* ✅ Description */}
      <p className="text-muted mb-4" style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}>
        تُمكنك هذه الصفحة من إدارة المستخدمين داخل المنصة التعليمية، سواء كانوا أساتذة أو تلاميذ. يمكنك من هنا الاطلاع على قائمة المستخدمين، تعديل البيانات، ومراقبة الإحصائيات الخاصة بعدد المستخدمين وتوزيعهم حسب الأدوار.
      </p>

      {/* ✅ Liens */}
      <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
        <Link to="/admin/users" className="btn btn-primary btn-lg">
          🧑‍💻 قائمة المستخدمين
        </Link>
        <Link to="/admin/chart" className="btn btn-warning btn-lg text-white">
          📊 إحصائيات المستخدمين
        </Link>
      </div>

      {/* ✅ Footer */}
      <footer className="mt-5 text-center text-muted" style={{ fontSize: "0.9rem" }}>
        جميع الحقوق محفوظة © OmarMouhsine 2025
      </footer>
    </div>
  );
};

export default AdminDashboard;
