// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 1s ease-out forwards";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add hover effects to portfolio items
document.querySelectorAll(".portfolio-item, .work-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add loading animation for iframes
document.addEventListener("DOMContentLoaded", function() {
  const iframes = document.querySelectorAll("iframe");
  
  iframes.forEach((iframe) => {
    iframe.addEventListener("load", function() {
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    });
    
    // Set initial state
    iframe.style.opacity = "0";
    iframe.style.transform = "scale(0.95)";
    iframe.style.transition = "all 0.5s ease";
  });
});

// Add click tracking for external links
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", function() {
    console.log("External link clicked:", this.href);
  });
});

// Add contact info click to copy functionality
document.querySelectorAll(".contact-item p").forEach((item) => {
  item.addEventListener("click", function() {
    const text = this.textContent;
    
    // Check if it's an email or phone number
    if (text.includes("@") || text.includes("+")) {
      navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const originalText = this.textContent;
        this.textContent = "Copied!";
        this.style.color = "#4CAF50";
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = "";
        }, 2000);
      }).catch(() => {
        console.log("Failed to copy text");
      });
    }
  });
  
  // Add cursor pointer for clickable items
  const text = item.textContent;
  if (text.includes("@") || text.includes("+")) {
    item.style.cursor = "pointer";
    item.title = "Click to copy";
  }
});
