window.onload = function() {

    // Basis layer definieren
    var layers = {
        osmlayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
        }),
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

    // Karte initialisieren
    var transalpkarte = L.map('transalpmap', {
        layers: [layers.osmlayer]
    });

    // Etappen über GeoJSON laden und Po-pups hinzufügen
    var etappe01 = L.geoJson(window.TransalpEtappe01, {
        style: {
            color: "blue",
            weight: 10
        }
    });
    etappe01.bindPopup("<a>Tag 1 Garmisch-Partenkirchen - Imst</a>");

    var etappe02 = L.geoJson(window.TransalpEtappe02, {
        style: {
            color: "red",
            weight: 10
        }
    });
    etappe02.bindPopup("<a>Tag 2 Imst - Landeck</a>");
	
    var etappe03 = L.geoJson(window.TransalpEtappe03, {
        style: {
            color: "green",
            weight: 10
        }
    });
    etappe03.bindPopup("<a>Tag 3 Landeck - Nauders</a>");
	
	var etappe04 = L.geoJson(window.TransalpEtappe04, {
        style: {
            color: "yellow",
            weight: 10
        }
    });
	etappe04.bindPopup("<a>Tag 4 Nauders - Naturns</a>");
	
	var etappe05 = L.geoJson(window.TransalpEtappe05, {
        style: {
            color: "purple",
            weight: 10
        }
    });
	
	etappe05.bindPopup("<a>Tag 5 Naturns - Kaltern</a>");
	var etappe06 = L.geoJson(window.TransalpEtappe06, {
        style: {
            color: "orange",
            weight: 10
        }
    });
	etappe06.bindPopup("<a>Tag 6 Kaltern - Molveno</a>");
	
	var etappe07 = L.geoJson(window.TransalpEtappe07, {
        style: {
            color: "red",
            weight: 10
        }
    });
	etappe07.bindPopup("<a>Tag 7 Molveno - Torbole sul Garda</a>");
	
    // Etappen als Gruppe anhängen
    var etappenGruppe = L.featureGroup([etappe01, etappe02, etappe03, etappe04, etappe05, etappe06, etappe07]);
    transalpkarte.addLayer(etappenGruppe);

    // Ausschnitt anpassen
    var etappenBounds = etappenGruppe.getBounds()
    transalpkarte.fitBounds(etappenBounds);

    // Layer Menü mit Basislayern und Adlwerweg Overlay zum Ein-, Ausschalten hinzufügen
    var layerControl = L.control.layers(
        {
            "Open Street Map": layers.osmlayer,
            "Geoland Basemap": layers.geolandbasemap,
            "Geoland Basemap Overlay": layers.bmapoverlay,
            "Geoland Basemap Grau": layers.bmapgrau,
            "Geoland Basemap High DPI": layers.bmaphidpi,
            "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
        },
        {
        "Transalp Etappen": etappenGruppe
        }
    ).addTo(transalpkarte);

    // Maßstabsleiste hinzufügen
    L.control.scale({
        'imperial': false
    }).addTo(transalpkarte);


    // Erweiterung 1: Panoramio Photos im aktuellen Ausschnitt als overlay hinzufügen
    var panoramioOverlay = L.featureGroup();
    layerControl.addOverlay(panoramioOverlay, "Panoramio Bilder");

    // URL für den Aufruf der Panoramio-API erzeugen
    var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20' +
        '&minx=' + etappenBounds.getWest() +
        '&miny=' + etappenBounds.getSouth() +
        '&maxx=' + etappenBounds.getEast() +
        '&maxy=' + etappenBounds.getNorth() +
        '&size=mini_square&mapfilter=true&callback=zeigeBilder';

    // API-Aufruf als Skript einhängen
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Callback-Funktion zur Visualisierung der Bilder als Marker mit Pop-up
    window.zeigeBilder = function(data) {
        for (var i = 0; i < data.photos.length; i++) {
            L.marker(
                    [data.photos[i].latitude, data.photos[i].longitude], {
                        icon: L.icon({
                            iconUrl: data.photos[i].photo_file_url
                        })
                    }).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" +
                    "<a href='" + data.photos[i].photo_url + "'>Link zum Bild</a>")
                .addTo(panoramioOverlay);
        }
        panoramioOverlay.addTo(transalpkarte);
    }


    // Erweiterung 3: interaktives Höhenprofil für die erste Etappe mit Leaflet.Elevation
    var elevationProfile = L.control.elevation({
        collapsed: true
    });

    L.geoJson(window.TransalpEtappe01,{
        onEachFeature: elevationProfile.addData.bind(elevationProfile)
    }).addTo(transalpkarte);

    elevationProfile.addTo(transalpkarte);

}