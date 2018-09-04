import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Avatar, Paper, Divider, Typography, Button, IconButton} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import AddIcon from '@material-ui/icons/Add';
import AddStaffModal from './AddStaffModal';

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
      textAlign: "right",
      margin: theme.spacing.unit,
    },
    icons: {
      fontSize: 36,
      color: 'blue'
    },
    bootstrapInput: {
      borderRadius: 20,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 12px',
      width: '380px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapFormLabel: {
      fontSize: 18,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

// Compare staff names
function desc (a, b) {
  if(b.name < a.name) {
    return -1;
  } else if (b.name > a.name) {
    return 1;
  } else {
    return 0;
  }
}

// Sort staff names
function sorting(order) {
  return order === 'desc' ? (a, b) => desc(a, b) : (a, b) => -desc(a, b);
}

class StaffList extends Component {
  state = {
    searchInput: '',
    order: 'asc',
    openModal: false
  }
 
  handleSearchInput = (e) => {
    this.setState({searchInput: e.target.value});
  }

  handleSearch = (staff) => {
    let matchesStaffs = [staff.name, staff.title, staff.sex];
    let flag = matchesStaffs.some(elem => {
        if(typeof elem !== 'string') {
            elem = '' + elem;
            return elem === this.state.searchInput;
        } else {
            let regex = new RegExp(`^${this.state.searchInput}`, 'i');
            let retVal = elem.match(regex);
            return retVal != null;
        }
    })
    return flag; 
  }

  handleRequestSort = (e) => {
    let order = 'desc';
    
    if (this.state.order === 'desc') {
        order = 'asc';
    }
    this.setState({ order});
    
  }

  openModalHandler = () => {
    console.log('You clicked open modal')
    this.setState({ openModal: true });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  };

  seleteStaff = (id) => {
    // this.props.toggle(true);
    console.log(`you seleted staff: ${id}`);
    this.props.history.push(`/staff/${id}`);
    // this.props.getStaffDetail(id);
  }

  render() {
    const {classes, staffList} = this.props;
    return (
      <Paper className={classes.root}>
        {/* Title */}
        <Typography variant="display1" align="center" className={classes.typography}>
          Staff Directory
        </Typography>
        <Divider />

        {/* Search bar */}
        <div style={{margin: '25px'}}>
            <SearchIcon style={{marginRight: '5px'}}/>
            <TextField
                placeholder="Search Staff"
                id="bootstrap-input"
                value = {this.state.searchInput}
                onChange={this.handleSearchInput}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.bootstrapFormLabel,
                }}
            />
            <Button variant="fab" mini color="secondary" aria-label="Add" className={classes.button} onClick={this.handleRequestSort}>
              <SortIcon />
            </Button>
            <Button variant="fab" mini color="primary" aria-label="Add" className={classes.button} onClick={this.openModalHandler}>
              <AddIcon />
            </Button>
        </div>
        <Divider />
        
        { /* Display Add Staff Modal */
          this.state.openModal 
          && 
          <AddStaffModal 
            openModal = {this.state.openModal} 
            closeModal = {this.closeModal} 
            addStaff = {this.props.addStaff} 
          />
        }

        { /* Display staff list */
          staffList.length > 0 && 
          <List>
            {/* {console.log(`staffList: ${JSON.stringify(this.props, null, 2)}`)} */}
            {
              staffList
              .sort(sorting(this.state.order))
              .filter(staff => this.handleSearch(staff))
              .map(staff => (
                <ListItem key={staff._id} dense button className={classes.listItem} onClick = {() => this.seleteStaff(staff._id)}>
                  <Avatar alt="Remy Sharp" src={require('../../imgs/avartar1.JPG')} className={classes.bigAvatar}/>
                  {/* <Avatar alt="Remy Sharp" src={require('../../imgs/Avatar2.jpg')} /> */}
                  <ListItemText primary={staff.name} secondary={staff.title} style={{fontSize: "20px"}} />
                  <ListItemText primary={staff.directReports.length} className={classes.count}/>
                  <ListItemSecondaryAction>
                    <ArrowForwardIosIcon className={classes.icons}/>
                  </ListItemSecondaryAction>
                </ListItem>
                
              ))
            }
          </List>
        }
        
      </Paper>
    )
  }

}

StaffList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffList);