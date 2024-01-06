import { toast } from 'react-toastify';

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notifySuccess = (message) => {
  toast.success(message, toastOptions);
};

export const notifyError = (message) => {
  toast.error(message, toastOptions);
};
