export interface IWeatherRate {
    rate: number;
    weather: string;
}

export interface IEorzeaArea {
    name: string;
    area?: string;
    weatherRate: IWeatherRate[];
}

export interface IEorzeaAreaWeatherInfo {
    [key: string]: IEorzeaArea;
}

export const EorzeaAreaWeather: IEorzeaAreaWeatherInfo = {
    "area.LimsaLominsa": {
        name: "area.LimsaLominsa",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.MiddleLa": {
        name: "area.MiddleLa",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Wind" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.LowerLa": {
        name: "area.LowerLa",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Wind" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.EasternLa": {
        name: "area.EasternLa",
        weatherRate: [
            { rate: 5, weather: "weather.Fog" },
            { rate: 45, weather: "weather.ClearSkies" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 5, weather: "weather.Rain" },
            { rate: -1, weather: "weather.Showers" },
        ],
    },
    "area.WesternLa": {
        name: "area.WesternLa",
        weatherRate: [
            { rate: 10, weather: "weather.Fog" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Wind" },
            { rate: -1, weather: "weather.Gales" },
        ],
    },
    "area.UpperLa": {
        name: "area.UpperLa",
        weatherRate: [
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Thunder" },
            { rate: -1, weather: "weather.Thunderstorms" },
        ],
    },
    "area.OuterLa": {
        name: "area.OuterLa",
        weatherRate: [
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.Mist": {
        name: "area.Mist",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.Wolves": {
        name: "area.Wolves",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Thunderstorms" },
        ],
    },
    "area.Gridania": {
        name: "area.Gridania",
        weatherRate: [
            { rate: 5, weather: "weather.Rain" },
            { rate: 15, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.CentralShroud": {
        name: "area.CentralShroud",
        weatherRate: [
            { rate: 5, weather: "weather.Thunder" },
            { rate: 15, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.EastShroud": {
        name: "area.EastShroud",
        weatherRate: [
            { rate: 5, weather: "weather.Thunder" },
            { rate: 15, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.SouthShroud": {
        name: "area.SouthShroud",
        weatherRate: [
            { rate: 5, weather: "weather.Fog" },
            { rate: 5, weather: "weather.Thunderstorms" },
            { rate: 15, weather: "weather.Thunder" },
            { rate: 5, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.NorthShroud": {
        name: "area.NorthShroud",
        weatherRate: [
            { rate: 5, weather: "weather.Fog" },
            { rate: 5, weather: "weather.Showers" },
            { rate: 15, weather: "weather.Rain" },
            { rate: 5, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.TheLavenderBeds": {
        name: "area.TheLavenderBeds",
        weatherRate: [
            { rate: 5, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.Uldah": {
        name: "area.Uldah",
        weatherRate: [
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 25, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.WesternThanalan": {
        name: "area.WesternThanalan",
        weatherRate: [
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 25, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.CentralThanalan": {
        name: "area.CentralThanalan",
        weatherRate: [
            { rate: 15, weather: "weather.DustStorms" },
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.EasternThanalan": {
        name: "area.EasternThanalan",
        weatherRate: [
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 5, weather: "weather.Rain" },
            { rate: -1, weather: "weather.Showers" },
        ],
    },
    "area.SouthernThanalan": {
        name: "area.SouthernThanalan",
        weatherRate: [
            { rate: 20, weather: "weather.HeatWaves" },
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Fog" },
        ],
    },
    "area.NorthernThanalan": {
        name: "area.NorthernThanalan",
        weatherRate: [
            { rate: 5, weather: "weather.ClearSkies" },
            { rate: 15, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Fog" },
        ],
    },
    "area.TheGoblet": {
        name: "area.TheGoblet",
        weatherRate: [
            { rate: 40, weather: "weather.ClearSkies" },
            { rate: 20, weather: "weather.FairSkies" },
            { rate: 25, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Rain" },
        ],
    },
    "area.MorDhona": {
        name: "area.MorDhona",
        weatherRate: [
            { rate: 15, weather: "weather.Clouds" },
            { rate: 15, weather: "weather.Fog" },
            { rate: 30, weather: "weather.Gloom" },
            { rate: 15, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.Ishgard": {
        name: "area.Ishgard",
        weatherRate: [
            { rate: 60, weather: "weather.Snow" },
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 5, weather: "weather.ClearSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Fog" },
        ],
    },
    "area.CoerthasCentral": {
        name: "area.CoerthasCentral",
        weatherRate: [
            { rate: 20, weather: "weather.Blizzards" },
            { rate: 40, weather: "weather.Snow" },
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 5, weather: "weather.ClearSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Fog" },
        ],
    },
    "area.CoerthasWestern": {
        name: "area.CoerthasWestern",
        weatherRate: [
            { rate: 20, weather: "weather.Blizzards" },
            { rate: 40, weather: "weather.Snow" },
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 5, weather: "weather.ClearSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Fog" },
        ],
    },
    "area.TheSeaofClouds": {
        name: "area.TheSeaofClouds",
        weatherRate: [
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: 30, weather: "weather.FairSkies" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Wind" },
            { rate: -1, weather: "weather.UmbralWind" },
        ],
    },
    "area.AzysLla": {
        name: "area.AzysLla",
        weatherRate: [
            { rate: 35, weather: "weather.FairSkies" },
            { rate: 35, weather: "weather.Clouds" },
            { rate: -1, weather: "weather.Thunder" },
        ],
    },
    "area.DravanianForelands": {
        name: "area.DravanianForelands",
        weatherRate: [
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Thunder" },
            { rate: 10, weather: "weather.DustStorms" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.DravanianHinterlands": {
        name: "area.DravanianHinterlands",
        weatherRate: [
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Showers" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.ChurningMists": {
        name: "area.ChurningMists",
        weatherRate: [
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Gales" },
            { rate: 20, weather: "weather.UmbralStatic" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.Idyllshire": {
        name: "area.Idyllshire",
        weatherRate: [
            { rate: 10, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Showers" },
            { rate: 30, weather: "weather.ClearSkies" },
            { rate: -1, weather: "weather.FairSkies" },
        ],
    },
    "area.RhalgrsReach": {
        name: "area.RhalgrsReach",
        weatherRate: [
            { rate: 15, weather: "weather.ClearSkies" },
            { rate: 45, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Thunder" },
        ],
    },
    "area.TheFringes": {
        name: "area.TheFringes",
        weatherRate: [
            { rate: 15, weather: "weather.ClearSkies" },
            { rate: 45, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Thunder" },
        ],
    },
    "area.ThePeaks": {
        name: "area.ThePeaks",
        weatherRate: [
            { rate: 10, weather: "weather.ClearSkies" },
            { rate: 50, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Wind" },
            { rate: -1, weather: "weather.DustStorms" },
        ],
    },
    "area.TheLochs": {
        name: "area.TheLochs",
        weatherRate: [
            { rate: 20, weather: "weather.ClearSkies" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: -1, weather: "weather.Thunderstorms" },
        ],
    },
    "area.Kugane": {
        name: "area.Kugane",
        weatherRate: [
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.Shirogane": {
        name: "area.Shirogane",
        weatherRate: [
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 20, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.RubySea": {
        name: "area.RubySea",
        weatherRate: [
            { rate: 10, weather: "weather.Thunder" },
            { rate: 10, weather: "weather.Wind" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.Yanxia": {
        name: "area.Yanxia",
        weatherRate: [
            { rate: 5, weather: "weather.Showers" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.AzimSteppe": {
        name: "area.AzimSteppe",
        weatherRate: [
            { rate: 5, weather: "weather.Gales" },
            { rate: 5, weather: "weather.Wind" },
            { rate: 7, weather: "weather.Rain" },
            { rate: 8, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: -1, weather: "weather.ClearSkies" },
        ],
    },
    "area.EurekaAnemos": {
        name: "area.EurekaAnemos",
        weatherRate: [
            { rate: 30, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.Gales" },
            { rate: 30, weather: "weather.Showers" },
            { rate: -1, weather: "weather.Snow" },
        ],
    },
    "area.EurekaPagos": {
        name: "area.EurekaPagos",
        weatherRate: [
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 18, weather: "weather.Fog" },
            { rate: 18, weather: "weather.HeatWaves" },
            { rate: 18, weather: "weather.Snow" },
            { rate: 18, weather: "weather.EurekaPagosThunder" },
            { rate: -1, weather: "weather.Blizzards" },
        ],
    },
    "area.EurekaPyros": {
        name: "area.EurekaPyros",
        weatherRate: [
            { rate: 10, weather: "weather.FairSkies" },
            { rate: 18, weather: "weather.HeatWaves" },
            { rate: 18, weather: "weather.Thunder" },
            { rate: 18, weather: "weather.Blizzards" },
            { rate: 18, weather: "weather.UmbralWind" },
            { rate: -1, weather: "weather.Snow" },
        ],
    },
    "area.EurekaHydatos": {
        name: "area.EurekaHydatos",
        weatherRate: [
            { rate: 12, weather: "weather.FairSkies" },
            { rate: 22, weather: "weather.Showers" },
            { rate: 22, weather: "weather.Gloom" },
            { rate: 22, weather: "weather.Thunderstorms" },
            { rate: -1, weather: "weather.Snow" },
        ],
    },
    "area.TheCrystarium": {
        name: "area.TheCrystarium",
        weatherRate: [
            { rate: 20, weather: "weather.ClearSkies" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 5, weather: "weather.Thunderstorms" },
        ],
    },
    "area.Lakeland": {
        name: "area.Lakeland",
        weatherRate: [
            { rate: 20, weather: "weather.ClearSkies" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 5, weather: "weather.Thunderstorms" },
        ],
    },
    "area.Eulmore": {
        name: "area.Eulmore",
        weatherRate: [
            { rate: 10, weather: "weather.Gales" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.ClearSkies" },
        ],
    },
    "area.Kholusia": {
        name: "area.Kholusia",
        weatherRate: [
            { rate: 10, weather: "weather.Gales" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.ClearSkies" },
        ],
    },
    "area.AmhAraeng": {
        name: "area.AmhAraeng",
        weatherRate: [
            { rate: 45, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.DustStorms" },
            { rate: 10, weather: "weather.HeatWaves" },
            { rate: 20, weather: "weather.ClearSkies" },
        ],
    },
    "area.IlMheg": {
        name: "area.IlMheg",
        weatherRate: [
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.Fog" },
            { rate: 15, weather: "weather.Clouds" },
            { rate: 10, weather: "weather.Thunderstorms" },
            { rate: 15, weather: "weather.ClearSkies" },
            { rate: 40, weather: "weather.FairSkies" },
        ],
    },
    "area.TheRaktikaGreatwood": {
        name: "area.TheRaktikaGreatwood",
        weatherRate: [
            { rate: 10, weather: "weather.Fog" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 10, weather: "weather.UmbralWind" },
            { rate: 15, weather: "weather.ClearSkies" },
            { rate: 40, weather: "weather.FairSkies" },
            { rate: 15, weather: "weather.Clouds" },
        ],
    },
    "area.TheTempest": {
        name: "area.TheTempest",
        weatherRate: [
            { rate: 20, weather: "weather.Clouds" },
            { rate: 60, weather: "weather.FairSkies" },
            { rate: 20, weather: "weather.ClearSkies" },
        ],
    },
    "area.LyheMheg": {
        name: "area.LyheMheg",
        weatherRate: [
            { rate: 50, weather: "weather.ClearSkies" },
            { rate: 50, weather: "weather.FairSkies" },
        ],
    },
    "area.TheBozjanSouthernFront": {
        name: "area.TheBozjanSouthernFront",
        weatherRate: [
            { rate: 52, weather: "weather.FairSkies" },
            { rate: 12, weather: "weather.Rain" },
            { rate: 12, weather: "weather.Wind" },
            { rate: 12, weather: "weather.Thunder" },
            { rate: 12, weather: "weather.DustStorms" },
        ],
    },
    "area.TheFeastingGrounds": {
        name: "area.TheFeastingGrounds",
        weatherRate: [
            { rate: 50, weather: "weather.FairSkies" },
            { rate: 50, weather: "weather.Rain" },
        ],
    },
    "area.SealRock": {
        name: "area.SealRock",
        weatherRate: [
            { rate: 15, weather: "weather.Fog" },
            { rate: 25, weather: "weather.Rain" },
            { rate: 60, weather: "weather.FairSkies" },
        ],
    },
    "area.TheFieldsofGlory": {
        name: "area.TheFieldsofGlory",
        weatherRate: [
            { rate: 35, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.Snow" },
            { rate: 20, weather: "weather.Blizzards" },
            { rate: 15, weather: "weather.Fog" },
        ],
    },
    "area.OnsalHakair": {
        name: "area.OnsalHakair",
        weatherRate: [
            { rate: 50, weather: "weather.FairSkies" },
            { rate: 30, weather: "weather.Wind" },
            { rate: 10, weather: "weather.Rain" },
            { rate: 5, weather: "weather.Gales" },
            { rate: 5, weather: "weather.Fog" }],
    },
};