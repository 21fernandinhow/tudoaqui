import React, { useEffect, useState } from 'react';
interface SnackbarProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
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
      <div className="snackbar__content">
        <span className="snackbar__message">{message}</span>
      </div>
    </div>
  );
}; 