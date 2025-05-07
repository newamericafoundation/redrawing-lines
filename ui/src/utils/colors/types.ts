export enum FriendlyColorBrewerPalettes {
    BlueGreen = 'BuGn',
    BluePurple = 'BuPu',
    GreenBlue = 'GnBu',
    OrangeRed = 'OrRd',
    PurpleBlue = 'PuBu',
    PurpleBlueGreen = 'PuBuGn',
    PurpleRed = 'PuRd',
    RedPurple = 'RdPu',
    YellowGreen = 'YlGn',
    YellowGreenBlue = 'YlGnBu',
    YellowOrangeBrown = 'YlOrBr',
    YellowOrangeRed = 'YlOrRd',
    Blues = 'Blues',
    Greens = 'Greens',
    Greys = 'Greys',
    Oranges = 'Oranges',
    Purples = 'Purples',
    Reds = 'Reds',
}

export type ColorBrewerIndex = 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ValidThresholdArray =
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number]
    | [number, number, number, number, number, number]
    | [number, number, number, number, number, number, number]
    | [number, number, number, number, number, number, number, number]
    | [number, number, number, number, number, number, number, number, number];
