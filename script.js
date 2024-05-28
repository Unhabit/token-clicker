let tokenCounter = 0;
let tokensPerClick = 1;
let buyMultiplier = 1;
const tokenCounterSpan = document.getElementById('token-counter');

document.getElementById('clickerButton').addEventListener('click', () => {
    tokenCounter += tokensPerClick;
    tokenCounterSpan.textContent = tokenCounter;
    // Adding scaling effect
    document.getElementById('clickerimg').style.transform = 'scale(0.7)';
    setTimeout(() => {
        document.getElementById('clickerimg').style.transform = 'scale(1)';
    }, 100); // Adjust the time for the scaling animation
});

// Code for upgrades
const upgrades = {
    upgrade1: { price: 30, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count', rate: 1 },
    upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count', rate: 4 },
    upgrade3: { price: 1000, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count', rate: 10 },
    upgrade4: { price: 5000, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count', rate: 40 },
    upgrade5: { price: 13000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count', rate: 100 },
    upgrade6: { price: 15, count: 0, priceSpan: 'upgrade6-price', countSpan: 'upgrade6-count', rate: 0, clickBonus: 1 } // Adding click bonus for upgrade6
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

        // Apply click bonus if the upgrade has one
        if (upgrades[upgrade].clickBonus) {
            tokensPerClick += upgrades[upgrade].clickBonus * quantity;
        }

        document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;
    } else {
        alert(`Not enough tokens! You need at least ${totalPrice} tokens to buy ${quantity} of this upgrade.`);
    }
}

// Initialize the default multiplier button as active and update prices
updateMultiplierButtons();
updatePrices();

// Set interval for generating tokens from upgrades
setInterval(() => {
    let tokensPerSecond = 0;
    for (const upgrade in upgrades) {
        tokensPerSecond += upgrades[upgrade].count * upgrades[upgrade].rate;
    }
    tokenCounter += tokensPerSecond;
    tokenCounterSpan.textContent = tokenCounter;
}, 1000);
