import React from 'react'
import DifettoDetails from './Details/DifettoDetails';


const componentsMap = {
    Difetto: DifettoDetails,
};





function ArchiveDetails({service , ...rest}) {
    const Component = componentsMap[service] || <div> Errore </div>;

    return (
        <Component {...rest}/>
    )
}

export default ArchiveDetails