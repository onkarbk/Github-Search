import React, {Fragment, Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from './components/pages/About';
// import PropTypes from 'prop-types'


class App extends Component{

  state = {
    users: [],
    loading: false,
    alert: null
  }


  // static propTypes = {
  //   searchUsers: PropTypes.func.isRequired,
  // }
  // async componentDidMount() {
  //   this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users: res.data, loading: false});
  // }

  searchUsers = async (text) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false});
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}});
    setTimeout(()=> this.setState({alert: null}), 5000)
  }

  render() {
    const {users, loading} = this.state;

    return (
      <Router>
      <div className="App">
        <Navbar title="GitHub Search" icon="fab fa-github"/>
        
        <div className="container">
        <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props =>(
            <Fragment>
              <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                showClear={this.state.users.length > 0 ? true : false} 
                setAlert={this.setAlert}
              />
              <Users loading={loading} users={users}/>
            </Fragment>
            )}>
            </Route>
            <Route exact path='/about' component={About} />
          </Switch>
          
        </div>
      </div>
      </Router>
    );
  }
}



export default App;
