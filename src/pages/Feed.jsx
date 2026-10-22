import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_REVIEWS = [
    { id: 1, date: '2026-10-20', text: 'Приложение вылетает при попытке загрузить тяжелый XLSX лог, поправьте сервер.', category: 'bugs', tone: 'Негативный', color: '#EF4444' },
    { id: 2, date: '2026-10-19', text: 'Очень крутая темная тема, аналитика графиков выглядит солидно.', category: 'ui', tone: 'Позитивный', color: '#10B981' },
    { id: 3, date: '2026-10-18', text: 'Подписка слишком дорогая для инди-разработчиков, снизьте цену.', category: 'price', tone: 'Негативный', color: '#EF4444' },
    { id: 4, date: '2026-10-17', text: 'Кнопка импорта не нажимается с первого раза на планшетах iPad.', category: 'bugs', tone: 'Негативный', color: '#EF4444' },
    { id: 5, date: '2026-10-16', text: 'В таблице отзывов не хватает поиска, но фильтрация по тегам удобная.', category: 'ui', tone: 'Позитивный', color: '#10B981' }
];

export default function Feed() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Новое состояние для экрана загрузки (по умолчанию true)
    const [isLoading, setIsLoading] = useState(true);

    // Эффект автоматического переключения состояния через 1500 мс (имитация работы ИИ)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredReviews = filter === 'all'
        ? MOCK_REVIEWS
        : MOCK_REVIEWS.filter(review => review.category === filter);

    return (
        <div className="page-body">
            {/* Боковое меню (Sidebar) */}
            <aside className={`sidebar ${isMenuOpen ? 'sidebar--open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div className="sidebar__logo">VoxProduct</div>
                    <button className="sidebar__burger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Открыть меню">
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                <nav className="sidebar__nav" style={{ display: isMenuOpen ? 'block' : '' }}>
                    <ul className="sidebar__menu">
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>📊 Дашборд</a>
                        </li>
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link sidebar__link--active" onClick={() => { navigate('/feed'); setIsMenuOpen(false); }}>💬 Лента отзывов</a>
                        </li>
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link">⚙️ Профиль</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Основной контент */}
            <main className="main-content">
                <header className="main-header">
                    <h1 className="main-header__title">Интерактивная лента отзывов</h1>
                </header>

                {/* УСЛОВНЫЙ РЕНДЕР: Если идет загрузка — показываем спиннер, иначе — таблицу */}
                {isLoading ? (
                    <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', gap: '20px' }}>
                        {/* CSS-анимация крутящегося круга */}
                        <div style={{ width: '50px', height: '50px', border: '5px solid #1A1A1E', borderTop: '5px solid #2563EB', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                        <p style={{ color: '#8E8E93', fontSize: '16px', margin: 0 }}>Искусственный интеллект VoxProduct анализирует тональность фидбека...</p>
                    </section>
                ) : (
                    <>
                        {/* Блок фильтров */}
                        <section style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button onClick={() => setFilter('all')} style={{ backgroundColor: filter === 'all' ? '#2563EB' : '#1A1A1E', color: '#FFFFFF', border: '1px solid #222226', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Все ({MOCK_REVIEWS.length})</button>
                            <button className="filter-btn" onClick={() => setFilter('bugs')} style={{ backgroundColor: filter === 'bugs' ? '#2563EB' : '#1A1A1E', color: '#FFFFFF', border: '1px solid #222226', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>🚨 Баги ({MOCK_REVIEWS.filter(r => r.category === 'bugs').length})</button>
                            <button className="filter-btn" onClick={() => setFilter('price')} style={{ backgroundColor: filter === 'price' ? '#2563EB' : '#1A1A1E', color: '#FFFFFF', border: '1px solid #222226', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>💰 Цена ({MOCK_REVIEWS.filter(r => r.category === 'price').length})</button>
                            <button className="filter-btn" onClick={() => setFilter('ui')} style={{ backgroundColor: filter === 'ui' ? '#2563EB' : '#1A1A1E', color: '#FFFFFF', border: '1px solid #222226', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>🎨 UI/UX ({MOCK_REVIEWS.filter(r => r.category === 'ui').length})</button>
                        </section>

                        {/* Интерактивная таблица данных */}
                        <section style={{ backgroundColor: '#1A1A1E', borderRadius: '8px', border: '1px solid #222226', overflow: 'hidden', marginTop: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #222226', color: '#8E8E93' }}>
                                        <th style={{ padding: '16px' }}>Дата</th>
                                        <th style={{ padding: '16px' }}>Текст отзыва</th>
                                        <th style={{ padding: '16px' }}>Тональность</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReviews.map((review) => (
                                        <tr key={review.id} style={{ borderBottom: '1px solid #222226' }}>
                                            <td style={{ padding: '16px', color: '#8E8E93', whiteSpace: 'nowrap' }}>{review.date}</td>
                                            <td style={{ padding: '16px', lineHeight: '1.5' }}>{review.text}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ color: review.color, fontWeight: '600', backgroundColor: review.color + '1A', padding: '4px 8px', borderRadius: '4px' }}>
                                                    {review.tone}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                )}

                <footer className="main-footer">
                    <p className="main-footer__text">&copy; 2026 VoxProduct. Проект магистратуры.</p>
                </footer>
            </main>
        </div>
    );
}
