import './App.css'
import {ThemeProvider} from "styled-components";
import {theme} from "./styles";
import {createRef} from "react";
import BottomWidget from "./components/bottom-widget.tsx";


function App() {
    const bottomWidgetRef = createRef<HTMLDivElement>();
    return (
        <>
            <ThemeProvider theme={theme}>
                <BottomWidget
                    datasets={
                        {
                            datasets: {
                                data: {
                                    allData: [],
                                    fields: []
                                }
                            }
                        }
                    }
                    filters={[
                        {
                            dataId: 'data',
                            id: 'time',
                            name: 'time',
                            type: 'timeRange',
                            value: [
                                0,
                                100
                            ],
                            enlarged: false,
                            plotType: 'histogram',
                            yAxis: null
                        }
                    ]}
                    animationConfig={
                        {
                            currentTime: 0,
                            speed: 1,
                            domain: [0, 100],
                            step: 1,
                            isPlaying: false,
                            width: 800,
                            height: 800
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
                        800
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
                            {
                                config: {
                                    animation: {
                                        enabled: false
                                    },
                                    isVisible: false
                                }
                            }
                        ]
                    }
                    rootRef={
                        bottomWidgetRef
                    }
                    theme={theme}

                />
            </ThemeProvider>
        </>

    )
}

export default App
