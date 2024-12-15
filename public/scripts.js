let map; // Declare a global map variable

async function ipLookUp(ip) {
    return fetch(`http://localhost:3000/getIPData?ip=${ip}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

async function safety(ip) {
    return fetch(`http://localhost:3000/getFraudScore?ip=${ip}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

async function mapData() {
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = "";

    const ip =
        document.getElementById("octet1").value +
        "." +
        document.getElementById("octet2").value +
        "." +
        document.getElementById("octet3").value +
        "." +
        document.getElementById("octet4").value;

    console.log("IP:", ip);

    // Fetch IP lookup data
    const ipData = await ipLookUp(ip);
    console.log("IP Data:", ipData);

    if (!ipData || ipData.success === false) {
        alert("Enter a valid IP address or check your API configuration.");
        return;
    }

    // Destroy the existing map instance if it exists
    if (map) {
        map.remove();
    }

    // Initialize the map with the new data
    map = L.map("map").setView([ipData.latitude, ipData.longitude], 6); // Adjust zoom as needed

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add a marker to the map
    L.marker([ipData.latitude, ipData.longitude]).addTo(map);

    // Fetch fraud data
    const fraudData = await safety(ip);
    console.log("Fraud Data:", fraudData);

    alert(`Fraud Score: ${fraudData?.fraud_score ?? "N/A"}`);
}
