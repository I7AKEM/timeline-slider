import './App.css'
import styled, {ThemeProvider} from "styled-components";
import {theme} from "./styles";
import {useEffect, useState} from "react";
import BottomWidget from "./components/bottom-widget.tsx";
import {DataContainerInterface, getFieldValueAccessor, getTimestampFieldDomain} from "./util";
import Papa from "papaparse"
import {RowDataContainer} from "./util/row-data-container.ts";
import {Field} from "./types";
import HistogramPlotFactory from "./components/histogram-plot.tsx";
import {BottomWidgetInner} from "./components/styled-components.tsx";


function App() {
    const [filter, setFilter] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>([])
    let fields: Field[] = []
    const HistogramPlot = HistogramPlotFactory();
    useEffect(() => {
        // fetch two files dataset and filter then change the state of loading to true
        Promise.all([
            fetch('./dataset.json').then(response => response.json()),
            fetch('./filter.json').then(response => response.json())
        ]).then(([dataset, filter]) => {
            if (dataset && filter) {
                setFilter(filter)
            }
        })
        // Example 1
        fetch("./dummy-data.csv")
            .then(response => response.text())
            .then(v => Papa.parse(v, {
                header: false,
                dynamicTyping: true,
                skipEmptyLines: true,

            }))
            .then(results => setData(results.data))
            .catch(err => console.error(err))
        // Example 2
        setTimeout(() => {
            fetch("./dummy-data1.csv")
                .then(response => response.text())
                .then(v => Papa.parse(v, {
                    header: false,
                    dynamicTyping: true,
                    skipEmptyLines: true,

                }))
                .then(results => setData(results.data))
                .catch(err => console.error(err))
        }, 5000)
    }, [])

    useEffect(() => {
        if (data.length) {
            const dc = convertDataToDataContainer(data)
            console.log("data", data)
            // convert data to DataContainerInterface
            let domain = getTimestampFieldDomain(
                dc,
                fields[0].valueAccessor
            )
            setFilter({
                ...filter,
                ...domain,
                value: domain.domain
            })
        }
    }, [data]);

    const convertDataToDataContainer = (data: any) => {
        const fields = getFieldsFromRawData(data)
        data.splice(0, 1)
        const dc: DataContainerInterface = new RowDataContainer({
            rows: data,
            fields: fields
        })

        fields.forEach((field: Field, i: number) => {
            field.valueAccessor = getFieldValueAccessor(field, i, dc)
        })

        return dc
    }

    const getFieldsFromRawData = (data: any): Field[] => {
        fields = []
        if (data.length) {
            const firstRow = data[0]
            console.log(firstRow)
            for (let i = 0; i < firstRow.length; i++) {
                let field = {
                    name: firstRow[i] || `field_${i}`,
                    type: firstRow[i] === "timestamp" ? "timestamp" : 'string',
                    format: firstRow[i] === "timestamp" ? "YYYY-M-D H:m:s" : "",
                    analyzerType: firstRow[i] === "timestamp" ? "DATETIME" : "INT",
                    fieldIdx: i,
                    id: firstRow[i] || `${i}`,
                    displayName: firstRow[i] || "",
                    valueAccessor() {
                    }
                }
                // field.valueAccessor = getFieldValueAccessor(field, i, dc)
                fields.push(field)
            }
        }
        return fields
    }

    const FilterContainer = styled(BottomWidgetInner)`
        padding: 6px 32px 24px 32px;
    `;

    const StyledSliderContainer = styled.div`
        align-items: flex-end;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 24px;

        .timeline-container .kg-slider {
            display: none;
        }

        .playback-controls {
            margin-left: 22px;
        }
    `;


    return (
        <>
            <ThemeProvider theme={theme}>
                {
                    !loading && <>
                        <BottomWidget
                            filters={[
                                filter
                            ]}
                        />
                        <FilterContainer className={"bottom-widget--inner"}>
                            <div className={"time-range-slider"}>
                                <StyledSliderContainer className={"time-range-slider__container"}>
                                    <div className="timeline-container" style={{
                                        width: `calc(100% - ${176}px)`
                                    }}>
                                        <HistogramPlot
                                            width={520}
                                            height={102}
                                            margin={{top: 20, bottom: 20, left: 20, right: 20}}
                                            isRanged={true}
                                            histogram={filter?.enlargedHistogram || []}
                                            value={filter.value}
                                            brushComponent={null}
                                        />
                                    </div>
                                </StyledSliderContainer>
                            </div>
                        </FilterContainer>

                    </>
                }
            </ThemeProvider>
        </>

    )
}

export default App
