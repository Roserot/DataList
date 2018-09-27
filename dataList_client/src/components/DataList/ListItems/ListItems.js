import * as React from 'react';
import SingleItem from "./SingleItem";
import {ObjectUtils} from "../../../lib/ObjectUtils";

export default class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = ListItems.prepareState(props);

    }

    render() {
        const ListRows = this.state.std.map((item, i) =>
            <SingleItem std ={this.state.std} fact={this.state.fact} key={i} index={i} />
        );

        return (
            <tr className="ListItems">
                 <td><input type="checkbox" name={`row-${this.state.id}`}/></td>
                 <td>{this.state.id}</td>
                 {ListRows}
                 <td>{this.state.bornTime}</td>
            </tr>
        )
    }

    static prepareState(props) {
        return (ObjectUtils.assignDeep(
            this.getInitialState(),
            ObjectUtils.getClone(props)
            )
        );
    }

    static getInitialState() {
        return {
            std: null,
            fact: null,
            id: null
        }
    }
}