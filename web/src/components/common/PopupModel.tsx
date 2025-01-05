import React from "react";

interface PopupModelProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  type: 'delete' | 'deleteSuccess' | 'saveSuccess';
  contactName?: string;
}

const PopupModel: React.FC<PopupModelProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  type,
  contactName,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black/50">
      <div className="flex flex-col justify-center bg-white p-4 rounded-lg md:rounded-3xl md:px-4 py-4 text-primary h-56 w-3/5">
        {type === 'delete' && (
          <p className="text-[#083F46] mb-4 flex justify-center text-[30px]">
            Do you want to delete the contact "{contactName}"?
          </p>
        )}
        {type === 'deleteSuccess' && (
          <p className="text-[#083F46] mb-4 flex justify-center text-[30px]">
            Your contact has been deleted successfully!
          </p>
        )}
        {type === 'saveSuccess' && (
          <p className="text-[#083F46] mb-4 flex justify-center text-[30px]">
            Your contact has been saved successfully!
          </p>
        )}

        <div className="flex justify-center">
          {type === 'delete' ? (
            <>
              <button
                className="px-10 py-2 mr-2 bg-[#083F46] text-white rounded-full text-[28px]"
                onClick={onConfirm}
              >
                Yes
              </button>
              <button
                className="px-10 py-2 rounded-full border-[#083F46] border-2 text-[28px]"
                onClick={onCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-10 py-2 bg-[#083F46] text-white rounded-full text-[28px]"
              onClick={onConfirm}
            >
              Okay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModel;