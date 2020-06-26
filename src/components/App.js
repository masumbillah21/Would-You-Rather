import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { handleInitialData }  from '../actions/shared'
import Login from './Login'
import QuestionDetails from './QuestionDetails';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import Answered from './Answered';
import NotAnswered from './NotAnswered';
import Nav from './Nav';
import Logout from './Logout';
import NotFound from './NotFound';
import PrivateRoute from '../utils/PrivateRouter'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  
  render() {    
    return (      
      <BrowserRouter>
            <div className="App">
              <Nav/>
                <Fragment>  
                  <Switch>     
                      <Route path='/login/' component={Login} />           
                      <PrivateRoute exact path="/not-aswered" component={NotAnswered}/> 
                      <Redirect exact from="/" to="/not-aswered" />           
                      <PrivateRoute path="/answered" component={Answered} />
                      <PrivateRoute path="/leader-board" component={LeaderBoard} />
                      <PrivateRoute path="/add" component={AddQuestion} />
                      <PrivateRoute path='/questions/:id' component={QuestionDetails} />
                      <PrivateRoute path='/logout' component={Logout} />
                      <PrivateRoute path='*' component={NotFound} />      
                      <Route component={NotFound} />                                   
                  </Switch>    
                </Fragment>              
          </div> 
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    notLoggedIn: authedUser !== null
  }
}
export default connect(mapStateToProps)(App);
