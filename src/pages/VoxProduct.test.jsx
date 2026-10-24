import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Feed from './Feed';
import Dashboard from './Dashboard';
import Login from './Login';

// Вспомогательная функция для рендеринга компонентов с поддержкой роутинга
const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Лабораторная работа №7: Тестирование MVP VoxProduct', () => {

    // ТРЕБОВАНИЕ 1: Клиентская фильтрация отзывов в ленте (с учетом экрана загрузки)
    it('Требование 1 (Фильтрация): клик по кнопке "Баги" фильтрует таблицу результатов', async () => {
        // Используем фейковые таймеры Vitest, чтобы мгновенно пропустить 1.5 секунды загрузки
        vi.useFakeTimers();

        renderWithRouter(<Feed />);

        // В самом начале должен отображаться текст загрузки спиннера
        expect(screen.getByText(/анализирует тональность фидбека/i)).toBeInTheDocument();

        // Прокручиваем время вперед на 1500 мс, чтобы экран загрузки исчез
        act(() => {
            vi.advanceTimersByTime(1500);
        });

        // Теперь таблица появилась. Проверяем наличие отзывов
        expect(screen.getByText(/Очень крутая темная тема/i)).toBeInTheDocument();

        // Находим кнопку фильтрации "Баги" и кликаем по ней
        const bugsButton = screen.getByText(/Баги/i);
        fireEvent.click(bugsButton);

        // Ожидаемое поведение: отзыв про UI должен исчезнуть, а отзыв про баг — остаться
        expect(screen.queryByText(/Очень крутая темная тема/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Приложение вылетает при попытке загрузить тяжелый XLSX лог/i)).toBeInTheDocument();

        vi.useRealTimers();
    });

    // ТРЕБОВАНИЕ 2: Адаптивное интерактивное бургер-меню
    it('Требование 2 (Адаптивность): клик по кнопке-бургеру переключает состояние меню навигации', () => {
        renderWithRouter(<Dashboard />);

        const burgerButton = screen.getByText('☰');
        expect(burgerButton).toBeInTheDocument();

        fireEvent.click(burgerButton);
        expect(burgerButton.textContent).toBe('✕');

        fireEvent.click(burgerButton);
        expect(burgerButton.textContent).toBe('☰');
    });

    // ТРЕБОВАНИЕ 3: Валидация обязательных полей формы авторизации
    it('Требование 3 (Валидация формы): поля ввода E-mail и Пароль являются обязательными (required)', () => {
        // Получаем container напрямую из деструктуризации метода render
        const { container } = renderWithRouter(<Login />);

        // Находим все инпуты внутри формы входа
        const allInputs = container.querySelectorAll('input');

        // Убеждаемся, что на форме есть как минимум поля ввода E-mail и Пароля
        expect(allInputs.length).toBeGreaterThanOrEqual(2);

        // Ожидаемое поведение: каждое поле имеет встроенный HTML5-атрибут required
        allInputs.forEach(input => {
            expect(input).toBeRequired();
        });
    });
});
