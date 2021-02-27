export interface IPos {
    x: number;
    y: number;
}

export interface ISightseeingGroup {
    groupName: string;
    items: ISightseeingItem[];
}

export interface ISightseeingItem {
    id: string;
    area: string;
    subarea?: string;
    pos: IPos;
    weathers: string[];
    time: number[];
    timestr: string;
    action: string;
    startHour: number;
    endHour: number;
}

// tslint:disable:max-line-length
export const SightseeingData: ISightseeingGroup[] = [
    {
        groupName: "1~20",
        items: [
            { id: "1", area: "area.LimsaLominsa", subarea: "area.LimsaLominsaUpper", pos: { x: 9.7, y: 7.7 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "2", area: "area.LimsaLominsa", subarea: "area.LimsaLominsaLower", pos: { x: 7, y: 15.1 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "3", area: "area.MiddleLa", pos: { x: 20, y: 19 }, weathers: ["weather.Rain", "weather.Showers"], time: [5, 6, 7], action: "action.Pray", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "4", area: "area.MiddleLa", pos: { x: 16, y: 17 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "5", area: "area.MiddleLa", pos: { x: 25.3, y: 27.5 }, weathers: ["weather.Clouds"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "6", area: "area.LowerLa", pos: { x: 23, y: 40 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "7", area: "area.LowerLa", pos: { x: 33, y: 19 }, weathers: ["weather.Fog"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "8", area: "area.WesternLa", pos: { x: 29.9, y: 30.7 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "9", area: "area.Gridania", subarea: "area.OldGridania", pos: { x: 12, y: 8 }, weathers: ["weather.Clouds"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "10", area: "area.Gridania", subarea: "area.OldGridania", pos: { x: 10, y: 6 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "11", area: "area.CentralShroud", pos: { x: 21.8, y: 21.8 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Sit", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "12", area: "area.EastShroud", pos: { x: 17, y: 18 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Pray", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "13", area: "area.EastShroud", pos: { x: 22, y: 26 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "14", area: "area.Uldah", subarea: "area.UldahThal", pos: { x: 11, y: 11 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Salute", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "15", area: "area.Uldah", subarea: "area.UldahThal", pos: { x: 11, y: 11 }, weathers: ["weather.Clouds"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "16", area: "area.WesternThanalan", pos: { x: 22, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "17", area: "area.CentralThanalan", pos: { x: 15, y: 22 }, weathers: ["weather.Fog"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "18", area: "area.EasternThanalan", pos: { x: 19, y: 24 }, weathers: ["weather.Rain", "weather.Showers"], time: [17], action: "action.Comfort", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "19", area: "area.EasternThanalan", pos: { x: 14, y: 18 }, weathers: ["weather.Clouds"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "20", area: "area.EasternThanalan", pos: { x: 21, y: 20.8 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Pray", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
        ],
    },
    {
        groupName: "21~80",
        items: [
            { id: "21", area: "area.MiddleLa", pos: { x: 20, y: 13 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "22", area: "area.MiddleLa", pos: { x: 25, y: 17 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "23", area: "area.LowerLa", pos: { x: 31, y: 12 }, weathers: ["weather.Rain", "weather.Showers"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "24", area: "area.EasternLa", pos: { x: 32, y: 23 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Sit", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "25", area: "area.EasternLa", pos: { x: 29, y: 33 }, weathers: ["weather.Rain", "weather.Showers"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "26", area: "area.WesternLa", pos: { x: 26, y: 26 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Pray", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "27", area: "area.WesternLa", pos: { x: 17, y: 36 }, weathers: ["weather.Gales"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "28", area: "area.WesternLa", pos: { x: 22, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "29", area: "area.WesternLa", pos: { x: 19, y: 23 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "30", area: "area.UpperLa", pos: { x: 30, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Lookout", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "31", area: "area.UpperLa", pos: { x: 12, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "32", area: "area.UpperLa", pos: { x: 29, y: 25 }, weathers: ["weather.Thunderstorms"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "33", area: "area.OuterLa", pos: { x: 12, y: 15 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "34", area: "area.OuterLa", pos: { x: 17, y: 16 }, weathers: ["weather.Clouds"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "35", area: "area.OuterLa", pos: { x: 23, y: 11 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "36", area: "area.OuterLa", pos: { x: 15, y: 10 }, weathers: ["weather.Rain", "weather.Showers"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Sit", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "37", area: "area.Gridania", subarea: "area.NewGridania", pos: { x: 14, y: 14 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "38", area: "area.Gridania", subarea: "area.OldGridania", pos: { x: 14, y: 5 }, weathers: ["weather.Rain", "weather.Showers"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "39", area: "area.CentralShroud", pos: { x: 23, y: 19 }, weathers: ["weather.Rain", "weather.Showers"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "40", area: "area.CentralShroud", pos: { x: 13, y: 23 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "41", area: "area.CentralShroud", pos: { x: 16, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "42", area: "area.CentralShroud", pos: { x: 26, y: 18 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [11, 12, 13], action: "action.Lookout", timestr: "11:00~14:00", startHour: 11, endHour: 14 },
            { id: "43", area: "area.EastShroud", pos: { x: 21, y: 10 }, weathers: ["weather.Thunder"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "44", area: "area.SouthShroud", pos: { x: 17, y: 20 }, weathers: ["weather.Thunderstorms"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "45", area: "area.SouthShroud", pos: { x: 14, y: 33 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "46", area: "area.SouthShroud", pos: { x: 33, y: 23 }, weathers: ["weather.Fog"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "47", area: "area.SouthShroud", pos: { x: 25, y: 21 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "48", area: "area.NorthShroud", pos: { x: 18, y: 19 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "49", area: "area.NorthShroud", pos: { x: 15, y: 32 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "50", area: "area.NorthShroud", pos: { x: 15, y: 27 }, weathers: ["weather.Clouds"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "51", area: "area.WesternThanalan", pos: { x: 8, y: 5 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Lookout", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "52", area: "area.WesternThanalan", pos: { x: 12, y: 14 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Point", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "53", area: "area.CentralThanalan", pos: { x: 21, y: 17 }, weathers: ["weather.DustStorms"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "54", area: "area.CentralThanalan", pos: { x: 18, y: 26 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Sit", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "55", area: "area.EasternThanalan", pos: { x: 30, y: 26 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "56", area: "area.EasternThanalan", pos: { x: 10, y: 16 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "57", area: "area.EasternThanalan", pos: { x: 25, y: 14 }, weathers: [/* "weather.Rain", */"weather.Showers"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Pray", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "58", area: "area.SouthernThanalan", pos: { x: 12, y: 22 }, weathers: ["weather.Fog"], time: [5, 6, 7], action: "action.Pray", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "59", area: "area.SouthernThanalan", pos: { x: 19, y: 20 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "60", area: "area.SouthernThanalan", pos: { x: 21, y: 38 }, weathers: ["weather.HeatWaves"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "61", area: "area.SouthernThanalan", pos: { x: 23, y: 11 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "62", area: "area.SouthernThanalan", pos: { x: 14, y: 26 }, weathers: ["weather.HeatWaves"], time: [5, 6, 7], action: "action.Psych", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "63", area: "area.NorthernThanalan", pos: { x: 21, y: 24 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Salute", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "64", area: "area.NorthernThanalan", pos: { x: 20, y: 29 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "65", area: "area.NorthernThanalan", pos: { x: 20, y: 22 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "66", area: "area.NorthernThanalan", pos: { x: 19, y: 17 }, weathers: ["weather.Clouds"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "67", area: "area.NorthernThanalan", pos: { x: 26, y: 22 }, weathers: ["weather.Fog"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "68", area: "area.CoerthasCentral", pos: { x: 25, y: 29 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Lookout", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "69", area: "area.CoerthasCentral", pos: { x: 25, y: 29 }, weathers: ["weather.Fog"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "70", area: "area.CoerthasCentral", pos: { x: 11, y: 15 }, weathers: ["weather.Snow", "weather.Blizzards"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "71", area: "area.CoerthasCentral", pos: { x: 12, y: 17 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "72", area: "area.CoerthasCentral", pos: { x: 7, y: 28 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Lookout", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
            { id: "73", area: "area.CoerthasCentral", pos: { x: 7, y: 31 }, weathers: ["weather.Snow", "weather.Blizzards"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "74", area: "area.CoerthasCentral", pos: { x: 2, y: 21 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [8, 9, 10, 11], action: "action.Lookout", timestr: "8:00~12:00", startHour: 8, endHour: 12 },
            { id: "75", area: "area.CoerthasCentral", pos: { x: 26, y: 17 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "76", area: "area.CoerthasCentral", pos: { x: 28, y: 10 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [5, 6, 7], action: "action.Lookout", timestr: "5:00~8:00", startHour: 5, endHour: 8 },
            { id: "77", area: "area.MorDhona", pos: { x: 9, y: 13 }, weathers: ["weather.Gloom"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "78", area: "area.MorDhona", pos: { x: 27, y: 8 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [0, 1, 2, 3, 4, 18, 19, 20, 21, 22, 23], action: "action.Lookout", timestr: "18:00~5:00", startHour: 18, endHour: 5 },
            { id: "79", area: "area.MorDhona", pos: { x: 18, y: 17 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [12, 13, 14, 15, 16], action: "action.Lookout", timestr: "12:00~17:00", startHour: 12, endHour: 17 },
            { id: "80", area: "area.MorDhona", pos: { x: 26, y: 11 }, weathers: ["weather.ClearSkies", "weather.FairSkies"], time: [17], action: "action.Sit", timestr: "17:00~18:00", startHour: 17, endHour: 18 },
        ],
    },
];
// tslint:enable:max-line-length