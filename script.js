// Initialize token counter and span
let tokenCounter = 0;
const tokenCounterSpan = document.getElementById('token-counter');

// Clicker button event listener
document.getElementById('clickerButton').addEventListener('click', () => {
  tokenCounter++;
  tokenCounterSpan.textContent = tokenCounter;
  // Adding scaling effect
  document.getElementById('clickerimg').style.transform = 'scale(0.7)';
  setTimeout(() => {
    document.getElementById('clickerimg').style.transform = 'scale(1)';
  }, 100); // Adjust the time for the scaling animation
});

// Upgrades configuration
const upgrades = {
  upgrade1: { price: 20, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count' },
  upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count' },
  upgrade3: { price: 1000, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count' },
  upgrade4: { price: 5000, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count' },
  upgrade5: { price: 13000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count' }
};

// Function to handle buying upgrades
function buyItem(upgrade, quantity) {
  const totalPrice = upgrades[upgrade].price * quantity;
  if (tokenCounter >= totalPrice) {
    tokenCounter -= totalPrice;
    tokenCounterSpan.textContent = tokenCounter;
    upgrades[upgrade].count += quantity;
    document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;
  } else {
    alert('Not enough tokens! You need at least ' + totalPrice + ' tokens to buy ' + quantity + ' of this upgrade.');
  }
}
