interface CardProps {
  variant?: 'default' | 'hoverable' | 'overflow';
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ variant = 'default', className, children }) => {
  const variants = {
    default: 'bg-white rounded-lg shadow-md p-6',
    hoverable: 'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow',
    overflow: 'bg-white rounded-lg shadow-md overflow-hidden'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;