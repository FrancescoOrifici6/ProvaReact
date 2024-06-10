export const entityDispatcherUrl = (entity) => {
    return entitySchema[entity];
}


const entitySchema = {
    'Difetto': 'archiviodifetti/api/Difetto'
}





export const columnsDispatcher = (entity) => {
    return colsSchema[entity];
}



export const dateFormatter = (value) => {
    console.log('custom date', value);
}


export const colsSchema = {
    'Difetto': [
        {
            header: 'ID',
            field: 'id',
            width: '70px'
        },
        {
            header: 'Nome',
            field: 'nome',
            width: '270px'
        },
        {
            header: 'Data',
            field: 'creazione',
            width: '170px',
        }
    ]
}