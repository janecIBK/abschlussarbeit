window.onload = function() {

	var layers = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
		geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		})
	};


	var transalpKarte = L.map("transalpDiv", {
		   layers: [layers.osmlayer]
    });
     
	
	var etappe01 = L.geoJson(transalp, {
        style: {
            color: "yellow",
            weight: 10
        }
    });
	
	



var overlays = {
    "Marker": marker,
    "Roads": roadsLayer
};

L.control.layers(baseLayers, overlays).addTo(transalpKarte);


	L.control.layers({
		"OSM": osmLayer,
		"geoland": layers.bmapoverlay
	}, {
		"Tracks": etappenGruppe
	}).addTo(transalpKarte);

	transalpKarte.fitBounds(etappe01.getBounds());

	etappe01.bindPopup("<b>Transalp</b>");



};