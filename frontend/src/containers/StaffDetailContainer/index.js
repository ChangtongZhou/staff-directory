import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getStaffs, addStaff, deleteStaff} from '../../actions/staffs';
import { getStaffDetail, editStaff } from '../../actions/staffDetail';
import {getReporters} from '../../actions/directReporters'
import {toggle} from '../../actions/redirect';
import {withRouter} from 'react-router-dom';

import {Button} from '@material-ui/core';

import StaffDetail from '../../components/StaffDetail'
const WithRouterStaffDetail = withRouter(StaffDetail);

class StaffDetailContainer extends Component {
    // constructor(props) {
    //     super(props)
    //     console.log('mounting? ')
    //     this.props.getStaffDetail(this.props.match.params.id)
    // }
    componentDidMount() {
        // console.log('mounting? ')
        this.props.getStaffDetail(this.props.match.params.id)
    }

    render() {
        const {staffDetail} = this.props;
        console.log(`staffDetail in StaffList container: ${JSON.stringify(staffDetail, null, 2)}`);
        if (staffDetail.error) {
             if (staffDetail.error.response.data.error) {
                return (
                    <div> 
                        <p style={{color: 'red'}}> {staffDetail.error.response.data.error} </p>
                        <WithRouterStaffDetail 
                            staffDetail = {staffDetail} 
                            editStaff = {this.props.editStaff} 
                            getStaffDetail = {this.props.getStaffDetail} 
                            getReporters = {this.props.getReporters}
                        />
                        
                    </div>
                )
             } else {
                return <p style={{color: 'red'}}> {staffDetail.error.response.data} </p>;
             }
        } else {
            return (
                <Fragment>
                   
                    <WithRouterStaffDetail 
                        staffDetail = {staffDetail} 
                        editStaff = {this.props.editStaff} 
                        getStaffDetail = {this.props.getStaffDetail} 
                        getReporters = {this.props.getReporters}
                        deleteStaff = {this.props.deleteStaff}
                    />
                    
                </Fragment>
            )
        }
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