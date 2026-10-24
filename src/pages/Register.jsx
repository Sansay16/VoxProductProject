import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121214', color: '#FFFFFF' }}>
            <main style={{ backgroundColor: '#1A1A1E', padding: '40px', borderRadius: '12px', border: '1px solid #222226', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
                <header style={{ marginBottom: '32px', textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Регистрация</h1>
                </header>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#8E8E93' }}>Имя</label>
                        <input type="text" required style={{ backgroundColor: '#121214', border: '1px solid #222226', borderRadius: '6px', padding: '12px', color: '#FFFFFF', fontSize: '14px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#8E8E93' }}>E-mail</label>
                        <input type="email" required style={{ backgroundColor: '#121214', border: '1px solid #222226', borderRadius: '6px', padding: '12px', color: '#FFFFFF', fontSize: '14px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#8E8E93' }}>Пароль</label>
                        <input type="password" required style={{ backgroundColor: '#121214', border: '1px solid #222226', borderRadius: '6px', padding: '12px', color: '#FFFFFF', fontSize: '14px' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '12px', fontSize: '14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }}>
                        Создать аккаунт
                    </button>
                </form>
                <footer style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '14px', cursor: 'pointer' }}>
                        Уже есть аккаунт? Войти
                    </button>
                </footer>
            </main>
        </div>
    );
}