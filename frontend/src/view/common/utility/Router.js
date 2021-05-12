import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import StartPage from '../homePage/StartPage';
import SignIn from '../../analyst/SignIn';
import history from '../../../helper/history';
import NewCase from '../../customer/NewCase';
import ListCases from '../../analyst/case/ListCases';
import SignOut from '../../analyst/SignOut';
import EvaluateCase from '../../analyst/case/EvaluateCase';

const RouterCustom = () => (
    <Router history={history}>
      <div>
        <Route exact path='/' component={StartPage}/>
        <Route path='/login' component={SignIn}/>
        <Route path='/new_case' component={NewCase}/>
        <Route path='/cases' component={ListCases}/>
        <Route path='/case/:id' component={EvaluateCase}/>
        <Route path='/sign_out' component={SignOut}/>
      </div>
  </Router>
)

export default RouterCustom;