import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left' | 'right';
  size?: '2xl' | '3xl' | '4xl';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  align = 'center',
  size = '3xl'
}) => {
  const sizeClasses = {
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const alignClasses = {
    'center': 'text-center',
    'left': 'text-left',
    'right': 'text-right'
  };

  return (
    <h2 className={`${sizeClasses[size]} font-bold text-gray-900 mb-8 ${alignClasses[align]} ${className}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
