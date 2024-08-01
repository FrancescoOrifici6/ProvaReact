import { useState, useEffect } from "react";
import axios from "axios";
import { columnsDispatcher, entityDispatcherUrl } from "../services/entityHandler.service";

export const useGetArchiveData = (entity) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addRow, setAddRow] = useState(false);

    useEffect(() => {
        // const token = JSON.parse(sessionStorage.getItem('token_current')).token
        const entityUrl = entityDispatcherUrl(entity);
        const tokens = JSON.parse(sessionStorage.getItem('token_current'));
        console.log(tokens);
        const fetchData = async () => {
            try {
                const response = await axios.get(entityUrl,
                    {
                        headers: {
                            Authorization: `Bearer ${tokens}`
                        }
                    })
                const columns = columnsDispatcher(entity);
                await checkColsData(columns);

                const archiveData = {
                    cols: columns,
                    rows: response.data
                }

                setData(archiveData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (entity) {
            fetchData();
        }
    }, [entity]);




    const checkColsData = async (colsArray) => {

        for (let index = 0; index < colsArray.length; index++) {
            const element = colsArray[index];
            if (element.entity) {
                const colData = await fetchColsData(element);
                console.log('colsdata', colData);
            }

        }

    }







    const storeColumnFilter = (updateColumnFilter) => {

        if (updateColumnFilter) {
            const clone = data;

            // aggiorno le colonne in modo da poter salvare il valore del filtro modificato
            // for (let col of clone.cols) {

            //     if (col.header === updateColumnFilter.header) {
            //         col = Object.assign(col, col, updateColumnFilter);
            //     }

            // }

            for (let index = 0; index < data.cols.length; index++) {
                const col = data.cols[index];
                if (col.header === updateColumnFilter.header) {
                    data.cols[index] = updateColumnFilter;
                }

            }

            setData(clone);
        }

    }


    const getObjectKeysByCols = (currentColumns) => {

        const newArchiveItem = {};

        for (let col of currentColumns) {

            if (col.field && col.field.length) {
                newArchiveItem[col.field[0]] = null;
            }

        }

        return newArchiveItem;
    }



    const addingRow = () => {
        const newArchiveItem = getObjectKeysByCols(data.cols);
        const clone = data;
        clone.rows.unshift(newArchiveItem)
        setData(clone);
        setAddRow(true);
    }


    const fetchColsData = async (col) => {

        const tokens = JSON.parse(sessionStorage.getItem('token_current'));
        const apiUrl = entityDispatcherUrl(col.entity);

        try {
            const res = await await axios.get(apiUrl,
                {
                    headers: {
                        Authorization: `Bearer ${tokens}`
                    }
                });
            col.columnData = res.data;

        } catch (err) {
            console.log('http error');
        }

    }



    const dataUpdate = (rowToAdd) => {

        const clone = data;

        if (addRow) {

            for (let item of clone.rows) {
                if (item.id === null) {
                    item = Object.assign(item, item, rowToAdd);
                }
            }

            setAddRow(false);

        } else {

            for (let item of clone.rows) {
                if (item.id === rowToAdd.id) {
                    item = Object.assign(item, item, rowToAdd);
                }
            }

        }

        setData(clone);

    }

    return { data, loading, dataUpdate, addingRow, storeColumnFilter };
};