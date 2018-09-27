import * as React from 'react';

export default function TableTitles (props) {
    const {names} = props;
    const nameEl = names.map((name, i) => <td key={i} id={i} onClick={sort}>{name}</td>);

    const state = {

    };

    function sort(e) {
        e.preventDefault();
        console.log(e.target.id);

    }

    return <tr className="tableTitles">{nameEl}</tr>;
};
