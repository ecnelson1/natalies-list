import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'



export default withRouter(class PageHeader extends Component {
    render() {
        return (
            <div className='header'> 
                <NavLink to = "/"> Home </NavLink>
                {
                this.props.token && <> <NavLink to ='/api/favorites'>Favorites</NavLink>
                <NavLink to = './books'>Book Search</NavLink>
                <button onClick={this.handleLogout}>Log Out</button>
                </>
                }
                {!this.props.token && <> <NavLink to = '/login'>Login</NavLink>
                <NavLink to = '/signup'>Sign Up</NavLink>
                </>}
            </div>
         )
    }})