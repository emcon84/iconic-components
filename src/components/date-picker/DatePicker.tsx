import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DatePicker.scss';



interface CustomDatePickerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    onChange: (date: Date) => void;
    mode: string;
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, setSelectedDate, mode }) => {

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
    const [inputDate, setInputDate] = useState(selectedDate.toISOString().slice(0, 10));
    const [inputDateSelect, setInputDateSelect] = useState(selectedDate.toISOString().slice(0, 10));


    let modeColor = null;
    if (mode === 'primary') modeColor = 'var(--color-primary)'
    if (mode === 'secondary') modeColor = 'var(--color-secondary)'
    if (mode === 'light') modeColor = 'var(--color-light)'
    if (mode === 'disabled') modeColor = 'var(--color-disabled)'
    if (mode === 'enfasis') modeColor = 'var(--color-enfasis)'

    useEffect(() => {
        setInputDate(selectedDate.toISOString().slice(0, 10));
    }, [selectedDate]);


    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (day: number) => {
        const newDate = new Date(selectedYear, selectedMonth, day);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        newDate.setSeconds(selectedDate.getSeconds());

        // Actualiza selectedDate y inputDate
        setSelectedDate(newDate);
        setInputDate(newDate.toISOString().slice(0, 10));
        toggleCalendar()
    };


    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Función para avanzar al mes siguiente
    const nextMonth = () => {
        const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
        setSelectedMonth(nextMonth);
        updateInputDate(selectedYear, nextMonth, selectedDate.getDate());
    };

    // Función para retroceder al mes anterior
    const prevMonth = () => {
        const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
        setSelectedMonth(prevMonth);
        updateInputDate(selectedYear, prevMonth, selectedDate.getDate());
    };

    // Función para avanzar al año siguiente
    const nextYear = () => {
        setSelectedYear(selectedYear + 1);
        updateInputDate(selectedYear + 1, selectedMonth, selectedDate.getDate());
    };

    // Función para retroceder al año anterior
    const prevYear = () => {
        setSelectedYear(selectedYear - 1);
        updateInputDate(selectedYear - 1, selectedMonth, selectedDate.getDate());
    };
    const updateInputDate = (year: number, month: number, day: number) => {
        setInputDateSelect(
            `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        );
    };


    const renderCalendar = () => {
        const date = new Date(selectedYear, selectedMonth, 1);
        const days = daysInMonth(selectedYear, selectedMonth);
        const firstDayOfWeek = date.getDay(); // Día de la semana del primer día del mes

        // Genera los días en blanco hasta el primer día del mes
        const emptyDays = Array.from({ length: firstDayOfWeek }, (_, index) => (
            <div key={`empty-${index}`} className="empty-day" />
        ));

        // Genera los días del mes
        const calendarDays = Array.from({ length: days }, (_, index) => {
            const day = index + 1;
            return (
                <div
                    key={day}
                    onClick={() => handleDateChange(day)}
                    className={day === selectedDate.getDate() ? "day selected-day" : "day"}
                >
                    {day}
                </div>
            );
        });


        return (
            <AnimatePresence>
                {showCalendar &&
                    (
                        <motion.div
                            className='calendar'
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.1 }}
                        >

                            <div className="calendar-header">
                                <div className="date-controls">
                                    <button onClick={prevYear} className='button-select'>‹‹</button>
                                    <button onClick={prevMonth} className='button-select'>‹</button>
                                    <input
                                        style={{ textAlign: 'center', border: 'none' }}
                                        type="text"
                                        value={inputDateSelect}
                                        // onClick={toggleCalendar}
                                        readOnly
                                    />
                                    <button onClick={nextMonth} className='button-select'>›</button>
                                    <button onClick={nextYear} className='button-select'>››</button>
                                </div>
                            </div>
                            <div className="calendar-days">
                                <div style={{ margin: 10, }}>L</div>
                                <div style={{ margin: 10, }}>M</div>
                                <div style={{ margin: 10, }}>X</div>
                                <div style={{ margin: 10, }}>J</div>
                                <div style={{ margin: 10, }}>V</div>
                                <div style={{ margin: 10, }}>S</div>
                                <div style={{ margin: 10, }}>D</div>
                                {emptyDays.concat(calendarDays)}
                            </div>

                        </motion.div>
                    )

                }
            </AnimatePresence>
        );
    };

    return (
        <div className="custom-date-picker">
            <input
                type="text"
                value={inputDate}
                // onChange={handleInputChange}
                onClick={toggleCalendar}
                readOnly
                className='input-date'
                style={{ border: `1px solid ${modeColor}`, outline: 'none' }}
            />
            {showCalendar && renderCalendar()}
        </div>
    );
};

