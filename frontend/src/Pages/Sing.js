import React, { useState } from 'react';
import './sing.css';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { FaEnvelope, FaLock, FaUser, FaCalendar, FaMapMarkerAlt, FaIdBadge, FaGraduationCap, FaImage } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/login.json';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '', prenom: '', date_naissance: '', lieu_naissance: '',
    code_massar: '', email: '', password: '', niveau: '', image_url: '', role: 'etudiant'
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFormData({ nom: '', prenom: '', date_naissance: '', lieu_naissance: '',
      code_massar: '', email: '', password: '', niveau: '', image_url: '', role: 'etudiant' });
    setMessage('');
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("تم إنشاء الحساب بنجاح!");
      navigate("/Login");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo-home-container">
          <Link to="/" className="home-link">
            <HomeIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
            <span>الصفحة الرئيسية</span>
          </Link>
        </div>
      </div>

      <div className="signup-container">
        <div className="signup-animation">
          <Lottie animationData={loginAnimation} loop autoplay style={{ height: 300 }} />
        </div>

        <div className="signup-form">
          <h2>إنشاء حساب جديد</h2>
          <form onSubmit={handleSignup}>
            <div className="input-group"><input name="nom" placeholder="الاسم العائلي" value={formData.nom} onChange={handleChange} /><FaUser className="icon" /></div>
            <div className="input-group"><input name="prenom" placeholder="الاسم الشخصي" value={formData.prenom} onChange={handleChange} /><FaUser className="icon" /></div>
            <div className="input-group"><input name="date_naissance" type="date" value={formData.date_naissance} onChange={handleChange} /><FaCalendar className="icon" /></div>
            <div className="input-group"><input name="lieu_naissance" placeholder="مكان الازدياد" value={formData.lieu_naissance} onChange={handleChange} /><FaMapMarkerAlt className="icon" /></div>
            <div className="input-group"><input name="code_massar" placeholder="رمز مسار" value={formData.code_massar} onChange={handleChange} /><FaIdBadge className="icon" /></div>
            <div className="input-group"><input name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} /><FaEnvelope className="icon" /></div>
            <div className="input-group"><input name="password" type="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} /><FaLock className="icon" /></div>
            <div className="input-group"><input name="niveau" placeholder="المستوى الدراسي" value={formData.niveau} onChange={handleChange} /><FaGraduationCap className="icon" /></div>
            <div className="input-group"><input name="image_url" placeholder="رابط الصورة (اختياري)" value={formData.image_url} onChange={handleChange} /><FaImage className="icon" /></div>

            <div className="input-group">
              <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '5px' }}>
                <option value="etudiant">تلميذ</option>
                <option value="prof">أستاذ</option>
              </select>
            </div>

            <div className="effacer-formulaire">
              <label onClick={handleReset}>إعادة التهيئة</label>
              <Link to="/Login">هل لديك حساب؟ تسجيل الدخول</Link>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>} إنشاء الحساب
            </button>

            {message && <div className="alert alert-danger">{message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
