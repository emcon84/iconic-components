import './Loading.scss'

interface IconProps {
    noIcon?: boolean;
}

export const Loading: React.FC<IconProps> = ({ noIcon }) => {


    return (

        <svg
            width="20"
            height="15"
            viewBox="0 0 100 100"
            className='spinner'
            style={{
                position: "absolute",
                left: noIcon ? "15" : "7",
                top: noIcon ? "17" : "7",
                transform: "translate(-50%, -50%)"
            }}
        >
            <circle r="40" cy="50" cx="50"></circle>
        </svg>

    )
}