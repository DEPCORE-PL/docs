import leaflet from "leaflet";

L.TileLayer.Grayscale = L.TileLayer.extend({
    options: {
        quotaRed: 21,
        quotaGreen: 71,
        quotaBlue: 8,
        quotaDividerTune: 0,
        quotaDivider: function () {
            return (
                this.quotaRed +
                this.quotaGreen +
                this.quotaBlue +
                this.quotaDividerTune
            );
        },
    },

    initialize: function (url, options) {
        options = options || {};
        options.crossOrigin = true;
        L.TileLayer.prototype.initialize.call(this, url, options);

        this.on("tileload", function (e) {
            this._makeGrayscale(e.tile);
        });
    },

    _createTile: function () {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },

    _makeGrayscale: function (img) {
        if (img.getAttribute("data-grayscaled")) return;

        img.crossOrigin = "";
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pix = imgd.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] =
                pix[i + 1] =
                pix[i + 2] =
                    (this.options.quotaRed * pix[i] +
                        this.options.quotaGreen * pix[i + 1] +
                        this.options.quotaBlue * pix[i + 2]) /
                    this.options.quotaDivider();
        }
        ctx.putImageData(imgd, 0, 0);
        img.setAttribute("data-grayscaled", true);
        img.src = canvas.toDataURL();
    },
});

L.tileLayer.grayscale = function (url, options) {
    return new L.TileLayer.Grayscale(url, options);
};

export function initMap() {
    let mapContainer = document.querySelector(".map");

    if (mapContainer) {
        let map = L.map(mapContainer);
        let markers = [];

        let marker = L.icon({
            iconUrl:
                "../../themes/sunlife-theme/assets/images/icons/marker.png",
            iconSize: [50, 56], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
        });

        L.tileLayer
            .grayscale("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ["a", "b", "c"],
            })
            .addTo(map);

        function loadMap() {
            let latlon = [50.65754, 17.93391];
            map.setView(latlon, 13);
            L.marker(latlon, { icon: marker }).addTo(map).bindPopup("Sunlife");
        }

        loadMap();
    }
}
