import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getStaffs, addStaff, deleteStaff} from '../../actions/staffs';
import { getStaffDetail, editStaff } from '../../actions/staffDetail';
import {getReporters} from '../../actions/directReporters'
import {withRouter} from 'react-router-dom';

import StaffDetail from '../../components/StaffDetail'
const WithRouterStaffDetail = withRouter(StaffDetail);

class ReporterContainer extends Component {
    componentDidMount() {
        console.log('in dr page')
        this.props.getReporters(this.props.match.params.id);
    }

    render() {
        const {directReporters} = this.props;
        console.log(`directReporters in DR container: ${JSON.stringify(directReporters, null, 2)}`);
        // console.log(`this.props in list contrainer: ${JSON.stringify(this.props, null, 2)}`)
        // const {error, isLoading} = staffs;
        // const staffList = staffs.staff;
        // const detail = staffDetail;
        return (
            <Fragment>
                <p>hi</p>
                {
                    directReporters.error? 
                    <p style={{color: 'red'}}> Cannot get staff... </p> : 
                    directReporters
                    && 
                    <p>hi</p>
                    // <WithRouterStaffDetail 
                    //     directReporters = {directReporters} 
                    //     getReporters = {this.props.getReporters}
                    // />
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