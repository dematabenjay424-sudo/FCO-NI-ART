const exploreButton = document.querySelector(".hero-button");

if (exploreButton) {
  exploreButton.addEventListener("click", function (event) {
    event.preventDefault();

    const gallery = document.querySelector("#gallery");

    if (gallery) {
      gallery.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

const artCards = document.querySelectorAll(".art-card");

if (artCards.length > 0) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  artCards.forEach(function (card) {
    observer.observe(card);
  });
}

const nav = document.querySelector("nav");

if (nav) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

const artworkButtons = document.querySelectorAll(".view-artwork");

const artModal = document.querySelector("#artModal");
const modalClose = document.querySelector("#modalClose");

const modalImage = document.querySelector("#modalImage");
const modalVideo = document.querySelector("#modalVideo");
const modalTitle = document.querySelector("#modalTitle");
const modalArtist = document.querySelector("#modalArtist");
const modalDetails = document.querySelector("#modalDetails");
const modalDescription = document.querySelector("#modalDescription");

if (artModal && modalClose) {
  artworkButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (modalTitle) {
        modalTitle.textContent = button.dataset.title;
      }

      if (modalArtist) {
        modalArtist.textContent = button.dataset.artist;
      }

      if (modalDetails) {
        modalDetails.textContent =
          button.dataset.year + " • " + button.dataset.material;
      }

      if (modalDescription) {
        modalDescription.textContent = button.dataset.description;
      }

      if (button.dataset.video && modalVideo) {
        modalVideo.src = button.dataset.video;
        modalVideo.poster = button.dataset.poster || "";
        modalVideo.style.display = "block";

        if (modalImage) {
          modalImage.style.display = "none";
          modalImage.src = "";
        }
      } else if (modalImage && button.dataset.image) {
        modalImage.src = button.dataset.image;
        modalImage.alt = button.dataset.title + " by " + button.dataset.artist;
        modalImage.style.display = "block";

        if (modalVideo) {
          modalVideo.pause();
          modalVideo.removeAttribute("src");
          modalVideo.load();
          modalVideo.style.display = "none";
        }
      }

      artModal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", function () {
    artModal.classList.remove("active");

    if (modalVideo) {
      modalVideo.pause();
    }
  });

  artModal.addEventListener("click", function (event) {
    if (event.target === artModal) {
      artModal.classList.remove("active");

      if (modalVideo) {
        modalVideo.pause();
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      artModal.classList.remove("active");

      if (modalVideo) {
        modalVideo.pause();
      }
    }
  });
}

const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdown = document.querySelector(".dropdown");

if (dropdownBtn && dropdown) {
  /* OPEN / CLOSE USING ARROW ONLY */
  dropdownBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });

  const dropdownLinks = dropdown.querySelectorAll(".dropdown-menu a");

  dropdownLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      dropdown.classList.remove("active");
    });
  });
}
