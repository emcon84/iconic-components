// CustomSelect.tsx
import React, { useEffect, useRef, useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion';

import './Select.scss';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[];
    onChange: (selectedValue: string) => void;
}

export const Select: React.FC<CustomSelectProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [arrowRotation, setArrowRotation] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
        setArrowRotation(isOpen ? 0 : 180);
    };

    const handleOptionClick = (value: string) => {
        setSelectedOption(value);
        onChange(value);
        setIsOpen(false);
        setArrowRotation(0);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select" ref={containerRef}>
            <div className={`select-header ${isOpen ? 'open' : ''}`} onClick={toggleSelect}>
                {selectedOption || 'Seleccionar...'}
                <AnimatePresence>
                    <BsCaretDownFill
                        style={{
                            marginLeft: '5px',
                            position: 'absolute',
                            left: '85%',
                            top: '50%',
                            transform: `translateY(-50%) rotate(${arrowRotation}deg)`,
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        size={14}
                        color="grey"
                    />
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className='options'
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`option ${selectedOption === option.value ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};


