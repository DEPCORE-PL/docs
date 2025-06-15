import leaflet from 'leaflet';

export function initMap( ) {

	if (document.querySelector('.map')) {
		let map = L.map('map');
		let markers = [];

		let marker = L.icon({
		    iconUrl: '../../themes/depcore-theme/assets/images/icons/marker.png',
		    iconSize:     [45, 57], // size of the icon
		    iconAnchor:   [22, 57], // point of the icon which will correspond to marker's location
		    popupAnchor:  [25, 57] // point from which the popup should open relative to the iconAnchor
		});

		L.tileLayer('https://api.mapbox.com/styles/v1/depcore/ckatvqy9g27511iqheosfipz6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGVwY29yZSIsImEiOiJjanVqdTFwejMwa2Z5NDNsbGIzdThsZmZ2In0.DPSqM_npGWP11OqKENNUOw', {
	        maxZoom: 18,
		    id: 'mapbox/streets-v11',
		    tileSize: 512,
		    zoomOffset: -1,
		    accessToken: 'pk.eyJ1IjoiZGVwY29yZSIsImEiOiJjanVqdTFwejMwa2Z5NDNsbGIzdThsZmZ2In0.DPSqM_npGWP11OqKENNUOw'
		}).addTo(map);


		function loadMap(  ){
			let latlon = [50.658010,17.968800];
			map.setView(latlon, 16);
			L.marker(latlon, {icon: marker}).addTo(map);
		}

		loadMap();
	}
}
