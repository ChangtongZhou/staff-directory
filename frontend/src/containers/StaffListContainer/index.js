import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getStaffs, addStaff, deleteStaff} from '../../actions/staffs';
import { getStaffDetail } from '../../actions/staffDetail';
import { toggle } from '../../actions/redirect'
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import StaffList from '../../components/StaffList'

const WithRouterStaffList = withRouter(StaffList);

class StaffListContainer extends Component {
    constructor(props) {
        super(props);
        // this.props.getStaffs();
    }
    componentDidMount() {
        this.props.getStaffs();
        // this.props.toggle(false);
    }

    render() {
        const {staffs, staffDetail} = this.props;
        const staffList = staffs.staff;
        const detail = staffDetail;
       
        // if (staffDetail.detail._id) {
        //     return  <Redirect to={{pathname: `/staff/${staffDetail.detail._id}`}} />;
        // }
        // return this.props.redirect || staffDetail.detail._id ? 
        // (<Redirect to={{pathname: `/staff/${staffDetail.detail._id}`}} />)
        // : 
        return (
            <Fragment>
                {
                    staffs.error ? 
                    <p style={{color: 'red'}}> Cannot fetch staffs... </p> : 
                    StaffList.length > 0 
                    && 
                    <WithRouterStaffList 
                        staffList = {staffList} 
                        addStaff = {this.props.addStaff} 
                    />  
                }
                {/* {staffDetail.detail.name && } */}
                {/* <p>{staffDetail.detail.name}</p> */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
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
        toggle: (val) => {
            dispatch(toggle(val));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffListContainer);