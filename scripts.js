function ipLookUp(ip) {
    return fetch(
        `http://api.ipstack.com/${ip}?access_key=89e7af60cc380acdd080ac5004975a49`
    )
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
function display() {
    window.location.href = "display.html";
    mapData();
}

let map;
async function mapData() {
    console.log("in function");
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '';
    ip =
        document.getElementById("octet1").value +
        "." +
        document.getElementById("octet2").value +
        "." +
        document.getElementById("octet3").value +
        "." +
        document.getElementById("octet4").value;
    console.log(ip);
    let data = await ipLookUp(ip);
    console.log(data);
    if (data.success == false) {
        alert("Enter A Valid IP Address");
    } else {
        if (map) {
            map.remove();
            map = null;   
        }
        map = L.map("map").setView([data.latitude, data.longitude], 4);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        var currentMarker = L.marker([data.latitude, data.longitude]).addTo(map);
    }
}
