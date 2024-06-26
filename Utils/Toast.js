import { toast, Zoom } from "react-toastify";

/**
 * todo : SucessToast function implement
 * @param {*} msg
 * @param {*} position
 * @param {*} delay
 */

export function SucessToast(
  msg = "Sucess message",
  position = "top-center",
  delay = 4000,
) {
  toast.success(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
}

/**
 * todo : ErrorToast function implement
 * @param {*} msg
 * @param {*} position
 * @param {*} delay
 */

export function ErrorToast(
  msg = "Error message",
  position = "top-center",
  delay = 4000,
) {
  toast.error(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
}

/**
 * todo : InfoToast function implement
 * @param {*} msg
 * @param {*} position
 * @param {*} delay
 */

export function InfoToast(
  msg = "Info message",
  position = "top-center",
  delay = 4000,
) {
  toast.info(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
}
