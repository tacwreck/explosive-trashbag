let counter = 0;
let multiplier = 1;
let multiplierCost = 10;
let autoClickerAvailable = false;
let merchantCountdown = 1800; // 30 minutes in seconds
let merchantActiveTime = 180; // 3 minutes in seconds

// Elements
const counterDisplay = document.getElementById("counter");
const boomText = document.getElementById("boomText");
const multiplierDisplay = document.getElementById("multiplier");
const multiplierCostDisplay = document.getElementById("multiplierCost");
const merchantSection = document.getElementById("merchantSection");
const merchantTimerDisplay = document.getElementById("merchantTimer");

// Trash bag click
document.getElementById("trashBag").addEventListener("click", () => {
  counter += multiplier;
  counterDisplay.textContent = counter;
  
  // Show "BOOM!" text briefly
  boomText.style.opacity = 1;
  setTimeout(() => boomText.style.opacity = 0, 200);
});

// Multiplier Upgrade
document.getElementById("multiplierUpgrade").addEventListener("click", () => {
  if (counter >= multiplierCost) {
    counter -= multiplierCost;
    multiplier++;
    multiplierCost *= 2;
    counterDisplay.textContent = counter;
    multiplierDisplay.textContent = multiplier;
    multiplierCostDisplay.textContent = multiplierCost;
  } else {
    alert("Not enough points!");
  }
});

// Merchant Auto-Clicker
document.getElementById("buyAutoClicker").addEventListener("click", () => {
  if (counter >= 100 && autoClickerAvailable) {
    counter -= 100;
    counterDisplay.textContent = counter;
    
    // Activate auto-click every second
    setInterval(() => {
      counter += multiplier;
      counterDisplay.textContent = counter;
    }, 1000);
    
    // Hide merchant after purchase
    autoClickerAvailable = false;
    merchantSection.classList.add("hidden");
  } else {
    alert("Not enough points or merchant is not available!");
  }
});

// Merchant Timer
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateMerchantTimer() {
  if (merchantCountdown > 0) {
    merchantCountdown--;
    merchantTimerDisplay.textContent = `Merchant in: ${formatTime(merchantCountdown)}`;
  } else if (merchantActiveTime > 0) {
    autoClickerAvailable = true;
    merchantSection.classList.remove("hidden");
    merchantTimerDisplay.textContent = `Merchant leaves in: ${formatTime(merchantActiveTime)}`;
    merchantActiveTime--;
  } else {
    autoClickerAvailable = false;
    merchantSection.classList.add("hidden");
    merchantCountdown = 1800; // Reset to 30 minutes
    merchantActiveTime = 180; // Reset to 3 minutes
  }
}

// Update the timer every second
setInterval(updateMerchantTimer, 1000);
 
