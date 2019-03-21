import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Verify from './components/Auth/Verify'
import Home from './components/home/Home'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import firebase from './Firebase/Config'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { createStore} from 'redux'
import Spinner from './Spinner'
import { setUser, clearUser} from './actions'
import Progress from './Progress'




const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.setUser(user)
                this.props.history.push('/');
            }else{
                this.props.history.push('/home');
                this.props.clearUser();
            }
        })
    }
    
    render(){

        return this.props.isLoading ? <Progress /> : (
        <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Signup" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/verify" component={Verify} />


        </Switch>
         </Router>
        )
    }
}

const mapStateFromProps = state =>({
    isLoading: state.user.isLoading 
})

const RootWithAuth = withRouter(connect(mapStateFromProps, {setUser, clearUser})(Root));


ReactDOM.render(
    <Provider store={store}>
<Router>
    <RootWithAuth />
    </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
