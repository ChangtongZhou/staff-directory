import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, Avatar, Paper, Divider, Typography, Button} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CallIcon from '@material-ui/icons/Call';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailIcon from '@material-ui/icons/Mail';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import EditStaffModal from './EditStaffModal';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      margin: '0 auto',
      fontSize: "20px",
      padding: theme.spacing.unit,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 600,
    },
    bigAvatar: {
      width: 60,
      height: 60,
    },
    typography: {
      padding: theme.spacing.unit,
    },
    count: {
      fontSize: "20px", 
      textAlign: "right"
    },
    icons: {
      fontSize: 36,
      color: '#039BE5'
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class StaffList extends Component {
  state = {
    openModal: false,
    redirect: false
  }
 
  openModalHandler = () => {
    console.log('You clicked open modal')
    this.setState({ openModal: true });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  };

  goBack = () => {
      this.props.history.push('/');
  }

  seleteManager = (id) => {
      if(id) {
        this.props.getStaffDetail(id);
        this.props.history.push(`/staff/${id}`) 
      }
  }

  selectDRs = (id, numOfDRs) => {
      if(numOfDRs > 0) {
        //   this.props.history.push(`/staff/${id}/directReporters`)
        //   this.props.getReporters(id);
        // console.log(`id in detail: ${id}`)
        this.props.history.push(`/staff/${id}/directReporters`)
      }
     
  }
  
  render() {
    const {classes, staffDetail} = this.props;
    // console.log(`this.state.redirect: ${this.state.redirect}`)
    return (
      <Paper className={classes.root}>
        {/* Top Bar */}
        <div>
            <Grid container wrap="nowrap" spacing={16}>
                <Grid item xs={4}>
                    <IconButton className={classes.button} onClick={this.goBack}>
                        <ArrowBackIosIcon className={classes.icons} style={{paddingLeft: "10px"}}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="display1" align="center" className={classes.typography}>
                        Staff
                    </Typography>
                </Grid>
            </Grid>
            
        </div>
        
        { /* Display Add Staff Modal */
          this.state.openModal 
          && 
          <EditStaffModal 
            openModal = {this.state.openModal} 
            closeModal = {this.closeModal} 
            editStaff = {this.props.editStaff} 
            staffDetail = {this.props.staffDetail}
          />
        }
        
        { /* Staff Summary */}
        <List>
            {/* {console.log(`staffDetail: ${JSON.stringify(this.props, null, 2)}`)} */}

            <ListItem dense button className={classes.listItem} style = {{backgroundColor: "#B0BEC5", height: "120px"}}>
                <Avatar alt="Remy Sharp" src={require('../../imgs/avartar1.JPG')} className={classes.bigAvatar}/>
                <ListItemText primary={staffDetail.detail.name} secondary={staffDetail.detail.title} style={{fontSize: "20px"}} />
                <ListItemSecondaryAction>
                    <IconButton className={classes.button} onClick={this.openModalHandler}>
                            <EditIcon style={{fontSize: 36, color: "blue"}}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem dense button className={classes.listItem} onClick = {() => this.seleteManager(staffDetail.detail.manager)}>
                {/* <Avatar alt="Remy Sharp" src={require('../../imgs/avartar1.JPG')} className={classes.bigAvatar}/> */}
                <ListItemText primary="View Manager" secondary={staffDetail.manager ? staffDetail.manager : 'None'} style={{fontSize: "20px"}} />
                <ListItemSecondaryAction>
                    <ArrowForwardIosIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem dense button className={classes.listItem} onClick = {() => this.selectDRs(staffDetail.detail._id, staffDetail.numOfDRs)}>
                <ListItemText primary="View Direct Reports" secondary={staffDetail.numOfDRs} style={{fontSize: "20px"}}/>
                <ListItemSecondaryAction>
                    <ArrowForwardIosIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem dense button className={classes.listItem} onClick = {() => this.seleteStaff(staffDetail.detail._id)}>
                <ListItemText primary="Call Office" secondary={staffDetail.detail.officePhone} style={{fontSize: "20px"}}/>
                <ListItemSecondaryAction>
                    <CallIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem dense button className={classes.listItem} onClick = {() => this.seleteStaff(staffDetail.detail._id)}>
                <ListItemText primary="Call Cell" secondary={staffDetail.detail.cellPhone} style={{fontSize: "20px"}}/>
                <ListItemSecondaryAction>
                    <PhoneIphoneIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem dense button className={classes.listItem} onClick = {() => this.seleteStaff(staffDetail.detail._id)}>
                <ListItemText primary="SMS" secondary={staffDetail.detail.SMS} style={{fontSize: "20px"}}/>
                <ListItemSecondaryAction>
                    <TextsmsIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem dense button className={classes.listItem} onClick = {() => this.seleteStaff(staffDetail.detail._id)}>
                <ListItemText primary="Email" secondary={staffDetail.detail.email} style={{fontSize: "20px"}}/>
                <ListItemSecondaryAction>
                    <MailIcon className={classes.icons}/>
                </ListItemSecondaryAction>
            </ListItem>

        </List>
        
        
      </Paper>
    )
  }

}

StaffList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffList);