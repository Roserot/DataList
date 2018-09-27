import * as React from 'react';

/**
 *
 */
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = Header.getInitialState();
    }

    render() {
        setTimeout(() => {
            this.setState({ title: 'title updated' });
        }, 2000);

        return (
            <div className="Header">
                {this.state.title}
            </div>
        );

    }

    static getInitialState() {
        return {
            title: 'title initial'
        };
    }
}