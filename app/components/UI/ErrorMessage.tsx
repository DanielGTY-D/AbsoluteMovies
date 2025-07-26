const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p className="bg-rose-400 text-white py-2 px-4 text-lg font-semibold">
        {children}
      </p>
    </>
  );
};

export default ErrorMessage;
