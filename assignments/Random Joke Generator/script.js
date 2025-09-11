const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const nextJokeBtn = document.getElementById("nextJoke");

async function fetchProgrammingJoke() {
  setupEl.textContent = "Loading...";
  punchlineEl.textContent = "";
  try {
    const res = await fetch(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const jokeArr = await res.json();
    const jokeObj = jokeArr[0];
    setupEl.textContent = jokeObj.setup;
    punchlineEl.textContent = jokeObj.punchline;
  } catch (error) {
    setupEl.textContent = "Sorry, couldn't fetch a joke!";
    punchlineEl.textContent = "";
    console.error(error);
  }
}

fetchProgrammingJoke();
nextJokeBtn.addEventListener("click", fetchProgrammingJoke);
