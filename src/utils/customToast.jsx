import { toast } from "react-toastify";

const customToast = (message, action) => {
  toast.info(
    <div>
      <p>{message}</p>
      <div className="mt-2 flex gap-2 justify-center">
        <button
          className="btn btn-sm btn-error"
          onClick={() => {
            toast.dismiss();
            action();
          }}
        >
          Yes
        </button>
        <button className="btn btn-sm" onClick={() => toast.dismiss()}>
          No
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-right",
      className: "custom-toast",
    }
  );
};

export default customToast;
