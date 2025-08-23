// In your public/js/map.js file

mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard-satellite',
    center: coordinates,
    zoom: 9
});

const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map);

const popup = new mapboxgl.Popup({
        closeButton: false, // Optional: hide the close button
        offset: 25
    })
    .setHTML("<div class='popup'> <h5>Your Location</h5><p>Have a nice stay :)</p> </div>");

// Add the popup to the marker
marker.setPopup(popup);

// Get the marker's HTML element to attach event listeners
const markerElement = marker.getElement();

// Event listener for when the mouse enters the marker's area
markerElement.addEventListener('mouseenter', () => {
    marker.togglePopup();
});

// Event listener for when the mouse leaves the marker's area
markerElement.addEventListener('mouseleave', () => {
    marker.togglePopup();
});