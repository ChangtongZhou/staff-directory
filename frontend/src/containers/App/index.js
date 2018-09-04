import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import StaffListContainer from '../StaffListContainer';
import StaffDetailContainer from '../StaffDetailContainer';
import ReporterContainer from '../ReporterContainer';

const App = props => {
  return (
    <BrowserRouter>
      <div className="wrapper">
          <Route path="/" exact={true} component={StaffListContainer} />
          <Route path="/staff/:id" exact={true} component={StaffDetailContainer} />
          <Route path="/staff/:id/directReporters" component={ReporterContainer} />
      </div>
    </BrowserRouter>

  )
}

export default App;