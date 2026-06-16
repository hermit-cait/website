
/*** TABLE OF CONTENTS: ***/

/* Make the menu button clickable */
/* Open menu, hide menu button and show close button */
/* Make the close button clickable */
/* Close menu, hide close button and show menu button again */
/* Ensures that the nav bar is always visible during resizing of viewport */
/* Clears contact form after sending */
/* Pulls project data from a JSON file */
/* Creates all the content which will contain the project data */

/* -------------------------------- */

// Make the menu button clickable
document.getElementById("navMenu").addEventListener("click", navShowMenu);
document.getElementById("navMenu").addEventListener("keydown", navShowMenu);

// Open menu, hide menu button and show close button
function navShowMenu() {
  document.getElementById("nav").style.transform = "scale(1, 1)";
  document.getElementById("nav1").style.opacity = "1";
  document.getElementById("nav2").style.opacity = "1";
  document.getElementById("nav3").style.opacity = "1";
  document.getElementById("nav4").style.opacity = "1";
  document.getElementById("nav5").style.opacity = "1";
  document.getElementById("navMenu").style.opacity = "0";
  document.getElementById("navClose").style.transform = "scale(1, 1)";
  document.getElementById("navClose").style.opacity = "1";
}

// Make the close button clickable
document.getElementById("navClose").addEventListener("click", navCloseMenu);
document.getElementById("navClose").addEventListener("keydown", navCloseMenu);

// Close menu, hide close button and show menu button again
function navCloseMenu() {
  document.getElementById("nav").style.transform = "scale(1, 0)";
  document.getElementById("navClose").style.opacity = "0";
  document.getElementById("navClose").style.transform = "scale(1, 0)";
  document.getElementById("navMenu").style.opacity = "1";
}

// When menu is opened in small viewport and then the window is enlarged the desktop nav would disappear so this ensures that the nav bar is always visible
mediaQueryDesktop = window.matchMedia("(min-width: 1200px)");
mediaQueryDesktop.addEventListener('change', function(media) {
  if (media.matches) {        
    document.getElementById("nav").style.transform = "scale(1, 1)";
    document.getElementById("navClose").style.opacity = "0";
    document.getElementById("navMenu").style.opacity = "1";
  }
  else {      
    document.getElementById("nav").style.transform = "scale(1, 0)";
  }
});

// Clears contact form after sending
window.onbeforeunload = () => {
  for(const form of document.getElementsByTagName('form')) {
    form.reset();
  }
}

// Pulls hero content from a JSON file
async function populate() {
  const requestURL = "/hero-content.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const cardsText = await response.text();
  const content = JSON.parse(cardsText);
  populateCards(content);
}

// Prepares all the hero content
function populateCards(obj) {
  const cardContainer = document.getElementById("cardContainer");
  const cards = obj.cards;
  for (const card of cards) {  
    // Creates a new card for hero content
    const article = document.createElement("article");
    const cardLink = document.createElement("a");
    const cardName = document.createElement("h3");
    const description = document.createElement("p");
    description.className = "description";

    // Adds card link to HTML
    cardLink.href = card.cardLink;

    // Adds class to link (to make whole card clickable)
    cardLink.classList.add('clickableCard');

    // Adds card name to HTML
    cardName.textContent = card.name;
  
    // Adds card decription to HTML
    description.textContent = card.description;

    // Adds card image to HTML
    let image = new Image();
    image.src = card.image;

    // Adds all the above HTML to the card element and pushes it to the UI
    article.appendChild(cardLink);
    article.appendChild(cardName);
    article.appendChild(image);
    article.appendChild(description);    
    cardContainer.appendChild(article);
  }
}
populate()
