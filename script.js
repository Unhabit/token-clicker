//code for token button
let tokenCounter = 0;
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

//code for upgrades :)
const upgrades = {
    upgrade1: { price: 20, count: 0, priceSpan: 'upgrade1-price', countSpan: 'upgrade1-count' },
    upgrade2: { price: 100, count: 0, priceSpan: 'upgrade2-price', countSpan: 'upgrade2-count' },
    upgrade3: { price: 1000, count: 0, priceSpan: 'upgrade3-price', countSpan: 'upgrade3-count' },
    upgrade4: { price: 5000, count: 0, priceSpan: 'upgrade4-price', countSpan: 'upgrade4-count' },
    upgrade5: { price: 13000, count: 0, priceSpan: 'upgrade5-price', countSpan: 'upgrade5-count' }
};

function buyItem(upgrade) {
    if (tokenCounter >= upgrades[upgrade].price) {
        tokenCounter -= upgrades[upgrade].price;
        tokenCounterSpan.textContent = tokenCounter;
        upgrades[upgrade].count++;

        document.getElementById(upgrades[upgrade].countSpan).innerText = `Bought: ${upgrades[upgrade].count}`;
    } else {
        alert('Not enough tokens! You need at least ' + upgrades[upgrade].price + ' tokens to buy this upgrade.');
    }
}
