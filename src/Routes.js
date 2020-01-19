import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import UpdateUser from './user/UpdateUser'
import Home from './core/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/user/:id" exact component={UpdateUser}/>
                <Route path="/signup" exact component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes

