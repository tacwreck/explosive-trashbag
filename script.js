// index.js

let clickCount = 0;
let timerSeconds = 1800; // 30 minutes in seconds
let merchantActive = false;

function explode() {
    clickCount++;
    document.getElementById('clickCount').innerText = clickCount;
    alert('BOOM!'); // You can add a sound effect here
}

function updateMerchantTimer() {
    if (timerSeconds > 0) {
        timerSeconds--;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        if (!merchantActive) {
            alert('The merchant has arrived!');
            merchantActive = true;
            setTimeout(() => {
                alert('The merchant has left!');
                merchantActive = false;
                timerSeconds = 1800; // Reset timer
            }, 180000); // Merchant stays for 3 minutes (180000 ms)
        }
    }
}

function buyAutoClicker() {
    if (clickCount >= 10) { // Example price
        clickCount -= 10; // Deduct points for purchase
        document.getElementById('clickCount').innerText = clickCount;
        alert('Auto-Clicker purchased!'); // Implement auto-click functionality
    } else {
        alert('Not enough clicks to buy an Auto-Clicker!');
    }
}

// Update the timer every second
setInterval(updateMerchantTimer, 1000);
