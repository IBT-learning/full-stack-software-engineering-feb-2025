const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const nextJokeBtn = document.getElementById("next-joke");

// Optional API fallback
const API_URL = "https://api.api-ninjas.com/v1/jokes?category=programming";
const API_KEY = "https://api.api-ninjas.com/v1/jokes"; // You can leave this blank if using local only

// Local list of programming jokes
const jokes = [
  "Why do programmers hate nature? It has too many bugs.",
  "A SQL query walks into a bar, walks up to two tables and says: 'Can I join you?'",
  "Why do Java programmers wear glasses? Because they don't see sharp.",
  "Why did the computer go to art school? Because it wanted to learn how to draw bugs!",
  "Why did the loop go to therapy? It couldn’t break out of its cycle.",
  "Why was the function so clingy? Because it had too many callbacks.",
  "I tried to catch some fog with JavaScript, but I mist.",
  "Why don't programmers like to go outside? The sunlight causes too many glares.",
  "Why did the coder drown? Because they couldn't float their variables.",
  "Why was the array so good at dating? It had great elements.",
  "Why don’t HTML and CSS ever fight? Because they always style things out.",
  "Why did the software engineer leave the party? Because he had a class in the morning.",
  "Why did the website go to therapy? Too many unresolved requests.",
  "What’s the object-oriented way to become wealthy? Inheritance.",
  "Why did the programmer get lost in the jungle? He used a deprecated map.",
    "Why do programmers prefer dark mode? Because the light attracts bugs.",
  "A programmer’s wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves of bread.",
  "Why do Java developers wear glasses? Because they can't C#.",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "To understand recursion, you must first understand recursion.",
  "Why was the JavaScript developer sad? Because he didn't 'null' his feelings.",
  "Why did the developer go broke? Because he used up all his cache.",
  "In order to understand what recursion is, you must first understand what recursion is.",
  "How many programmers does it take to change a light bulb? None – that’s a hardware problem.",
  "Why do Python developers not need glasses? Because they have clear syntax.",
  "What's a programmer’s favorite hangout place? The Foo Bar.",
  "Why do programmers hate nature? It has too many bugs.",
  "I told my computer I needed a break, and it said 'No problem. I’ll go to sleep.'",
  "What do you call a programmer from Finland? Nerdic.",
  "Why couldn't the programmer quit his job? Because he didn’t have a break statement.",
  "How do functions break up? They stop calling each other!",
  "I would tell you a joke about UDP... but you might not get it.",
  "I tried to write a joke in Java, but I got an Exception.",
  "Why did the computer cross the road? To fetch data from the other side.",
  "Why did the JavaScript file break up with HTML? Because it felt ignored in the DOM."
];

// Function to show a random local joke
function showLocalJoke() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  const parts = joke.split(/(?<=[.?!])\s+/);
  setupEl.textContent = parts[0] || "Here's a joke:";
  punchlineEl.textContent = parts[1] || "";
  animateJoke();
}

// Optional: Fetch from API if needed
async function fetchJokeFromAPI() {
  try {
    const res = await fetch(API_URL, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    const joke = data[0].joke;
    const parts = joke.split(/(?<=[.?!])\s+/);
    setupEl.textContent = parts[0];
    punchlineEl.textContent = parts[1];
    animateJoke();
  } catch {
    // fallback to local jokes
    showLocalJoke();
  }
}

// Animate joke box
function animateJoke() {
  const box = document.querySelector(".joke-box");
  box.classList.add("animate");
  setTimeout(() => box.classList.remove("animate"), 400);
}

// Click handler
nextJokeBtn.addEventListener("click", showLocalJoke);

// Load one on page load
showLocalJoke();
