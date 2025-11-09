// =====================
// SPEARFISHING ADVENTURE
// =====================

const storyDiv = document.getElementById("story");
const body = document.body;

// =====================
// HELPER FUNCTIONS
// =====================
function display(text, options = []) {
  storyDiv.innerHTML = "";
  const sentences = text.split(". ").filter(s => s.length > 0);

  sentences.forEach((sentence, index) => {
    const p = document.createElement("p");
    p.textContent = sentence + (index < sentences.length - 1 ? "." : "");
    p.style.opacity = 0;
    p.style.animation = `fadeIn 2s forwards`;
    p.style.animationDelay = `${index * 2.5}s`;
    storyDiv.appendChild(p);
  });

  options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = opt.action;
    btn.style.opacity = 0;
    btn.style.animation = `fadeIn 2s forwards`;
    btn.style.animationDelay = `${sentences.length * 2.5 + index * 1.5}s`;
    storyDiv.appendChild(btn);
  });

  storyDiv.scrollIntoView({ behavior: "smooth" });
}

// =====================
// TENSION EFFECTS
// =====================
function addTensionEffects() {
  body.classList.add("pulse");
  document.querySelectorAll("#story p").forEach(p => p.classList.add("pulse-text"));
  document.querySelectorAll("#story button").forEach(btn => btn.classList.add("pulse-button"));
}

function removeTensionEffects() {
  body.classList.remove("pulse");
  document.querySelectorAll("#story p").forEach(p => p.classList.remove("pulse-text"));
  document.querySelectorAll("#story button").forEach(btn => btn.classList.remove("pulse-button"));
}

// =====================
// TITLE SCREEN
// =====================
function showTitleScreen() {
  storyDiv.innerHTML = "";
  removeTensionEffects();

  const title = document.createElement("h1");
  title.textContent = "Spearfishing Adventure";
  title.style.opacity = 0;
  title.style.animation = "fadeIn 3s forwards";
  storyDiv.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.textContent = "Explore the ocean, encounter reefs and sharks, and make your choices wisely!";
  subtitle.style.opacity = 0;
  subtitle.style.animation = "fadeIn 3s forwards";
  subtitle.style.animationDelay = "2s";
  storyDiv.appendChild(subtitle);

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Adventure";
  startBtn.style.opacity = 0;
  startBtn.style.animation = "fadeIn 2s forwards";
  startBtn.style.animationDelay = "4s";
  startBtn.onclick = startAdventure;
  storyDiv.appendChild(startBtn);
}

// =====================
// ADVENTURE FLOW
// =====================
function startAdventure() {
  removeTensionEffects();
  const intro = [
    "You step off your boat into the Hawaiian waters, spear in hand",
    "The sun warms your back as fins cut through crystal-clear waves",
    "A vibrant coral reef appears below, shadows flit in the open water beyond"
  ];

  display(_.join(intro, ". "), [
    { text: "Dive into open water", action: diveDeeper },
    { text: "Explore the reef", action: exploreReef },
    { text: "Stay near the boat", action: stayNearBoat }
  ]);
}

function restartAdventure() {
  removeTensionEffects();
  display("Do you want to dive again?", [
    { text: "Yes", action: startAdventure },
    { text: "No", action: () => showTitleScreen() }
  ]);
}

// =====================
// DIVING FUNCTIONS
// =====================
function diveDeeper() {
  removeTensionEffects();
  try {
    const depth = _.random(10, 80);
    if (depth > 50 && _.random(0, 1)) throw new Error("A large shark charges toward you");

    const encounters = ["school of tuna", "giant manta ray", "sunken ship", "open blue"];
    const encounter = _.sample(encounters);

    display(`You dive to ${depth} feet. You see ${encounter}`, [
      { text: "Investigate it", action: () => handleEncounter(encounter) },
      { text: "Return to reef", action: exploreReef },
      { text: "Surface safely", action: surfaceAfterDive }
    ]);
  } catch (error) {
    storyDiv.classList.add("shake");
    setTimeout(() => storyDiv.classList.remove("shake"), 500);
    addTensionEffects();
    display(error.message, [
      { text: "Panic and swim away", action: sharkEncounter },
      { text: "Slowly and calmly ascend", action: driftOutToSea }
    ]);
  }
}

function handleEncounter(encounter) {
  removeTensionEffects();
  switch (encounter) {
    case "school of tuna":
      display("You catch a massive tuna. Everyone will be jealous of this catch!", [
        { text: "Leave the school of tuna", action: surfaceAfterDive },
        { text: "Follow the school of tuna", action: diveDeeper }
      ]);
      break;
    case "giant manta ray":
      display("A giant manta ray swims beneath you", [
        { text: "Follow it", action: deepMantaAdventure },
        { text: "Let it go", action: exploreReef }
      ]);
      break;
    case "sunken ship":
      display("You dive down towards the old ship. Its wooden hull is home to a large moray eel!", [
        { text: "Shoot the eel", action: surfaceAfterDive },
        { text: "Swim back up to surface", action: driftOutToSea }
      ]);
      break;
    default:
      display("The water is empty and vast", [
        { text: "Return to reef", action: exploreReef },
        { text: "Dive further into the blue", action: diveDeeper }
      ]);
      break;
  }
}

