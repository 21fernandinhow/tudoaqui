interface LoaderProps {
    isSmall?: boolean
}

export const Loader = ({ isSmall }: LoaderProps) => {
    return (
        <div className={`loader ${isSmall ? "loader-small" : ""}`}>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
        </div>
    );
};
