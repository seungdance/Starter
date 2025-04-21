// Load YouTube API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    videoId: "j3nJ7iu8f8Q", // Your video ID
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "j3nJ7iu8f8Q", // Required for looping
      controls: 0,
      showinfo: 0,
      rel: 0,
      enablejsapi: 1,
      modestbranding: 1,
      mute: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.mute(); // Ensure video is muted
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo(); // Restart if ended
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Elements to animate
  const animatedElements = document.querySelectorAll(`
        .animate-hidden,
        .project-feature,
        .project-image-container,
        .bio-content,
        .bio-photo,
        section h2
    `);

  // Intersection Observer options
  const options = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.classList.add("animate-visible");

        // Special handling for project features
        if (entry.target.classList.contains("project-feature")) {
          const imageContainer = entry.target.querySelector(".project-image-container");
          if (imageContainer) {
            setTimeout(() => {
              imageContainer.classList.add("animate-visible");
            }, 200); // Slight delay for image animation
          }
        }

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Start observing all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Add initial animations for elements above the fold
  setTimeout(() => {
    document.querySelectorAll(".animate-hidden").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("animate-visible");
      }
    });
  }, 100);
});
