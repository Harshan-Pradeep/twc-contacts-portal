interface AlertErrorProps {
  message: string;
}

const AlertError = ({ message }: AlertErrorProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default AlertError;