import React, { Component } from 'react'
import { signUpUser } from '../api-utils'

export default class SignupPage extends Component {
    state = {
        email:'',
        password:''
      }
      handleEmail = e => { this.setState({ email: e.target.value }) }

      handlePassword = e => { this.setState({password: e.target.value }) }

      handleSubmit = async e => {
        e.preventDefault();
        const token = await signUpUser(this.state.email, this.state.password);
        this.props.handleTokenChange(token);
        this.props.history.push('/books');
      }

          render() {
              return (
                <div>
                  <h1>Sign Up to make a Reading List!</h1>
                <form onSubmit={this.handleSubmit}>
                  <input value = {this.state.email} onChange = {this.handleEmail} placeholder = 'Email' />
                  <input value = {this.state.password} onChange={this.handlePassword} placeholder = 'Password'/>
                  <button>Submit</button>
                </form>
                </div>
              )
          }
    }