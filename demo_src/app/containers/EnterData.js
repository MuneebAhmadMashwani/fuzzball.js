import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import { browserHistory } from 'react-router';
import { enterData, selectDataset, filterTable, enterWildcards } from '../actions';

class EnterData extends Component {
    constructor(props) {
        super(props);
        const text = this.props.enteredData.map(item => item.name || '').join('\n');
        this.state = {text: text};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSave() {
        const { onData, onDataset, onFilter, onWildcard, dataset } = this.props;
        const newData = this.state.text.split('\n').map(item => ({name: item.trim()})).filter(item => item.name);
        onData(newData);
        if (dataset !== 'custom') {
            onDataset('custom');
            onFilter('');
            onWildcard('');
        }
        this.context.router.push('/');
    }

    render() {
        return (<div style={{backgroundColor: '#ffc571', width: '400px', border: '1px solid black', padding: '10px 20px 10px 20px'}}>
            <p></p>Enter custom search choices below, one choice per line.
            <br /><br />
            <textarea style={{width: '350px', height: '169px'}} value={this.state.text} onChange={this.handleChange} />
            <p></p>
            <input type="button" onClick={this.handleSave} value="Save" disabled={!this.state.text.trim()} />&nbsp;
            <input type="button" onClick={() => this.context.router.push('/')} value="Cancel" />
        </div>);
    }
}

EnterData.contextTypes = {
    router: PropTypes.object
};

EnterData.propTypes = {
    enteredData: PropTypes.array,
    onData: PropTypes.func,
    onDataset: PropTypes.func,
    onFilter: PropTypes.func,
    onWildcard: PropTypes.func,
    dataset: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        enteredData: state.enteredData || [],
        dataset: state.dataset || 'dlc'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onData: data => dispatch(enterData(data)),
        onDataset: dataset => dispatch(selectDataset(dataset)),
        onFilter: filterText => dispatch(filterTable(filterText)),
        onWildcard: wildcards => dispatch(enterWildcards(wildcards))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterData);
