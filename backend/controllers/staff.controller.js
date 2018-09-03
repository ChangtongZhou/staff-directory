const Staff = require('../models/staff.model');

/////////////////////////////////////////////////////////////// Get all staffs ///////////////////////////////////////////////////////////////
const getAll = (req, res) => {
    Staff.find({}, (err, staffs) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({staffs});
        }
    })
}

/////////////////////////////////////////////////////////////// Get one staff by id ///////////////////////////////////////////////////////////////
const getOneById = (req, res) => {
    let managerName = null;
    let numOfDRs = 0;
    Staff.findById(req.params.id, (err, staff) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            // Find number of direct reporters
            if(staff.directReports) {
                numOfDRs = staff.directReports.length;
            }

            // Find manager name
            if (staff.manager) {
                Staff.findById(staff.manager, (err, manager) => {
                    if(err) res.status(500).json({error: err});
                    else {
                        console.log('finding staff manager', manager.name);
                        managerName = manager.name;
                        // console.log(`manager name: ${managerName}`)
                        res.status(200).json({
                            staff,
                            managerName: managerName,
                            numOfDRs: numOfDRs
                        });
                    }
                })
            } else {
                res.status(200).json({
                    staff,
                    managerName: managerName,
                    numOfDRs: numOfDRs
                });
            }            
        }
    })
}

/////////////////////////////////////////////////////////////// Get direct reporters by staff id ///////////////////////////////////////////////////////////////
const getDirectReporters = (req, res) => {
    Staff.findById(req.params.id, (err, staff) => {
        if(err) res.status(500).json({error: err});
        else {
            let drs = staff.directReports;
            Staff.find({}, (err, all) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.status(200).json({
                        reporters: all.filter(s => drs.includes(s.id))
                    });
                }
            })
        }
    })

}

/////////////////////////////////////////////////////////////// Add one staff ///////////////////////////////////////////////////////////////
const addStaff = (req, res) => {
    // When this staff is not assigned with a manager
    // console.log(`req.body.manager: ${req.body.manager}`);
    if (!req.body.manager) {
        Staff.create(req.body, (err, staff) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                // getAll(req, res);
                res.status(201).json({message: 'New staff created!'});
            }
        })
    } else {
        // When this staff is assigned with a manager
        Staff.create(req.body, (err, staff) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                console.log(`New staff is added.`);
                // Find the manager and update his/her direct reports
                Staff.findById(req.body.manager, (err, manager) => {
                    if (err) {
                        console.log(`Manager fetch failed: ${err}`);
                        res.status(500).json({error: err});
                    } else {
                        let newDR = [...manager.directReports, staff._id];
                        // console.log(`Your manager's newDR: ${newDR}`); 
                        // Update manager's direct reports
                        Staff.findByIdAndUpdate(manager._id, {directReports: newDR}, (err) => {
                            if (err) res.status(500).json({error: err});
                            else {
                                res.status(201).json({message: 'New staff created and the managers direct reports are updated!'});
                                // getAll(req, res);
                                // console.log(`Your edited manager's DR, new manager is: ${staff}`);
                                // Get updated staff list
                                // Staff.find({}, (err, staffs) => {
                                //     if (err) res.status(500).json({error: err});
                                //     else {
                                //         res.status(200).json({staffs});
                                //     }
                                // })
                            }
                        })
            
                    }
                })
            }
        })
        
    }
}

/////////////////////////////////////////////////////////////// Edit one staff by id ///////////////////////////////////////////////////////////////
const editStaff = (req, res) => {
    Staff.findById(req.params.id, (err, staff) => {
        if (err) res.status(500).json({error: err});
        else {
            if (staff) {
                // Avoid management circle
                let index = staff.directReports.indexOf(req.body.manager); // check if staff's direct reports has req.body.manager
                // console.log(`index: ${index}`)
                if (staff._id == req.body.manager || index != -1) {
                    console.log(`Management circle is not allowed`);
                    res.status(500).json({error: "Management circle is not allowed"});
                } else if(staff.manager != req.body.manager) {
                    // manager changes
                    // 1. add current staff into new manager's direct reports
                    if (req.body.manager) {
                        Staff.findById(req.body.manager, (err, manager) => {
                            if (err) res.status(500).json({error: err});
                            else {
                                let newDR = [...manager.directReports, staff._id];
                                console.log(`Your new manager's newDR: ${newDR}`); 
                                Staff.findByIdAndUpdate(manager._id, {directReports: newDR}, (err) => {
                                    if (err) res.status(500).json({error: err});
                                })
                            }
                        })
                    }
                    
                    if (staff.manager) {
                        // 2. delete current staff from current manager's direct reports
                        Staff.findById(staff.manager, (err, manager) => {
                            console.log(`hihi trying to delete ,,,,,`)
                            if (err) res.status(500).json({error: err});
                            else {
                                let idx = manager.directReports.indexOf(staff._id);
                                // delete operation using spread and slice
                                let newDR = [...manager.directReports.slice(0, idx), ...manager.directReports.slice(idx + 1)];
                                console.log(`Your current manager's newDR: ${newDR}`); 
                                Staff.findByIdAndUpdate(manager._id, {directReports: newDR}, (err) => {
                                    if (err) res.status(500).json({error: err});
                                })
                            }

                        })
                    }

                    // 3. update current staff:
                    Staff.findByIdAndUpdate(req.params.id, req.body, (err, updatedStaff) => {
                        if (err) res.status(500).json({error: err});
                        else {
                            // res.status(200).json({updatedStaff});
                            res.status(201).json({message: 'The staff is updated!'});
                        }
                    });
                    
                    
                } 
                
            }
        }
    })
}

/////////////////////////////////////////////////////////////// Delete one staff by id ///////////////////////////////////////////////////////////////
const deleteStaff = (req, res) => {
    // Find staff
    Staff.findById(req.params.id, (err, staff) => {
        if(err) res.status(500).json({error: err});
        else {
            // Find staff's manager and delete staff from manager's direct reports
            if(staff.manager) { 
                Staff.findById(staff.manager, (err, manager) => {
                    if(err) res.status(500).json({error: err});
                    else {
                        let idx = manager.directReports.indexOf(staff._id);
                        // delete operation using spread and slice
                        let newDR = [...manager.directReports.slice(0, idx), ...manager.directReports.slice(idx + 1)];
                        console.log(`Your current manager's newDR: ${newDR}`); 
                        Staff.findByIdAndUpdate(manager._id, {directReports: newDR}, (err) => {
                            if (err) res.status(500).json({error: err});
                        })
                    }
                })
            } 

            // Find staff's direct reports and update their manager to null
            if (staff.directReports) {
                staff.directReports.forEach((reporter_id) => {
                    Staff.findByIdAndUpdate(reporter_id, {manager: null}, (err) => {
                        if (err) res.status(500).json({error: err});
                    })
                })
            } 

            // Delete staff
            Staff.findByIdAndRemove(req.params.id, (err) => {
                if (err) res.status(500).json({error: err});
                else {
                    // res.status(200).json({updatedStaff});
                    res.status(201).json({message: 'The staff is deleted!'});
                }
            });

        } 
    })
}

module.exports = {getAll, getOneById, addStaff, editStaff, deleteStaff, getDirectReporters};