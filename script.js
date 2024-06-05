let bgMusic = new Howl({
    src: ["SFX/crickets.mp3"],
    autoplay: true,
    volume: 0.20,
    loop: true
});

function muteMusic() {
    bgMusic.pause();
}

let tokenSFX = new Howl({
    src: ["SFX/token.wav"],
    volume: 0.08
});

function playTokenSFX() {
    tokenSFX.play();
}

const upgradeSFX = {
    upgrade1: new Howl({ src: ["SFX/upgrade1.wav"], volume: 0.08 }),
    upgrade2: new Howl({ src: ["SFX/upgrade2.mp3"], volume: 0.08 }),
    upgrade3: new Howl({ src: ["SFX/upgrade3.mp3"], volume: 0.08 }),
    upgrade4: new Howl({ src: ["SFX/upgrade4.wav"], volume: 0.08 }),
    upgrade5: new Howl({ src: ["SFX/upgrade5.mp3"], volume: 0.08 }),
    upgrade6: new Howl({ src: ["SFX/upgrade6.mp3"], volume: 0.08 })
};

let tokenCounter = 0;
let tokensPerClick = 1;
let buyMultiplier = 1;
let rebirthCounter = 0;
let rebirthCost = 100000; // Initial rebirth cost
const tokenCounterSpan = document.getElementById('token-counter');
const tokensPerClickSpan = document.getElementById('tokens-per-click');
const tokensPerSecondSpan = document.getElementById('tokens-per-second');
const rebirthCounterSpan = document.getElementById('rebirth-counter');
const rebirthButton = document.getElementById('rebirthButton');

document.getElementById('clickerButton').addEventListener('click', () => {
    tokenCounter += tokensPerClick;
    tokenCounterSpan.textContent = tokenCounter;
    document.getElementById('clickerimg').style.transform = 'scale(0.7)';
    setTimeout(() => {
        document.getElementById('clickerimg').style.transform = 'scale(1)';
    }, 100);
    updateButtonStates();
});

const upgrades = {
    upgrade1: { price: 30, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count', rate: 1, initialPrice: 30 },
    upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count', rate: 4, initialPrice: 100 },
    upgrade3: { price: 500, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count', rate: 10, initialPrice: 500 },
    upgrade4: { price: 1500, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count', rate: 40, initialPrice: 1500 },
    upgrade5: { price: 4000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count', rate: 100, initialPrice: 4000 },
    upgrade6: { price: 15, count: 0, priceSpan: 'upgrade6-price', countSpan: 'upgrade6-count', rate: 0, clickBonus: 1, initialPrice: 15 }
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
        priceSpan.textContent = `Price: ${Math.round(upgrades[upgrade].price * buyMultiplier)}`;
    }
}

function buyItem(upgrade) {
    let quantity = buyMultiplier;
    let totalPrice = upgrades[upgrade].price * quantity;
    if (tokenCounter >= totalPrice) {
        tokenCounter -= totalPrice;
        tokenCounterSpan.textContent = tokenCounter;
        upgrades[upgrade].count += quantity;
        
        upgradeSFX[upgrade].play();

        if (upgrades[upgrade].clickBonus) {
            tokensPerClick += upgrades[upgrade].clickBonus * quantity;
            updateStats();
        }

        document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;

        upgrades[upgrade].price = Math.round(upgrades[upgrade].price * 1.2);
        updatePrices();
        updateButtonStates();
    }
}

function updateButtonStates() {
    for (const upgrade in upgrades) {
        const button = document.querySelector(`button[onclick="buyItem('${upgrade}')"]`);
        const totalPrice = upgrades[upgrade].price * buyMultiplier;
        if (tokenCounter >= totalPrice) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }
    rebirthButton.disabled = tokenCounter < rebirthCost;
}

function updateStats() {
    tokensPerClickSpan.textContent = `Tokens per Click: ${tokensPerClick}`;

    let tokensPerSecond = 0;
    for (const upgrade in upgrades) {
        tokensPerSecond += upgrades[upgrade].count * upgrades[upgrade].rate;
    }
    tokensPerSecond *= Math.pow(2, rebirthCounter);
    tokensPerSecondSpan.textContent = `Tokens per Second: ${tokensPerSecond}`;
}

function rebirth() {
    if (tokenCounter >= rebirthCost) {
        rebirthCounter++;
        rebirthCounterSpan.textContent = rebirthCounter;

        tokenCounter = 0;
        tokenCounterSpan.textContent = tokenCounter;

        for (const upgrade in upgrades) {
            upgrades[upgrade].count = 0;
            upgrades[upgrade].price = upgrades[upgrade].initialPrice;
            document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: 0`;
        }

        tokensPerClick *= 2;
        updateStats();

        updatePrices();
        updateButtonStates();

        // Increase rebirth cost by 1.5x
        rebirthCost = Math.round(rebirthCost * 1.5);
        rebirthButton.textContent = `Rebirth (Cost: ${rebirthCost} tokens)`;
    }
}

// Initialize the default multiplier button as active and update prices
updateMultiplierButtons();
updatePrices();
updateButtonStates();
updateStats();

// Update rebirth button text initially
rebirthButton.textContent = `Rebirth (Cost: ${rebirthCost} tokens)`;

setInterval(() => {
    let tokensPerSecond = 0;
    for (const upgrade in upgrades) {
        tokensPerSecond += upgrades[upgrade].count * upgrades[upgrade].rate;
    }
    tokenCounter += tokensPerSecond;
    tokenCounterSpan.textContent = tokenCounter;
    updateButtonStates();
    updateStats();
}, 1000);
