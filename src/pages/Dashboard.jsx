import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    // Хук для отслеживания: открыто ли мобильное меню (true/false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="page-body">
            {/* Боковое меню (Sidebar) с динамическим классом для планшетов */}
            <aside className={`sidebar ${isMenuOpen ? 'sidebar--open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div className="sidebar__logo">VoxProduct</div>
                    {/* Кнопка-бургер меняет свое состояние при клике */}
                    <button
                        className="sidebar__burger"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Открыть меню"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                <nav className="sidebar__nav" style={{ display: isMenuOpen ? 'block' : '' }}>
                    <ul className="sidebar__menu">
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link sidebar__link--active" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>📊 Дашборд</a>
                        </li>
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link" onClick={() => { navigate('/feed'); setIsMenuOpen(false); }}>💬 Лента отзывов</a>
                        </li>
                        <li className="sidebar__item">
                            <a href="#" className="sidebar__link">⚙️ Профиль</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Основная рабочая область */}
            <main className="main-content">
                <header className="main-header">
                    <h1 className="main-header__title">Панель аналитики фидбека</h1>
                </header>

                <section className="upload-section">
                    <p className="upload-form__text">Перетащите сюда файл .CSV / .XLSX для запуска анализа</p>
                    <button className="upload-form__button" onClick={() => navigate('/feed')}>Выбрать файл с компьютера</button>
                </section>

                <section className="analytics-grid">
                    <article className="analytics-card">
                        <h2 className="analytics-card__title">Тональность отзывов</h2>
                        <div className="chart-placeholder">
                            [ Имитация PieChart: 70% Негатив / 30% Позитив ]
                        </div>
                    </article>

                    <article className="analytics-card">
                        <h2 className="analytics-card__title">Топ критических категорий</h2>
                        <div className="chart-placeholder">
                            [ Имитация BarChart: Баги (3) / Цена (1) ]
                        </div>
                    </article>
                </section>

                <footer className="main-footer">
                    <p className="main-footer__text">&copy; 2026 VoxProduct. Проект магистратуры.</p>
                </footer>
            </main>
        </div>
    );
}