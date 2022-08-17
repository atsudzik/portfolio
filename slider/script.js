const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");
const mainSlide = document.querySelector(".main-slide");

const slidesCount = mainSlide.querySelectorAll("div").length;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

let activeSlideAction = 0;

downBtn.addEventListener("click", () => {
  changeSlide("down");
});

upBtn.addEventListener("click", () => {
  changeSlide("up");
});

function changeSlide(direction) {
  if (direction === "up") {
    activeSlideAction++;
    if (activeSlideAction === slidesCount) {
      activeSlideAction = 0;
    }
  } else if (direction === "down") {
    activeSlideAction--;
    if (activeSlideAction < 0) {
      activeSlideAction = slidesCount - 1;
    }
  }

  const height = container.clientHeight;

  mainSlide.style.transform = `translateY(-${activeSlideAction * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideAction * height}px)`;
}
