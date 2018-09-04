import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import StaffListContainer from '../StaffListContainer';
import StaffDetailContainer from '../StaffDetailContainer';
import ReporterContainer from '../ReporterContainer';

const App = props => {
    return (
        <BrowserRouter>
        <div className="wrapper">
          
            <Route path="/" exact={true} component={StaffListContainer} />
            <Route path="/staff/:id" exact={true} component={StaffDetailContainer} />
            <Route path="staff/directReporters/:id" component={ReporterContainer} />
         
          
          {/* <Route path="/detail/:employeeId" component={Detail} />
          <Route path="/create" component={Create} />
          <Route path="/report" component={Report} />
          <Route path="/edit" component={Edit} /> */}
        </div>
      </BrowserRouter>
        
    )
}

export default App;