import React, { useState } from 'react';
import './ForgotPassword.css'; 
import im from './forgotimg.png';
import { FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const ForgotPassword = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handlreset = (e) => {
        e.preventDefault(); 
        navigate("/Reset");
    };

    return (
        <>
            {/* ✅ شريط التنقل */}
            <div className="navbar" style={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                height: '80px',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000
            }}>
                <div className="logo-home-container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <img
                        src="/images/newlogo.png"
                        alt="Logo"
                        style={{
                            height: '150px',
                            objectFit: 'contain',
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1000
                        }}
                    />
                    <Link
                        to="/"
                        className="home-link"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                            marginLeft: '180px'
                        }}
                    >
                        <HomeIcon sx={{
                            marginRight: '5px',
                            color: 'rgba(128, 128, 128, 0.5)'
                        }} />
                        <span style={{
                            verticalAlign: 'middle',
                            marginTop: '2px'
                        }}>
                            الرئيسية
                        </span>
                    </Link>
                </div>
            </div>

            {/* ✅ محتوى الصفحة */}
            <div className="forgot-container">
                <div className="forgot-form">
                    <h2>هل نسيت كلمة المرور؟</h2>

                    <p>
                        يرجى إدخال البريد الإلكتروني الذي استخدمته عند التسجيل، وستتلقى رسالة تحتوي على رابط لإعادة تعيين كلمة المرور!
                    </p>

                    <form onSubmit={handlreset}>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FaEnvelope className='icon' />
                        </div>

                        <button className="btn-block reset-btn">
                            <span>إعادة تعيين كلمة المرور</span>
                        </button>

                        <Link className="retour" to="/Login"> 🔁 تسجيل الدخول </Link>
                    </form>
                </div>

                <div className="login-image">
                    <img src={im} alt="توضيح تسجيل الدخول" />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
