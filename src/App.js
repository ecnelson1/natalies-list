import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import PageHeader from './components/header.js';
import HomePage from './Home/home.js';
import BooksPage from './BookSearchPage/book-list-page.js'
import FavoritesPage from './FavoritesPage/FavoritesPage.js'
import SignUpPage from './AuthPages/signup.js'
import LoginPage from './AuthPages/login.js'
import { getUserFromLocalStorage, putUserInLocalStorage } from './local-staorage-utils.js';


export default class App extends Component {
    state = {
    token: getUserFromLocalStorage()
    }
    handleTokenChange = (token) => { this.setState({ token }) 
    putUserInLocalStorage(token);
} 
    render() {
        return (
            <div>
                <Router>
                    <PageHeader />
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <HomePage {...routerProps} />} 
                        />
                        <Route 
                            path="/books" 
                            exact
                            token={this.state.token}
                            render={(routerProps) => <BooksPage token={this.state.token} {...routerProps} />} 
                        />
                        <Route 
                            path="/api/favorites" 
                            exact
                            token={this.state.token}
                            render={(routerProps) => <FavoritesPage token={this.state.token} {...routerProps} />} 
                        />
                        <Route 
                            path="/signup" 
                            exact
                            render={(routerProps) => <SignUpPage handleTokenChange={this.handleTokenChange} {...routerProps} />} 
                        />
                        <Route 
                            path="/login" 
                            exact
                            render={(routerProps) => <LoginPage handleTokenChange={this.handleTokenChange} {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}
