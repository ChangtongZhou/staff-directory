import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getStaffs, addStaff, deleteStaff} from '../../actions/staffs';
import { getStaffDetail, editStaff } from '../../actions/staffDetail';
import {getReporters} from '../../actions/directReporters'
import {toggle} from '../../actions/redirect';
import {withRouter} from 'react-router-dom';

import StaffDetail from '../../components/StaffDetail'
const WithRouterStaffDetail = withRouter(StaffDetail);

class StaffDetailContainer extends Component {
    // constructor(props) {
    //     super(props)
    //     console.log('mounting? ')
    //     this.props.getStaffDetail(this.props.match.params.id)
    // }
    componentDidMount() {
        console.log('mounting? ')
        this.props.getStaffDetail(this.props.match.params.id)
    }

    render() {
        const {staffDetail, toggle, redirect} = this.props;
        // console.log(`staffDetail in StaffList container: ${JSON.stringify(staffDetail, null, 2)}`);
        // console.log(`this.props in list contrainer: ${JSON.stringify(this.props, null, 2)}`)
        // const {error, isLoading} = staffs;
        // const staffList = staffs.staff;
        // const detail = staffDetail;
        return (
            <Fragment>
                {
                    staffDetail.error? 
                    <p style={{color: 'red'}}> Cannot get staff... </p> : 
                    staffDetail
                    && 
                    // <p>{detail.detail.name}</p>
                    <WithRouterStaffDetail 
                        staffDetail = {staffDetail} 
                        editStaff = {this.props.editStaff} 
                        getStaffDetail = {this.props.getStaffDetail} 
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
        staffDetail: state.staffDetail,
        redirect: state.redirect
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffDetailContainer);