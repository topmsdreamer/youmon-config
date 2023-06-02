
import L from 'leaflet';
interface IMapProps {
    zoom?:number,
    center?:[number,number]
}
const MapScript = (props?:IMapProps) => {

    const {zoom,center} = props ? props :  {zoom:undefined,center:undefined}

    const mapZoom = zoom ? zoom : '2';
    const mapCenter = center ? center : '[0,0]'

    const map = `var mymap = L.map('mapid',{ zoomControl: false }).setView(${mapCenter}, ${mapZoom});
	L.tileLayer('http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
		maxZoom: 18,
        minZoom: 2,
		attribution: 'Map data &copy; OpenStreetMap contributors, ',
		id: 'mapbox/streets-v11'
	}).addTo(mymap);
	
	mymap.on('click', onMapClick);`


    return `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
</head>
<body style="padding: 0; margin: 0">
<div id="mapid" style="width: 100%; height: 100vh;"></div>
<script>${map}
</script>
</body>
</html>
`}

export default MapScript