var __territoryType = "" // https://github.com/thewakingsands/ffxiv-datamining-cn/raw/master/TerritoryType.csv
__territoryType = _territoryType.split("\n").map(n => n.split(","))
var weather = ""// https://raw.githubusercontent.com/thewakingsands/ffxiv-datamining-cn/master/Weather.csv
weather = Object.fromEntries((weather.split("\n").map(n => n.split(",")).map(([k, , n]) => [k, n])).map(([k, v]) => [k, v.replace(/"/g, "")]))
var _weatherRate = ""; // https://github.com/thewakingsands/ffxiv-datamining-cn/raw/master/WeatherRate.csv
_weatherRate = _weatherRate.split("\n").map((n) => n.split(","))
var weatherRate = [];
_weatherRate.forEach(([key, ...args]) => {
    weatherRate[key] = [];
    for (let i = 0; i <= 7; i++) {
        if (+args[2 * i] > 0) {
            weatherRate[key].push({
                rate: +args[2 * i + 1],
                weather: weather[+args[2 * i]]
            })
        } else {
            return;
        }
    }
})
var placename = ""// https://raw.githubusercontent.com/thewakingsands/ffxiv-datamining-cn/master/PlaceName.csv
placename = Object.fromEntries(placename)
var _territoryType = __territoryType.map((n) => {
    return [placename[n[6]], weatherRate[n[13]]]
}).filter(([p, w]) => (!!p) && w.length > 1);
var territoryType = [];
_territoryType.forEach(([p, w]) => {
    if (territoryType.filter(([pln, wtr]) => pln === p && wtr === w).length === 0) {
        territoryType.push([p, w]);
    }
})