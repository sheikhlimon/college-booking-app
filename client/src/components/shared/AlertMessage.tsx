interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
  className?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, className }) => {
  const alertStyles = {
    error: 'bg-red-100 border border-red-400 text-red-700',
    success: 'bg-green-100 border border-green-400 text-green-700'
  };

  return (
    <div className={`${alertStyles[type]} px-4 py-3 rounded mb-6 ${className}`}>
      {message}
    </div>
  );
};

export default AlertMessage;