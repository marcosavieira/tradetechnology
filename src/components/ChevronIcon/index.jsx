export const ChevronIcon = ({ className, size = 12 }) => {
    return (
        <svg
            className={className}
            color="#747488"
            width={size}
            height={size}
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.25 0.75L4 4.25L0.75 0.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
