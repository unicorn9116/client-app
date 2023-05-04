import React, { Component } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {

    componentDidMount(){
        if(localStorage.getItem('auth') === null){
            console.log(this.props);
            // this.props.history.push("/login")
        }
    }

    loginAPIcall = () => {
    //     axios.post("http://localhost:8000/auth/register", {})
    //   .then((response) => {
    //       var data = response.data.access_token;
    //       localStorage.setItem('login', data);
    //   });
    // alert("ok");
    localStorage.setItem('auth', true);
    this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h2> Login Page </h2>
                
                <div className="ui placeholder segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                            <div className="ui form">
                                <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                <input type="text" placeholder="Username" />
                                <i className="user icon"></i>
                                </div>
                                </div>
                                <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                <input type="password" />
                                <i className="lock icon"></i>
                                </div>
                                </div>
                            <div className="ui blue submit button" onClick={this.loginAPIcall}>Login</div>
                            </div>
                            </div>
                        <div className="middle aligned column">
                            <Link to="/register" className="ui big button">
                            <i className="signup icon"></i>
                            Register (with formik)
                            </Link>
                        </div>
                    </div>
                    <div className="ui vertical divider">
                    Or
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;