import * as React from 'react';

import TableTitles from "./TableTitles";
import ListItems from "./ListItems/ListItems";
import {ObjectUtils} from "../../lib/ObjectUtils";
import * as css from './style.css';
import {DataList as DataListStore} from '../../store/DataList';

export default class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = DataList.prepareState(props);

        this.onUpdateDataList = this.onUpdateDataList.bind(this);

        this.handleStoreListeners();
    }

    render() {
        return (
            <div className={css.main}>
                <table className={css.table} border="1" cellPadding="2" width="100%">
                    {this.renderTableHead()}
                    {this.renderTableBody()}
                </table>
            </div>
        );
    }

    renderTableHead() {
        if (this.state.dataList === null || this.state.dataList.length <= 0) return null;

        const item = this.state.dataList[0];

        const vals = typeof item.vals === 'string'
            ? JSON.parse(item.vals)
            : item.vals;

        const jsonString = vals.std;

        jsonString.born_timestamp = 'born_timestamp';

        const keys = Object.keys(jsonString);

        return (
            <thead>
                <tr>
                    <th rowSpan="2">Check</th>
                    <th rowSpan="2">id</th>
                    <th colSpan="11">Features (std/fact)</th>
                </tr>
                    <TableTitles  names={keys} />
            </thead>
        );
    }

    renderTableBody() {
        return <tbody>{this.renderRows()}</tbody>;
    }

    renderRows() {

        const dataList = this.state.dataList;
        if (dataList === null || dataList.length <= 0) return null;
        return this.state.dataList.map(DataList.renderRow)
        ;
    }



    /**
     * @param {{}} rowData
     * @param {number} index
     * @private
     */
    static renderRow(rowData, index) {
        const parsedVals = JSON.parse(rowData.vals);
        const std = Object.values(parsedVals.std);
        const fact = Object.values(parsedVals.fact);
        const bornTime = rowData.born_timestamp;
        const id = rowData.id;
        return <ListItems key={index} id={id} std={std} fact={fact} bornTime ={bornTime}/>
    }

    static getInitialState() {
        return {
            dataList: null
        };
    }

    /**
     * @param {{}} props
     * @returns {{}}
     */
    static prepareState(props) {
        return ObjectUtils.assignDeep(
            this.getInitialState(),
            ObjectUtils.getClone(props)
        );
    }



    onUpdateDataList() {
        const storeState = DataListStore.get().getState();
        const dataList = storeState ? (storeState.dataList || null) : null;

        if (dataList === null)
            console.warn(`Failed to get rows data from store.`);

        this.setState({ dataList });
    }

    handleStoreListeners() {
        DataListStore.get().addListener(this.onUpdateDataList);
    }
}