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
                            "domain": null,
                            "currentTime": null,
                            "speed": 1,
                            "isAnimating": false,
                            "timeFormat": null,
                            "timezone": null,
                            "defaultTimeFormat": null,
                            "hideControl": false,
                            "duration": null
                        }
                    }
                    visStateActions={
                        {
                            setFilter: () => {
                            },
                            removeFilter: () => {
                            },
                            enlargeFilter: () => {
                            },
                            toggleFilter: () => {
                            },
                            setLayerAnimationTime: () => {
                            },
                            setLayerAnimationSpeed: () => {
                            },
                            setLayerAnimationDomain: () => {
                            },
                            startLayerAnimation: () => {
                            },
                            stopLayerAnimation: () => {
                            },
                            setLayerAnimation: () => {
                            },
                            setLayerAnimationConfig: () => {
                            }
                        }
                    }
                    containerW={
                        2029
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
                    sidePanelWidth={
                        200
                    }
                    layers={
                        [
                            // {
                            //     config: {
                            //         animation: {
                            //             enabled: false
                            //         },
                            //         isVisible: false
                            //     }
                            // }
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
