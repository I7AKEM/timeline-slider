import './App.css'
import {ThemeProvider} from "styled-components";
import {theme} from "./styles";
import {useEffect, useState} from "react";
import BottomWidget from "./components/bottom-widget.tsx";
import {DataContainerInterface, getFieldValueAccessor, getTimestampFieldDomain} from "./util";
import Papa from "papaparse"
import {RowDataContainer} from "./util/row-data-container.ts";
import {Field} from "./types";


function App() {
    const [filter, setFilter] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>([])
    let fields: Field[] = []
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
            console.log()
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
                    valueAccessor() {}
                }
                // field.valueAccessor = getFieldValueAccessor(field, i, dc)
                fields.push(field)
            }
        }
        return fields
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {!loading && <BottomWidget
                    datasets={data}
                    filters={[
                        filter
                    ]}

                />}
            </ThemeProvider>
        </>

    )
}

export default App
