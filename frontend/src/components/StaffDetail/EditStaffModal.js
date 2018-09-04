import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Modal, Button, TextField, InputAdornment, IconButton, Paper} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
  
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    button: {
        background: 'LightSeaGreen',
        color: 'white',
        '&:hover': {
            background: 'darkCyan'
        },
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        width: 300,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
  });

class AddStaffModal extends Component {
    constructor(props) {
        super(props);
        const detail = this.props.staffDetail;
        this.state = {
          name: detail.detail.name ? detail.detail.name : '', 
          title: detail.detail.title ? detail.detail.title : '', 
          avatar: detail.detail.avatar_url ? detail.detail.avatar_url : '', 
          sex: detail.detail.sex ? detail.detail.sex  : '', 
          email: detail.detail.email ? detail.detail.email : '',
          officePhone: detail.detail.officePhone ? detail.detail.officePhone  : '', 
          cellPhone: detail.detail.cellPhone ? detail.detail.cellPhone : '', 
          sms: detail.detail.SMS ? detail.detail.SMS : '', 
          manager: detail.manager ? detail.manager : '',
        };
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (id) => {
        // this.props.history.push('/addUser');
        console.log(`You want to edit staff: ${id}`);
        let newStaff = {
            name: this.state.name,
            title: this.state.title,
            avatar_url: this.state.avatar,
            sex: this.state.sex,
            email: this.state.email,
            officePhone: this.state.officePhone,
            cellPhone: this.state.cellPhone,
            SMS: this.state.sms,
            manager: this.state.manager,
        }
        this.props.closeModal();
        this.props.editStaff(id, newStaff);
    }

    render() {
        const { classes, staffDetail} = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open = {this.props.openModal}
                    onClose={this.props.closeModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <form>
            
                            
                            
                                <Typography variant="title" id="modal-title">Create New User:</Typography>
                                <div>
                                    <TextField
                                        id="name"
                                        label="Full Name"
                                        name = "name"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="title"
                                        label="Title"
                                        name = "title"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="avatar"
                                        label="Upload Avatar"
                                        name="avatar"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.avatar}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="sex"
                                        label="Sex"
                                        name = "sex"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.sex}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        name="email"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="officePhone"
                                        label="Office Phone"
                                        name="officePhone"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.officePhone}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="cellPhone"
                                        label="Cell Phone"
                                        name="cellPhone"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.cellPhone}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="sms"
                                        label="SMS"
                                        name="sms"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.sms}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="manager"
                                        label="Manager"
                                        name="manager"
                                        className={classNames(classes.margin, classes.textField)}
                                        value={this.state.manager}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>                                
                                
                                <Button variant="contained" className={classes.button} onClick={() => this.handleSubmit(staffDetail.detail._id)}>
                                    <PersonIcon className={classes.leftIcon} />
                                    Edit Staff
                                </Button>
                           
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

AddStaffModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(AddStaffModal);
