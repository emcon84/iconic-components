import React from "react";
import './Button.scss';
import { Loading } from "../loading/Loading";


interface ButtonProps {
    label: string;
    type: string;
    icon?: React.ReactNode;
    minWidth?: string
    loading?: boolean;
    onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, type, icon, loading, minWidth, onPress }) => {

    return (
        <button
            onClick={() => onPress()}
            disabled={loading}
            className={`${type} flex loading-button`}
            style={{
                minWidth: `${minWidth}`,
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
        >
            {icon
                ?
                <span style={{ margin: '0 3px 0 3px', position: 'relative', minWidth: 22 }}>
                    {icon && !loading ? icon : null}
                    {loading && <Loading />}
                </span>
                :
                loading && <Loading noIcon />
            }
            {label}
        </button>
    )
}