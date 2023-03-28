type ConatinerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ConatinerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`max-w-6xl mx-auto px-5 ${className}`}>{children}</div>
  );
};
