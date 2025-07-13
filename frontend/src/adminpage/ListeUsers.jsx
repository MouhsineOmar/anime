import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListeUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Erreur récupération utilisateurs :", err);
        setErreur("فشل في تحميل المستخدمين.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا المستخدم ؟")) {
      axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
          setUsers(prev => prev.filter(u => u.id !== id));
        })
        .catch(err => {
          console.error("Erreur suppression:", err);
          alert("فشل في حذف المستخدم.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center w-100" style={{ color: "#6a1b9a", fontWeight: 'bold' }}>
          👥 قائمة المستخدمين (بدون المشرفين)
        </h3>
      </div>

      <div className="text-start mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ⬅ العودة
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">جاري التحميل...</p>
        </div>
      ) : erreur ? (
        <div className="alert alert-danger text-center">{erreur}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead style={{ backgroundColor: '#6a1b9a', color: 'white' }}>
              <tr>
                <th>👤 الاسم الكامل</th>
                <th>📧 البريد الإلكتروني</th>
                <th>🎓 الدور</th>
                <th>📚 المستوى</th>
                <th>📅 تاريخ التسجيل</th>
                <th>⚙️ العمليات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u.nom} {u.prenom}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'prof' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>
                      {u.role === 'prof' ? 'أستاذ' : 'تلميذ'}
                    </span>
                  </td>
                  <td>{u.niveau || '-'}</td>
                  <td>{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">📝 تعديل</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>🗑 حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
        ⓒ OmarMouhsine 2025 - منصة إدارة المستخدمين
      </footer>
    </div>
  );
};

export default ListeUsers;
