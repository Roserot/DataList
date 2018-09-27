import * as React from 'react';
import Header from "./Header/Header";
import DataList from "./DataList";
import css from './App.css'
import {Getter} from "../model/DataList/Getter";
import {Dispatcher} from "../store/DataList";

/**
 * @author Alexander Bryuhanov <br.sani4@gmail.com>
 * @version 1.0.0
 */
export default class App extends React.Component {
    render() {
        const contCss = {
            maxWidth: '1366px',
            padding: '0 15px',
            margin: 'auto'
        };
        return (
            <div>
                <div className="container" style={contCss}>
                    {/*<Header/>*/}
                    <DataList />
                </div>
            </div>
        );
    }

    componentDidMount() {
        Getter.wsConnect();
    }

    static addChanges(newData) {
        Dispatcher.get().dispatch({
            type: Dispatcher.UPDATE_DATA_LIST,
            data: newData
        });
    }

    // static con() {
    //     Getter.wsConnect();
    // }
}