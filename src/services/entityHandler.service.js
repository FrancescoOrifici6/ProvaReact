
// entity data dispatcher 
// fornisce in base all'entità i dati della tabella chiamata
export const entityDispatcherUrl = (entity) => {
    return entitySchema[entity];
}


const entitySchema = {
    'Difetto': 'archiviodifetti/api/Difetto',
    'Origine': 'archiviodifetti/api/Origine',
    'Gruppo': 'archiviodifetti/api/Gruppo',
    'Immaginedifetto': 'archiviodifetti/api/Immaginedifetto',

}





export const columnsDispatcher = (entity) => {
    return colsSchema[entity];
}




// columns config
export const colsSchema = {
    'Difetto': [
        {
            header: 'ID',
            field: ['id'],
            width: '70px',
            editable: false,
            type: 'number',
            sortable: true,
        },
        {
            header: 'Nome',
            field: ['nome'],
            width: '270px',
            editable: true,
            type: 'text',
            sortable: true,
        },
        {
            header: 'Data',
            field: ['creazione'],
            width: '170px',
            format: 'dd/mm/YYYY',
            editable: false,
            type: 'date',
            sortable: true,
        },
        {
            header: 'Origine',
            field: ['origineId', 'descrizione'],
            width: '170px',
            entity: 'Origine',
            editable: true,
            type: 'select',
        },
        {
            header: 'Gruppo',
            field: ['gruppoId', 'descrizione'],
            width: '250px',
            entity: 'Gruppo',
            editable: true,
            type: 'select'
        },
    ]
}