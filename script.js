const baseUrl = "https://myproject.com";
const myUrl = new URL("/dashboard", baseUrl); 

// Sticky Header
const header = document.getElementById("stickyHeader");
const heroHeight = document.querySelector(".fold-section").offsetHeight;
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
  let current = window.scrollY;

  if (current > heroHeight) {
    if (current > lastScroll) {
      header.classList.add("show"); // scrolling down
    } else {
      header.classList.remove("show"); // scrolling up
    }
  } else {
    header.classList.remove("show");
  }

  lastScroll = current;
});


// Carousel Scroll
// Elements
const mainImage = document.getElementById("mainImage");
const lens = document.getElementById("lens");
const result = document.getElementById("zoomResult");
const thumbs = document.querySelectorAll(".thumb");

// Thumbnail Click
thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    thumb.classList.add("active");

    mainImage.src = thumb.src;
  });
});

// Carousel scroll
const thumbContainer = document.querySelector(".thumbnails");

document.querySelector(".next").onclick = () => {
  thumbContainer.scrollBy({ left: 100, behavior: "smooth" });
};

document.querySelector(".prev").onclick = () => {
  thumbContainer.scrollBy({ left: -100, behavior: "smooth" });
};


// Zoom Effect (Single Preview)
mainImage.addEventListener("mouseenter", () => {
  lens.style.display = "block";
  result.style.display = "block";
  result.style.backgroundImage = `url(${mainImage.src})`;
});

mainImage.addEventListener("mousemove", (e) => {
  const rect = mainImage.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  // Move lens
  lens.style.left = (e.pageX - 60) + "px";
  lens.style.top = (e.pageY - 60) + "px";

  // Zoom position
  let fx = (x / rect.width) * 100;
  let fy = (y / rect.height) * 100;

  result.style.backgroundSize = "200%";
  result.style.backgroundPosition = `${fx}% ${fy}%`;
});

mainImage.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  result.style.display = "none";
});