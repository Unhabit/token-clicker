let tokenCounter = 0;
let buyMultiplier = 1;
const tokenCounterSpan = document.getElementById('token-counter');

document.getElementById('clickerButton').addEventListener('click', () => {
    tokenCounter++;
    tokenCounterSpan.textContent = tokenCounter;
    // Adding scaling effect
    document.getElementById('clickerimg').style.transform = 'scale(0.7)';
    setTimeout(() => {
        document.getElementById('clickerimg').style.transform = 'scale(1)';
    }, 100); // Adjust the time for the scaling animation
});

// Code for upgrades
const upgrades = {
    upgrade1: { price: 20, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count' },
    upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count' },
    upgrade3: { price: 1000, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count' },
    upgrade4: { price: 5000, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count' },
    upgrade5: { price: 13000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count' }
};

function setMultiplier(multiplier) {
    buyMultiplier = multiplier;
    updateMultiplierButtons();
    updatePrices();
}

function updateMultiplierButtons() {
    const buttons = document.querySelectorAll('.buy-multiples button');
    buttons.forEach(button => {
        if (parseInt(button.innerText.replace('x', '')) === buyMultiplier) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function updatePrices() {
    for (const upgrade in upgrades) {
        const priceSpan = document.getElementById(upgrades[upgrade].priceSpan);
        priceSpan.textContent = `Price: ${upgrades[upgrade].price * buyMultiplier}`;
    }
}

function buyItem(upgrade) {
    let quantity = buyMultiplier;
    let totalPrice = upgrades[upgrade].price * quantity;
    if (tokenCounter >= totalPrice) {
        tokenCounter -= totalPrice;
        tokenCounterSpan.textContent = tokenCounter;
        upgrades[upgrade].count += quantity;

        document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;
    } else {
        alert(`Not enough tokens! You need at least ${totalPrice} tokens to buy ${quantity} of this upgrade.`);
    }
}

// Initialize the default multiplier button as active and update prices
updateMultiplierButtons();
updatePrices();
