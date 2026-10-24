import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121214', color: '#FFFFFF', padding: '20px' }}>
            {/* Мы увеличили maxWidth до 900px, теперь текст красиво растянется в длину по горизонтали */}
            <main style={{ textAlign: 'center', width: '100%', maxWidth: '900px' }}>
                <header>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-1px' }}>VoxProduct</h1>
                </header>
                <section>
                    {/* Сделали шрифт 20px и добавили комфортный line-height */}
                    <p style={{ fontSize: '20px', color: '#8E8E93', marginBottom: '40px', lineHeight: '1.6', fontWeight: '400' }}>
                        SaaS-платформа автоматизированной аналитики текстового фидбека. <br />
                        Обработка отзывов, лингвистический анализ тональности и интеллектуальное тегирование логов для эффективного планирования разработки.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '16px 36px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}
                    >
                        Начать работу
                    </button>
                </section>
            </main>
        </div>
    );
}