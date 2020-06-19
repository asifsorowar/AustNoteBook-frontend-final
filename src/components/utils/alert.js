import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const alert = (title, icon) => {
  return Swal.fire({
    title: `${title}`,
    icon: `${icon}`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};
