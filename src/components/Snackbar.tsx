import { useEffect, useState } from 'react';
interface SnackbarProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Snackbar = ({ message, duration = 3000, onClose }: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="snackbar">
      <div className="snackbar-content">
        <span className="snackbar-message">{message}</span>
      </div>
    </div>
  );
}; 