var intervalLastGridStock = setInterval(function () {
if (document.readyState === 'complete') {
clearInterval(intervalLastGridStock);

var removeLinkCountries = [
'LUX',
'GRL',
'ESH',
'ISL',
'SJM',
'BEL',
'DNK',
'BLR',
'LTU',
'LVA',
'EST',
'GNQ',
'DJI',
'SWZ',
'KWT',
'QAT',
'ARE',
'GUY',
'GUF',
'FLK',
'PRI',
'NCL',
'ATF',
'SVK'
];

var removeLinkContriesConfigs = removeLinkCountries.map(function (item) {
return {
"id": item,
"selectable": false,
"color": "#A5A9A9",
"colorSolid": "#A5A9A9",
"selectedColor": "#A5A9A9",
"outlineColor": "#193256",
"rollOverOutlineColor": "#A5A9A9"
}
});

var map = AmCharts.makeChart("mapdiv_id", {
type: "map",
// projection: "mercator",
projection: "equirectangular",
panEventsEnabled: true,
// backgroundColor : "#F9F9F9",
backgroundColor: "#333132",
backgroundAlpha: 1,
zoomControl: {
zoomControlEnabled: true
},
dataProvider: {
// mapURL : "https://api.idmcdb.org/public/assets/data/worldLow.svg",
// map : "worldLow",
mapURL: "https://api.idmcdb.org/public/assets/data/worldLow.svg",
getAreasFromMap: true,
"areas": removeLinkContriesConfigs
},
areasSettings: {
autoZoom: false,
selectable: true,
color: "#D8D8D8",
colorSolid: "#D8D8D8",
selectedColor: "#D8D8D8",
outlineColor: "#A5A9A9",
rollOverColor: "#193256",
rollOverOutlineColor: "#F9F9F9"
},
responsive: {
"enabled": true
},
/*
                areasSettings : {
                    autoZoom : false,
                    selectable: true,
                    color : "#3285B9",
                    colorSolid : "#3285B9",
                    selectedColor : "#3285B9",
                    outlineColor : "#F9F9F9",
                    rollOverColor : "#3285B9",
                    rollOverOutlineColor : "#F9F9F9"
                }
                */
});

/*
            function applyRemoveLinkColor(item, index) {
              var area = map.getObjectById(item);
              area.color = '#A5A9A9';
              area.colorReal = area.color;
              area.selectedColor = area.color;

              // make the chart take in new color
              area.validate();
            }

            removeLinkCountries.forEach(applyRemoveLinkColor);
            */

// click to an area then redirect to it's link
map.addListener("clickMapObject", function (event) {
// remove links from some countries
// List removed countries IDs: GRL, ESH, ISL, SJM, BEL, DNK, BLR, LTU, LVA, EST, GNQ, DJI, SWZ, KWT, QAT, ARE, GUY, GUF, FLK, PRI, NCL, ATF, SVK
if (removeLinkCountries.indexOf(event.mapObject.id) != -1) {
return;
}

// normal cases
var urlSurffix = event.mapObject.title.toLowerCase();
urlSurffix = urlSurffix.replace(/ /g, '-')

// special case
if (event.mapObject.id == 'CD') {
urlSurffix = 'drc'
}

if (event.mapObject.id == 'RU') {
urlSurffix = 'russian-federation'
}

if (event.mapObject.id == 'KP') {
urlSurffix = 'democratic-peoples-republic-of-korea'
}

if (event.mapObject.id == 'KR') {
urlSurffix = 'republic-of-korea'
}

if (event.mapObject.id == 'AB9') {
urlSurffix = 'abyei';
}

if (event.mapObject.id === 'COD') {
//urlSurffix = 'drc';
urlSurffix = 'democratic-republic-of-the-congo';
}
window.location = '/countries/' + urlSurffix
// window.location = window.location.href + '/' + urlSurffix
// window.location = "http://www.internal-displacement.org/countries/" + urlSurffix
});
}
}, 500);