import './App.css'
import {ThemeProvider} from "styled-components";
import {theme} from "./styles";
import {createRef, useEffect, useState} from "react";
import BottomWidget from "./components/bottom-widget.tsx";


function App() {
    const bottomWidgetRef = createRef<HTMLDivElement>();
    const [datasets, setDatasets] = useState<any>({})
    const [filter, setFilter] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        // fetch two files dataset and filter then change the state of loading to true
        Promise.all([
            fetch('./dataset.json').then(response => response.json()),
            fetch('./filter.json').then(response => response.json())
        ]).then(([dataset, filter]) => {
            if (dataset && filter) {
                setDatasets(dataset)
                setFilter(filter)
            }
        })
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                {!loading && <BottomWidget
                    datasets={datasets}
                    filters={[
                        filter
                    ]}
                    animationConfig={
                        {
                            // "domain": null,
                            // "currentTime": null,
                            // "speed": 1,
                            // "isAnimating": false,
                            // "timeFormat": null,
                            // "timezone": null,
                            // "defaultTimeFormat": null,
                            // "hideControl": false,
                            // "duration": null
                        }
                    }
                    visStateActions={
                        {
                            onMouseMove: () => {
                            },
                            setFilterAnimationTime: () => {},
                            setFilterAnimationTimeConfig: () => {
                            },
                            setFilterAnimationWindow: () => {
                            },
                            setFilterPlot: () => {
                            },
                            setFilterView: () => {
                            },
                            toggleFilterAnimation: () => {
                            },
                            updateFilterAnimationSpeed: () => {
                            }
                        }
                    }
                    containerW={
                        1017
                    }
                    uiState={
                        {
                            activeSidePanel: false,
                            readOnly: false,
                            mapControls: {
                                mapLegend: {
                                    show: false,
                                    active: false
                                }
                            }
                        }
                    }
                    layers={
                        [
                            [
                                {
                                    "id": "5ozbrla",
                                    "meta": {
                                        "bounds": [
                                            -118.2437,
                                            34.0522,
                                            -118.2437,
                                            34.0522
                                        ]
                                    },
                                    "visConfigSettings": {
                                        "radius": {
                                            "type": "number",
                                            "defaultValue": 10,
                                            "label": "layerVisConfigs.radius",
                                            "isRanged": false,
                                            "range": [
                                                0,
                                                100
                                            ],
                                            "step": 0.1,
                                            "group": "radius",
                                            "property": "radius",
                                            "allowCustomValue": true
                                        },
                                        "fixedRadius": {
                                            "defaultValue": false,
                                            "type": "boolean",
                                            "label": "layerVisConfigs.fixedRadius",
                                            "description": "layerVisConfigs.fixedRadiusDescription",
                                            "group": "radius",
                                            "property": "fixedRadius"
                                        },
                                        "opacity": {
                                            "type": "number",
                                            "defaultValue": 0.8,
                                            "label": "layerVisConfigs.opacity",
                                            "isRanged": false,
                                            "range": [
                                                0,
                                                1
                                            ],
                                            "step": 0.01,
                                            "group": "color",
                                            "property": "opacity",
                                            "allowCustomValue": false
                                        },
                                        "outline": {
                                            "type": "boolean",
                                            "defaultValue": false,
                                            "label": "layer.outline",
                                            "group": "display",
                                            "property": "outline"
                                        },
                                        "thickness": {
                                            "type": "number",
                                            "defaultValue": 2,
                                            "label": "layerVisConfigs.strokeWidth",
                                            "isRanged": false,
                                            "range": [
                                                0,
                                                100
                                            ],
                                            "step": 0.1,
                                            "group": "stroke",
                                            "property": "thickness",
                                            "allowCustomValue": true
                                        },
                                        "strokeColor": {
                                            "type": "color-select",
                                            "label": "layerVisConfigs.strokeColor",
                                            "defaultValue": null,
                                            "group": "color",
                                            "property": "strokeColor"
                                        },
                                        "colorRange": {
                                            "type": "color-range-select",
                                            "defaultValue": {
                                                "name": "Global Warming",
                                                "type": "sequential",
                                                "category": "Uber",
                                                "colors": [
                                                    "#5A1846",
                                                    "#900C3F",
                                                    "#C70039",
                                                    "#E3611C",
                                                    "#F1920E",
                                                    "#FFC300"
                                                ]
                                            },
                                            "label": "layerVisConfigs.colorRange",
                                            "group": "color",
                                            "property": "colorRange"
                                        },
                                        "strokeColorRange": {
                                            "type": "color-range-select",
                                            "label": "layerVisConfigs.strokeColorRange",
                                            "group": "color",
                                            "property": "strokeColorRange"
                                        },
                                        "radiusRange": {
                                            "type": "number",
                                            "defaultValue": [
                                                0,
                                                50
                                            ],
                                            "isRanged": true,
                                            "range": [
                                                0,
                                                500
                                            ],
                                            "step": 0.1,
                                            "label": "layerVisConfigs.radiusRange",
                                            "group": "radius",
                                            "property": "radiusRange",
                                            "allowCustomValue": true
                                        },
                                        "filled": {
                                            "type": "boolean",
                                            "label": "layer.fillColor",
                                            "defaultValue": true,
                                            "group": "display",
                                            "property": "filled"
                                        }
                                    },
                                    "config": {
                                        "dataId": "-s30nee",
                                        "label": "point",
                                        "color": [
                                            255,
                                            203,
                                            153
                                        ],
                                        "columns": {
                                            "lat": {
                                                "fieldIdx": 1,
                                                "value": "latitude"
                                            },
                                            "lng": {
                                                "fieldIdx": 2,
                                                "value": "longitude"
                                            },
                                            "altitude": {
                                                "value": null,
                                                "fieldIdx": -1,
                                                "optional": true
                                            }
                                        },
                                        "isVisible": true,
                                        "isConfigActive": false,
                                        "highlightColor": [
                                            252,
                                            242,
                                            26,
                                            255
                                        ],
                                        "hidden": false,
                                        "colorField": {
                                            "name": "value",
                                            "id": "value",
                                            "displayName": "value",
                                            "format": "",
                                            "fieldIdx": 3,
                                            "type": "integer",
                                            "analyzerType": "INT"
                                        },
                                        "colorDomain": [
                                            100,
                                            102,
                                            105,
                                            108,
                                            110,
                                            115,
                                            120,
                                            125,
                                            130,
                                            135,
                                            140,
                                            145,
                                            150,
                                            155,
                                            160,
                                            165,
                                            170,
                                            175,
                                            180,
                                            185,
                                            190,
                                            195,
                                            200,
                                            205,
                                            210
                                        ],
                                        "colorScale": "quantile",
                                        "sizeDomain": [
                                            0,
                                            1
                                        ],
                                        "sizeScale": "linear",
                                        "sizeField": null,
                                        "visConfig": {
                                            "radius": 10,
                                            "fixedRadius": false,
                                            "opacity": 0.8,
                                            "outline": false,
                                            "thickness": 2,
                                            "strokeColor": null,
                                            "filled": true
                                        },
                                        "textLabel": [
                                            {
                                                "field": null,
                                                "color": [
                                                    255,
                                                    255,
                                                    255
                                                ],
                                                "size": 18,
                                                "offset": [
                                                    0,
                                                    0
                                                ],
                                                "anchor": "start",
                                                "alignment": "center",
                                                "outlineWidth": 0,
                                                "outlineColor": [
                                                    255,
                                                    0,
                                                    0,
                                                    255
                                                ],
                                                "background": false,
                                                "backgroundColor": [
                                                    0,
                                                    0,
                                                    200,
                                                    255
                                                ]
                                            }
                                        ],
                                        "colorUI": {
                                            "color": {
                                                "customPalette": {
                                                    "name": "color.customPalette",
                                                    "type": "custom",
                                                    "category": "Custom",
                                                    "colors": []
                                                },
                                                "showSketcher": false,
                                                "showDropdown": false,
                                                "colorRangeConfig": {
                                                    "type": "all",
                                                    "steps": 6,
                                                    "reversed": false,
                                                    "custom": false
                                                }
                                            }
                                        },
                                        "animation": {
                                            "enabled": false
                                        },
                                        "strokeColorField": null,
                                        "strokeColorScale": "quantile"
                                    },
                                    "_oldDataUpdateTriggers": {
                                        "getData": {
                                            "datasetId": "-s30nee",
                                            "dataContainer": {
                                                "_rows": [
                                                    [
                                                        "2024-01-01 00:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        100
                                                    ],
                                                    [
                                                        "2024-01-01 01:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        102
                                                    ],
                                                    [
                                                        "2024-01-01 02:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        105
                                                    ],
                                                    [
                                                        "2024-01-01 03:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        108
                                                    ],
                                                    [
                                                        "2024-01-01 04:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        110
                                                    ],
                                                    [
                                                        "2024-01-01 05:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        115
                                                    ],
                                                    [
                                                        "2024-01-01 06:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        120
                                                    ],
                                                    [
                                                        "2024-01-01 07:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        125
                                                    ],
                                                    [
                                                        "2024-01-01 08:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        130
                                                    ],
                                                    [
                                                        "2024-01-01 09:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        135
                                                    ],
                                                    [
                                                        "2024-01-01 10:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        140
                                                    ],
                                                    [
                                                        "2024-01-01 11:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        145
                                                    ],
                                                    [
                                                        "2024-01-01 12:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        150
                                                    ],
                                                    [
                                                        "2024-01-01 13:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        155
                                                    ],
                                                    [
                                                        "2024-01-01 14:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        160
                                                    ],
                                                    [
                                                        "2024-01-01 15:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        165
                                                    ],
                                                    [
                                                        "2024-01-01 16:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        170
                                                    ],
                                                    [
                                                        "2024-01-01 17:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        175
                                                    ],
                                                    [
                                                        "2024-01-01 18:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        180
                                                    ],
                                                    [
                                                        "2024-01-01 19:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        185
                                                    ],
                                                    [
                                                        "2024-01-01 20:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        190
                                                    ],
                                                    [
                                                        "2024-01-01 21:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        195
                                                    ],
                                                    [
                                                        "2024-01-01 22:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        200
                                                    ],
                                                    [
                                                        "2024-01-01 23:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        205
                                                    ],
                                                    [
                                                        "2024-01-02 00:00:00",
                                                        34.0522,
                                                        -118.2437,
                                                        210
                                                    ]
                                                ],
                                                "_numColumns": 4
                                            },
                                            "filteredIndex": [
                                                0,
                                                1,
                                                2,
                                                3,
                                                4,
                                                5,
                                                6,
                                                7,
                                                8,
                                                9,
                                                10,
                                                11,
                                                12,
                                                13,
                                                14,
                                                15,
                                                16,
                                                17,
                                                18,
                                                19,
                                                20,
                                                21,
                                                22,
                                                23,
                                                24
                                            ]
                                        },
                                        "getMeta": {
                                            "datasetId": "-s30nee"
                                        },
                                        "getLabelCharacterSet-0": null
                                    },
                                    "isValid": true,
                                    "errorMessage": null
                                }
                            ]
                        ]
                    }
                    rootRef={
                        bottomWidgetRef
                    }
                    theme={theme}

                />}
            </ThemeProvider>
        </>

    )
}

export default App
