// Home page
// script.js

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('{% url \'index\' %}', '');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== HERO TEXT FADE-IN ANIMATION =====
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero h2');
    const heroPara = document.querySelector('.hero p');
    
    heroText.style.opacity = 0;
    heroPara.style.opacity = 0;

    setTimeout(() => {
        heroText.style.transition = 'opacity 1.5s ease-in';
        heroText.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        heroPara.style.transition = 'opacity 1.5s ease-in';
        heroPara.style.opacity = 1;
    }, 1500);
});

// ===== OPTIONAL: HERO BACKGROUND SLIDESHOW =====
/*
const hero = document.querySelector('.hero');
const images = [
    '{% static "images/bg1.jpg" %}',
    '{% static "images/bg2.jpg" %}',
    '{% static "images/bg3.jpg" %}'
];
let current = 0;

setInterval(() => {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
}, 5000); // changes every 5 seconds
*/

// ===== SPORTS COURT PAGE ENHANCEMENTS =====
document.addEventListener("DOMContentLoaded", () => {

  // ----- Sports Courts Section -----
  const sportsSection = document.querySelector(".sports-courts-section");
  if (sportsSection) {
    const heading = sportsSection.querySelector("h2");

    // Fade-in effect for heading
    heading.style.opacity = 0;
    heading.style.transition = "opacity 1.5s";
    setTimeout(() => {
      heading.style.opacity = 1;
    }, 100);

    // Count sports courts dynamically
    const courts = document.querySelectorAll(".game-card").length;
    const countText = document.createElement("p");
    countText.textContent = `We currently offer ${courts} sports facilities for booking!`;
    countText.style.fontWeight = "bold";
    countText.style.color = "#007d83";
    countText.style.marginBottom = "20px";
    heading.after(countText);

  

    // Card animations (hover/click)
    const cards = document.querySelectorAll(".game-card");
    cards.forEach(card => {
      card.style.transition = "transform 0.3s, background 0.3s";

      card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.background = "#f17e1a";
      });

      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.background = "";
      });

      // Click highlight
      card.addEventListener("click", () => {
        card.style.background = "#FF9800";
        setTimeout(() => {
          card.style.background = "";
        }, 700);
      });

      // Image zoom hover
      const img = card.querySelector("img");
      img.style.transition = "transform 0.3s";
      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.08)";
      });
      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });
    });
  }

  // ----- Basketball / Court Section -----
  const courtSection = document.querySelector(".court-container");
  if (courtSection) {
    const img = courtSection.querySelector("img");
    const text = courtSection.querySelector(".court-text");
    const heading = text.querySelector("h2");
    const paragraph = text.querySelector("p");
    const button = text.querySelector(".book-btn");

    // Fade in image & text
    img.style.opacity = 0;
    img.style.transition = "opacity 1.5s, transform 0.5s";

    text.style.opacity = 0;
    text.style.transform = "translateX(50px)";
    text.style.transition = "opacity 1.5s, transform 1s";

    setTimeout(() => {
      img.style.opacity = 1;
      text.style.opacity = 1;
      text.style.transform = "translateX(0)";
    }, 200);

    // Image hover zoom
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.08)";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });

    // Button hover effect
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
      button.style.backgroundColor = "#004aad";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.backgroundColor = "#0077b6";
    });

    // Scroll reveal effect
    const revealElements = document.querySelectorAll(".court-container, .court-text, .book-btn");
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.9;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          el.style.opacity = 1;
          el.style.transform = "translateX(0)";
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }
});

  const form = document.getElementById('reservationForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const reservation = {
      id: Date.now(),
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      contact: document.getElementById('contact').value,
      venue: document.getElementById('venue').value,
      datetime: document.getElementById('datetime').value
    };
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    alert('Reservation saved!');
    form.reset();
  });

 document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('ratingModal');
    const closeBtn = document.getElementById('closeModal');

    // Open modal if reservation success exists
    const reservationSuccess = "{{ success|default_if_none:'' }}";
    if (reservationSuccess) {
        modal.style.display = 'block';
    }

    // Close modal when clicking the 'x'
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
