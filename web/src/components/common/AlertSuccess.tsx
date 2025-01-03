import React from 'react';

interface AlertSuccessProps {
  message: string;
  subMessage?: string;
}

const AlertSuccess = ({ message, subMessage }: AlertSuccessProps) => {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-medium">{message}</strong>
      {subMessage && <p className="text-sm mt-1">{subMessage}</p>}
    </div>
  );
};

export default AlertSuccess;