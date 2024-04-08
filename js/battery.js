/* Variables declared here !*/
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const robohashImage = document.getElementById('robohash-image');

/* Functions */
function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    // Getting the battery level percentage
    const batteryPercentage = Math.round(battery.level * 100);

    // Constructing the URL for the robohash image
    const robohashURL = `https://robohash.org/${batteryPercentage}.png`;

    // Setting the src attribute of the robohash image
    robohashImage.src = robohashURL;
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
