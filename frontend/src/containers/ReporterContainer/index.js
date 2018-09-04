import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getStaffs, addStaff, deleteStaff} from '../../actions/staffs';
import { getStaffDetail, editStaff } from '../../actions/staffDetail';
import {getReporters} from '../../actions/directReporters'
import {withRouter} from 'react-router-dom';

import DirectReporters from '../../components/DirectReporters'
const WithRouterDirectReporters = withRouter(DirectReporters);

class ReporterContainer extends Component {
    componentDidMount() {
        console.log('in dr page')
        this.props.getReporters(this.props.match.params.id);
    }

    render() {
        const {directReporters} = this.props;
        return (
            <Fragment>
                {
                    directReporters.error? 
                    <p style={{color: 'red'}}> Cannot fetch direct reporters... </p> : 
                    directReporters.data.length > 0
                    && 
                    // <p>Hi</p>
                    // <p>{directReporters.data[0].name}</p>
                    <WithRouterDirectReporters 
                        directReporters = {directReporters.data} 
                        getReporters = {this.props.getReporters}
                    />
                }
                {/* {staffDetail.detail.name && } */}
                
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        directReporters: state.directReporters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStaffs: () => {
            dispatch(getStaffs());
        },
        deleteStaff: (id) => {
            dispatch(deleteStaff(id));
        },
        addStaff: (newStaff) => {
            dispatch(addStaff(newStaff));
        },
        getStaffDetail: (id) => {
            dispatch(getStaffDetail(id));
        },
        editStaff: (id, newStaff) => {
            dispatch(editStaff(id, newStaff));
        },
        getReporters: (id) => {
            dispatch(getReporters(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReporterContainer);