document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("songForm");
  const nameInput = document.getElementById("personName");
  const formSection = document.getElementById("formSection");
  const successSection = document.getElementById("successSection");
  const scrollIndicator = document.querySelector(".scroll-down");
  const aboutSection = document.querySelector(".about-section");

  let cachedName = "";
  let formSubmitted = false;

  nameInput.addEventListener("input", () => cachedName = nameInput.value.trim());

  form.addEventListener("submit", (e) => {
    formSubmitted = true;

    // hide scroll and about
    if(scrollIndicator) scrollIndicator.style.display = "none";
    if(aboutSection) aboutSection.style.display = "none";

    setTimeout(() => {
      formSection.style.display = "none";

 const msg = cachedName
  ? `Thanks, ${cachedName}! Enjoy the music 🎶`
  : `Thanks for the song suggestion! 🎤🎸`;

successSection.innerHTML = `
  <h2>✅ Request Received!</h2>
  <p>${msg}</p>
  <div class="socials">
    <a href="https://instagram.com/philbertbrothers" target="_blank" class="social-btn insta">
      📸 Follow on Instagram
    </a>
    <button id="backBtn" class="back-btn">⬅ Back</button>
  </div>
`;

successSection.style.display = "flex";
requestAnimationFrame(() => successSection.classList.add("show"));

      successSection.style.display = "flex";
      requestAnimationFrame(() => successSection.classList.add("show"));
      launchConfetti();

      form.reset();
      cachedName = "";
    }, 300);
  });

  function launchConfetti() {
    for(let i=0;i<80;i++){
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random()*100+"vw";
      c.style.backgroundColor = `hsl(${Math.random()*360},100%,60%)`;
      c.style.animationDuration = 2+Math.random()*2+"s";
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),4000);
    }
  }

  if(scrollIndicator){
    scrollIndicator.addEventListener("click", ()=> {
      document.getElementById("about").scrollIntoView({behavior:"smooth"});
    });
  }

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", ()=>{
    if(formSubmitted) return;
    const currentScrollY = window.scrollY;
    if(scrollIndicator){
      if(currentScrollY > lastScrollY && currentScrollY>20) scrollIndicator.classList.add("hide");
      else scrollIndicator.classList.remove("hide");
    }
    lastScrollY = currentScrollY;
  });

  
// BACK BUTTON RESET
document.addEventListener("click", (e) => {
  if (e.target.id === "backBtn") {

    // fade out success
    successSection.classList.remove("show");

    setTimeout(() => {
      successSection.style.display = "none";

      // prepare form for animation
      formSection.style.display = "block";
      formSection.style.opacity = "0";
      formSection.style.transform = "translateY(20px)";

      // reset state
      formSubmitted = false;

      // restore scroll + about
      if (scrollIndicator) scrollIndicator.style.display = "block";
      if (aboutSection) aboutSection.style.display = "block";

      // animate form back in
      requestAnimationFrame(() => {
        formSection.style.transition = "all 0.4s ease";
        formSection.style.opacity = "1";
        formSection.style.transform = "translateY(0)";
      });

      // smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

    }, 400); // matches success fade duration
  }
});
});