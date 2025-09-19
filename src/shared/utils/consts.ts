export const DEFAULT_COORDS = [37.57, 55.75];
export const LOCATION = {
    center: DEFAULT_COORDS, // Москва
    zoom: 10,
    bounds: undefined,
    duration: 0
};

export const LINES = [
    {
        id: 'line1',
        geometry: {
            type: 'LineString',
            coordinates: [
                [37.605, 55.752], // Красная площадь
                [37.615, 55.755], // Китай-город
                [37.625, 55.760], // Лубянка
            ],
        },
        style: {
            stroke: [{ width: 4, color: 'rgb(14, 194, 219)' }],
        },
        source: 'featureSource',
    },
    {
        id: 'line2',
        geometry: {
            type: 'LineString',
            coordinates: [
                [37.635, 55.750], // Садовое кольцо
                [37.645, 55.755],
                [37.655, 55.760],
            ],
        },
        style: {
            stroke: [{ width: 4, color: 'rgb(255, 100, 50)' }],
        },
        source: 'featureSource',
    },
    {
        id: 'line3',
        geometry: {
            type: 'LineString',
            coordinates: [
                [37.615, 55.740], // Арбат
                [37.605, 55.745],
                [37.635, 55.750],
            ],
        },
        style: {
            stroke: [{ width: 4, color: 'rgb(50, 200, 50)' }],
        },
        source: 'featureSource',
    },
];

export const POLYGONS = [
    {
        id: 'polygon1',
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [30.300, 59.900],
                    [30.310, 59.900],
                    [30.310, 59.910],
                    [30.300, 59.910],
                    [30.300, 59.900]
                ]
            ]
        },
        style: {
            stroke: [{ width: 4, color: 'rgb(14, 194, 219)' }],
            fill: 'rgba(14, 194, 219, 0.3)'
        },
        source: 'featureSource',
    },
    {
        id: 'polygon2',
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [30.320, 59.890],
                    [30.330, 59.890],
                    [30.330, 59.895],
                    [30.320, 59.895],
                    [30.320, 59.890]
                ]
            ]
        },
        style: {
            stroke: [{ width: 3, color: 'rgb(255, 100, 50)' }],
            fill: 'rgba(255, 100, 50, 0.3)'
        },
        source: 'featureSource',
    },
];


