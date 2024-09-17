var slideThumbnail = new Swiper('.slide-thumbnail', {
  slidesPerView: 5,
  direction: 'vertical',
  spaceBetween: 20,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      direction: "horizontal"
    },
    1150: {
      direction: "vertical"
    }
  }
});

var progressSlide = document.querySelector('.js-progress');
var slideHero = new Swiper('.slide-principal', {
  effect: 'fade',
  thumbs: {
    swiper: slideThumbnail
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  on: {
    init: function() {
      progressSlide.classList.remove("animate");
      progressSlide.classList.remove("active");
      progressSlide.classList.add("animate");
      progressSlide.classList.add("active");
    },
    slideChangeTransitionStart: function() {
      progressSlide.classList.remove("animate");
      progressSlide.classList.remove("active");
      progressSlide.classList.add("active");
    },
    slideChangeTransitionEnd: function() {
      progressSlide.classList.add("animate");
    }
  }
});

const allFilters = document.querySelectorAll(".js-nav-games li a");
const tabPane = document.querySelectorAll(".tab-pane-games");

allFilters.forEach((filter, index) => {
  filter.addEventListener("click", (event) => {
    event.preventDefault();

    if (!filter.classList.contains("active")) {
      document.querySelector(".active")?.classList.remove("active");
      allFilters.forEach(filterBtn => filterBtn.classList.remove("active"));
      
      filter.classList.add("active");

      tabPane.forEach(tab => {
        tab.classList.remove("active");
      })

      tabPane[index].classList.add("active");
    }
  });
});

const btnOpenModal = document.querySelector(".js-open-modal");
const btnOpenRegisterModal = document.querySelector(".js-open-register-modal");
const btnMobileOpenModal = document.querySelector(".js-mobile-open-modal");
const btnMobileOpenRegisterModal = document.querySelector(".js-mobile-open-register-modal");
const modal = document.querySelector(".modal");
const registerModal = document.querySelector(".modal.register");
const btnCloseModal = document.querySelector(".close");
const btnCloseRegisterModal = document.querySelector(".close.register");
const overlay = document.querySelectorAll(".overlay");
const btnMenu = document.querySelectorAll(".js-btn-menu");
const btnSiteMenuMobile = document.querySelectorAll(".js-btn-site-menu-mobile");
const siteMenus = document.querySelectorAll(".js-menu");
const activeSiteMenu = document.querySelector(".js-menu.active");
const btnMenuMobile = document.querySelector(".js-btn-menu-mobile");
const menuMobile = document.querySelector(".js-menu-mobile");
const overlayMenuMobile = document.querySelector(".js-menu-mobile-overlay");

btnOpenModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleModalLogin();
});

btnMobileOpenModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleModalLogin();
});

btnOpenRegisterModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleRegisterModalLogin();
});

btnMobileOpenRegisterModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleRegisterModalLogin();
});

btnCloseModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleModalLogin();
});

btnCloseRegisterModal.addEventListener("click", (event) => {
  event.preventDefault();

  toggleRegisterModalLogin();
});

overlay.forEach(over => {
  over.addEventListener("click", (event) => {
    event.preventDefault();
  
    closeModals();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModals();
  }
});

btnMenuMobile.addEventListener("click", () => {
  closeAllSiteMenus();
  toggleMenuMobile();
});

overlayMenuMobile.addEventListener("click", toggleMenuMobile);

onClickOutside(activeSiteMenu, () => {
  console.log("clicado fora!");
  closeAllSiteMenus();
});

siteMenus.forEach(itemMenu => {
  itemMenu.addEventListener("click", () => console.log("MENU CLICADO!"));
  itemMenu.addEventListener("mouseleave", () => console.log("MOUSELEAVE!"));
  itemMenu.addEventListener("blur", () => console.log("BLUR!"));
  itemMenu.addEventListener("mouseout", () => console.log("MOUSEOUT!"));
});

btnMenu.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    siteMenus.forEach(itemMenu => {
      itemMenu.classList.remove("active");
      itemMenu.addEventListener("mouseleave", () => {
        itemMenu.classList.remove("active");
        btnMenu.forEach((btn) => {
          btn.classList.remove("active");
        });
      });
    });

    btnMenu.forEach((btn) => {
      btn.classList.remove("active");
    });
    
    btn.classList.add("active");
    siteMenus[index].classList.add("active");
  });
});

btnSiteMenuMobile.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    siteMenus.forEach(itemMenu => {
      itemMenu.classList.remove("active");
      itemMenu.addEventListener("mouseleave", () => {
        itemMenu.classList.remove("active");
        btnSiteMenuMobile.forEach((btn) => {
          btn.classList.remove("active");
        });
      });
    });

    btnSiteMenuMobile.forEach((btn) => {
      btn.classList.remove("active");
    });
    
    toggleMenuMobile();

    btn.classList.add("active");
    siteMenus[index].classList.add("active");
    siteMenus[index].focus();
  });
});


function closeModals() {
  modal.classList.remove("active");
  registerModal.classList.remove("active");
}

function toggleMenuMobile() {
  menuMobile.classList.toggle("opened");
}

function toggleModalLogin() {
  modal.classList.toggle("active");
}

function toggleRegisterModalLogin() {
  registerModal.classList.toggle("active");
}

function closeAllSiteMenus() {
  siteMenus.forEach(itemMenu => itemMenu.classList.remove("active"));
}

function closeActiveSiteMenu() {
  activeSiteMenu.classList.remove("active");
}

function onClickOutside(element, callback) {
  document.addEventListener("click", e => {
    if (element && !element.contains(e.target)) {
      callback();
    }
  });
};
