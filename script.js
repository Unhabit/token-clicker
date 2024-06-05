let bgMusic = new Howl({
    src: ["SFX/crickets.mp3"],
    autoplay: true,
    volume: 0.20,
    loop: true
});

function muteMusic(){
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
    upgrade1: new Howl({ src: ["SFX/upgrade1.wav"], volume: 0.08}),
    upgrade2: new Howl({ src: ["SFX/upgrade2.mp3"], volume: 0.08 }),
    upgrade3: new Howl({ src: ["SFX/upgrade3.mp3"], volume: 0.08 }),
    upgrade4: new Howl({ src: ["SFX/upgrade4.wav"], volume: 0.08 }),
    upgrade5: new Howl({ src: ["SFX/upgrade5.mp3"], volume: 0.08 }),
    upgrade6: new Howl({ src: ["SFX/upgrade6.mp3"], volume: 0.08 })
};

let tokenCounter = 0;
let tokensPerClick = 1;
let buyMultiplier = 1;
const tokenCounterSpan = document.getElementById('token-counter');
const tokensPerClickSpan = document.getElementById('tokens-per-click');
const tokensPerSecondSpan = document.getElementById('tokens-per-second');

document.getElementById('clickerButton').addEventListener('click', () => {
    tokenCounter += tokensPerClick;
    tokenCounterSpan.textContent = tokenCounter;
    // Adding scaling effect
    document.getElementById('clickerimg').style.transform = 'scale(0.7)';
    setTimeout(() => {
        document.getElementById('clickerimg').style.transform = 'scale(1)';
    }, 100); // Adjust the time for the scaling animation
    updateButtonStates();
});

// Code for upgrades
const upgrades = {
    upgrade1: { price: 30, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count', rate: 1 },
    upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count', rate: 4 },
    upgrade3: { price: 500, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count', rate: 10 },
    upgrade4: { price: 1500, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count', rate: 40 },
    upgrade5: { price: 4000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count', rate: 100 },
    upgrade6: { price: 15, count: 0, priceSpan: 'upgrade6-price', countSpan: 'upgrade6-count', rate: 0, clickBonus: 1 }
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
        
        //sound thing
        upgradeSFX[upgrade].play();

        // Apply click bonus if the upgrade has one
        if (upgrades[upgrade].clickBonus) {
            tokensPerClick += upgrades[upgrade].clickBonus * quantity;
            updateStats();
        }

        document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;

        // Increase the price of the upgrade by a factor of 1.2
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
}

function updateStats() {
    tokensPerClickSpan.textContent = `Tokens per Click: ${tokensPerClick}`;

    let tokensPerSecond = 0;
    for (const upgrade in upgrades) {
        tokensPerSecond += upgrades[upgrade].count * upgrades[upgrade].rate;
    }
    tokensPerSecondSpan.textContent = `Tokens per Second: ${tokensPerSecond}`;
}

// Initialize the default multiplier button as active and update prices
updateMultiplierButtons();
updatePrices();
updateButtonStates();
updateStats();

// Set interval for generating tokens from upgrades
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
