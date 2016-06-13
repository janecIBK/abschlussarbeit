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




	var transalpKarte = L.map("transalpDiv");
	var hash = new L.Hash(transalpKarte);
	var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
	}).addTo(transalpKarte);
	 transalpKarte.setView([47, 11], 10);
	var el = L.control.elevation({collapsed: true}).addTo(transalpKarte);
	
	var etappe01 = L.geoJson(etappe01json, {
		style: {
			color: "#ff0000",
			weight: 10
		},
		onEachFeature: el.addData.bind(el)
	});
	transalpKarte.addLayer(etappe01);

	var etappe02 = L.geoJson(etappe02json, {
		style: {
			color: "##ff0000",
			weight: 10
		},
		onEachFeature: el.addData.bind(el)
	});
	transalpKarte.addLayer(etappe02);

	var etappe03 = L.geoJson(etappe03json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe03);

	var etappe04 = L.geoJson(etappe04json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe04);

	var etappe05 = L.geoJson(etappe05json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe06);

	var etappe06 = L.geoJson(etappe06json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe05);

	var etappe06 = L.geoJson(etappe06json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe06);

	var etappe07 = L.geoJson(etappe07json, {
		style: {
			color: "##ff0000",
			weight: 10
		}
	});
	transalpKarte.addLayer(etappe07);

	var etappenGruppe = L.featureGroup([etappe01, etappe02, etappe03, etappe04, etappe05, etappe06, etappe07]);
	transalpKarte.addLayer(etappenGruppe);
	transalpKarte.fitBounds(etappenGruppe.getBounds());

	L.control.layers({
		"OSM": osmLayer,
		"geoland": layers.bmapoverlay
	}, {
		"Tracks": etappenGruppe
	}).addTo(transalpKarte);

	transalpKarte.fitBounds(etappe01.getBounds());

	etappe01.bindPopup("<b>Etappe 01</b>");
	etappe02.bindPopup("<b>Etappe 02</b>");
	etappe03.bindPopup("<b>Etappe 03</b>");
	etappe04.bindPopup("<b>Etappe 04</b>");
	etappe05.bindPopup("<b>Etappe 05</b>");
	etappe06.bindPopup("<b>Etappe 06</b>");
	etappe07.bindPopup("<b>Etappe 07</b>");


	var bounds = etappenGruppe.getBounds();
	var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20' +
		'&minx=' + bounds.getWest() +
		'&miny=' + bounds.getSouth() +
		'&maxx=' + bounds.getEast() +
		'&maxy=' + bounds.getNorth() +
		'&size=mini_square&mapfilter=true&callback=zeigBilder';

};