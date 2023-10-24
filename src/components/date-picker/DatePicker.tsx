import React, { useEffect, useState } from 'react';
import './DatePicker.scss';



interface CustomDatePickerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    onChange: (date: Date) => void;
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, setSelectedDate }) => {

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
    const [inputDate, setInputDate] = useState(selectedDate.toISOString().slice(0, 10));


    useEffect(() => {
        setInputDate(selectedDate.toISOString().slice(0, 10));
    }, [selectedDate]);


    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (day: number) => {
        const newDate = new Date(selectedYear, selectedMonth, day);
        // Establece la hora, minutos y segundos de la fecha seleccionada a partir de selectedDate
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        newDate.setSeconds(selectedDate.getSeconds());

        // Actualiza selectedDate y inputDate
        setSelectedDate(newDate);
        setInputDate(newDate.toISOString().slice(0, 10));
        // console.log('IputDate', day)
    };


    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
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
                    className={day === selectedDate.getDate() ? "selected-day" : ""}
                >
                    {day}
                </div>
            );
        });


        return (
            <div className="calendar">
                <div className="calendar-header">
                    <div>
                        <select value={selectedMonth} onChange={handleMonthChange}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select value={selectedYear} onChange={handleYearChange}>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={selectedYear - 5 + i}>{selectedYear - 5 + i}</option>
                            ))}
                        </select>
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
            </div>
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
            />
            {showCalendar && renderCalendar()}
        </div>
    );
};