function deepMantaAdventure() {
  removeTensionEffects();
  display("Following the manta ray, you discover a hidden underwater cave filled with lobsters. You fill your bag with as many lobsters as you can carry! You safely surface and return home with a cooler filled! Nice!", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

// =====================
// REEF FUNCTIONS
// =====================
function exploreReef() {
  removeTensionEffects();
  const creatures = ["turtle", "octopus", "and lots of colorful reef fish"];
  const interesting = creatures.filter(c => c.length > 5);

  display(`Swimming over the reef, you spot: ${interesting.join(", ")}`, [
    { text: "Chase the octopus", action: () => display("The octopus squirts ink and escapes. You continue exploring", [{ text: "Keep exploring", action: reefRandomEncounter }]) },
    { text: "Follow the turtle", action: () => display("The turtle leads you to a hidden lava tube filled with sea urchins", [{ text: "Enter the lava tube", action: coveDiscovery }]) },
    { text: "Observe the rest of the animals quietly", action: reefObservation }
  ]);
}

function reefRandomEncounter() {
  removeTensionEffects();
  const events = ["a friendly dolphin swims by", "a stingray appears nearby", "you spot a shiny pearl in the sand"];
  const event = _.sample(events);
  display(`While exploring, ${event}`, [
    { text: "Poke it with your spear", action: restartAdventure },
    { text: "Observe it carefully", action: exploreReef }
  ]);
}

function reefObservation() {
  removeTensionEffects();
  display("You float quietly above the reef, enjoying its beauty and the calm waters. No good eating fish today!", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

function stayNearBoat() {
  removeTensionEffects();
  display("You stay near the boat, but the current begins to pull you away", [
    { text: "Let the current take you", action: driftOutToSea },
    { text: "Try to fight the current", action: reefTossed }
  ]);
}

// =====================
// SPECIAL EVENTS / ENDINGS
// =====================
function sharkEncounter() {
  addTensionEffects();
  const sharkTypes = ["tiger shark", "oceanic whitetip", "great white"];
  const shark = _.sample(sharkTypes);

  display(`A ${shark} circles nearby. What do you do?`, [
    { text: "Fight the shark", action: () => {
        removeTensionEffects();
        display("You attempt to fight the shark with your spear. You've seen enough instagram videos to know sharks are like puppy dogs... Unfortunately you relied too much on social media. and the shark devours you. piece by piece. You did not survive... ", [{ text: "Accept your fate", action: restartAdventure }]);
      }
    },
    { text: "Swim away", action: driftOutToSea }
  ]);
}

function driftOutToSea() {
  addTensionEffects();
  const distance = _.random(2, 15);
  if (distance > 10) {
    display(`The current drags you ${distance} miles out. Night falls and the ocean feels endless. Eventually, you are eaten by oceanic sharks. You did not survive...`, [
      { text: "Accept your fate", action: () => { removeTensionEffects(); restartAdventure(); } }
    ]);
  } else {
    display(`The current carries you ${distance} miles, but the island is still visible`, [
      { text: "Swim to land", action: () => { removeTensionEffects(); landRescue(); } },
      { text: "Wait for rescue", action: () => display("A passing boat ignores you despite your best efforts of trying to get its attention. You then realize you will not be making it home tonight, or ever for that matter. You did not survive...", [{ text: "Accept your fate", action: () => { removeTensionEffects(); restartAdventure(); } }]) }
    ]);
  }
}

function reefTossed() {
  removeTensionEffects();
  display("A sudden wave throws you onto the coral reef, scraping your arms and legs. You manage to crawl up onto the rocky shore. You are embarresed as the tourists on the shore start to point and laugh. You decide its best to retrun home. Empty handed...", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

function coveDiscovery() {
  removeTensionEffects();
  display("You enter the hidden cove and find colorful fish, vibrant coral, and small treasures. After exploring safely, you return to your boat feeling accomplished and relaxed", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

function landRescue() {
  removeTensionEffects();
  display("You swim to the shore, exhausted but safe. You rest and reflect on your adventure, learning the ocean's power and beauty. Adventure concludes safely, but empty handed...", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

function surfaceAfterDive() {
  removeTensionEffects();
  display("You surface safely, carrying memories of your dive and the creatures you encountered. You didn’t shoot any fish this time, but you learned valuable skills. Adventure ends for today", [
    { text: "Accept your fate", action: restartAdventure }
  ]);
}

// =====================
// START GAME WITH TITLE SCREEN
// =====================
showTitleScreen();
