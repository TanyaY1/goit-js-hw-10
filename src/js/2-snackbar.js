import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const successBtn = document.getElementById("success-btn");
const errorBtn = document.getElementById("error-btn");
const infoBtn = document.getElementById("info-btn");
const warningBtn = document.getElementById("warning-btn");

successBtn.addEventListener("click", () => {
  iziToast.success({
    title: "Success",
    message: "This is a success message",
    position: "topRight",
  });
});

errorBtn.addEventListener("click", () => {
  iziToast.error({
    title: "Error",
    message: "This is an error message",
    position: "topRight",
  });
});

infoBtn.addEventListener("click", () => {
  iziToast.info({
    title: "Info",
    message: "This is an info message",
    position: "topRight",
  });
});

warningBtn.addEventListener("click", () => {
  iziToast.warning({
    title: "Warning",
    message: "This is a warning message",
    position: "topRight",
  });
});
