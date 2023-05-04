import React, { Component } from 'react';
import {connect} from 'react-redux';
import { apiCalls } from '../utils/api';
import { Formik, Form } from 'formik';

const invalidFeedback = {
    color: "red"
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                addressLine1: "",
                addressLine2: "",
                state: "",
                country: "",
                cardType: "",
                cardNumber: "",
                cardCVC: "",
                cardExpireMonth: "",
                cardExpireYear: "",
                // terms: false,
            },
            formErrors: {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                addressLine1: "",
                addressLine2: "",
                state: "",
                country: "",
                // terms: false,
            },
            formValidity: {
                email: true,
                password: true,
                firstName: "",
                lastName: "",
                addressLine1: "",
                addressLine2: "",
                state: "",
                country: "",
                cardType: true,
                cardNumber: true,
                cardCVC: true,
                cardExpireMonth: true,
                cardExpireYear: true,
                // terms: false,
            },
            terms: false,
            isSubmitting: false
        };
    }

    componentDidMount() {
        debugger;
        this._isMounted = true;
        if (localStorage.getItem('auth') === null) {
        }else{
            this.props.history.push("/")
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleTermChange = e => {
        e.preventDefault();
        this.setState({
            terms: !this.state.terms
        })
    }

    handleChange = ({ target }) => {
        const { formValues } = this.state;
        formValues[target.name] = target.value;
        this.setState({ formValues });
        this.handleValidation(target);
    };

    handleValidation = target => {
        const { name, value } = target;
        const fieldValidationErrors = this.state.formErrors;
        const validity = this.state.formValidity;
        const isEmail = name === "email";
        const isPassword = name === "password";
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
            ? ""
            : `${name} is required and cannot be empty`;
        if (validity[name]) {
            if (isEmail) {
                validity[name] = emailTest.test(value);
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be a valid email address`;
            }
            if (isPassword) {
                validity[name] = value.length >= 3;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 3 characters minimum`;
            }
        }
        this.setState({
            formErrors: fieldValidationErrors,
            formValidity: validity
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        const { formValues, formValidity } = this.state;
        if (Object.values(formValidity).every(Boolean)) {
            alert("Form is validated! Submitting the form...");

            // POST request using axios with set headers
            const article = { title: 'React POST Request Example' };
            const headers = { 
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            };
            // axios.post('https://reqres.in/api/articles', article, { headers })
            //     // .then(response => this.setState({ articleId: response.data.id }))
            //     .then(response => alert(response))
            //     .catch(alert("Register API fails...!"));
            
            const response = await apiCalls("post", "/posts");
            alert(response);
            this.props.history.push("/login")
            this.setState({ isSubmitting: false });
        } else {
            for (let key in formValues) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                if (target.name === "cardType" || target.name === "cardNumber" || target.name === "cardCVC"
                    || target.name === "cardExpireMonth" || target.name === "cardExpireYear" || target.name === "terms") {
                    // this.handleValidation(target);
                } else {
                    this.handleValidation(target);
                }
            }
            this.setState({ isSubmitting: false });
        }
    };

    render() {
        const { formValues, formErrors, isSubmitting } = this.state;
        console.log(this.props)
        return (
            <div className="container">
                <br/>
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Registration Form</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Formik>
                            <Form onSubmit={this.handleSubmit}>
                                {/* <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${formErrors.email ? "is-invalid" : ""
                                            }`}
                                        placeholder="Enter email"
                                        onChange={this.handleChange}
                                        value={formValues.email}
                                    />
                                    <div className="invalid-feedback">{formErrors.email}</div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${formErrors.password ? "is-invalid" : ""
                                            }`}
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                        value={formValues.password}
                                    />
                                    <div className="invalid-feedback">{formErrors.password}</div>
                                </div> */}

                                {/*  form added  */}
                                <div className="ui form">
                                    <div className="two fields">
                                        <div className="field">
                                            <input
                                                type="text"
                                                name="firstName" id="firstName"
                                                value={formValues.firstName}
                                                onChange={this.handleChange}
                                                placeholder="First Name" />
                                            <div style={invalidFeedback} className="invalid-feedback">{formErrors.firstName}</div>
                                        </div>
                                        <div className="field">
                                            <input
                                                type="text"
                                                name="lastName" id="lastName"
                                                value={formValues.lastName}
                                                onChange={this.handleChange}
                                                placeholder="First Name" />
                                            <div style={invalidFeedback} className="invalid-feedback">{formErrors.lastName}</div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label> Address </label>
                                        <div className="fields">
                                            <div className="twelve wide field">
                                                <input
                                                    type="text"
                                                    name="addressLine1" id="addressLine1"
                                                    value={formValues.addressLine1}
                                                    onChange={this.handleChange}
                                                    placeholder="Address Line 1" />
                                                <div style={invalidFeedback} className="invalid-feedback">{formErrors.addressLine1}</div>
                                            </div>
                                            <div className="four wide field">
                                                <input
                                                    type="text"
                                                    name="addressLine2" id="addressLine2"
                                                    value={formValues.addressLine2}
                                                    onChange={this.handleChange}
                                                    placeholder="Address Line 2" />
                                                <div style={invalidFeedback} className="invalid-feedback">{formErrors.addressLine2}</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="two fields">
                                        <div className="field">
                                            <label>State</label>
                                            <select className="ui fluid dropdown"
                                                name="state"
                                                value={formValues.state}
                                                onChange={this.handleChange}
                                            >
                                                <option value="">State</option>
                                                <option value="MH">Maharashtra</option>
                                            </select>
                                            <div style={invalidFeedback} className="invalid-feedback">{formErrors.state}</div>
                                        </div>
                                        <div className="field">
                                            <label>Country</label>
                                            <select className="ui fluid dropdown" name="country"
                                                value={formValues.country}
                                                onChange={this.handleChange}
                                            >
                                                <option value="">Country</option>
                                                <option value="IN">India</option>
                                            </select>
                                            <div style={invalidFeedback} className="invalid-feedback">{formErrors.country}</div>
                                        </div>
                                    </div>
                                    <h4 className="ui dividing header">Billing Information</h4>
                                    <div className="field">
                                        <label>Card Type</label>
                                        <select className="ui fluid dropdown" name="cardType"
                                            value={formValues.cardType}
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Card Type</option>
                                            <option value="visa">Visa</option>
                                        </select>
                                        <div className="invalid-feedback">{formErrors.cardType}</div>
                                    </div>
                                    <div className="fields">
                                        <div className="seven wide field">
                                            <label>Card Number</label>
                                            <input type="text" name="cardNumber"
                                                value={formValues.cardNumber}
                                                onChange={this.handleChange}
                                                id="cardNumber" maxLength="16" placeholder="Card #" />
                                            <div className="invalid-feedback">{formErrors.cardNumber}</div>
                                        </div>
                                        <div className="three wide field">
                                            <label>CVC</label>
                                            <input type="password" name="cardCVC"
                                                value={formValues.cardCVC}
                                                onChange={this.handleChange}
                                                id="cardCVC" maxLength="3" placeholder="CVC" />
                                            <div className="invalid-feedback">{formErrors.cardCVC}</div>
                                        </div>
                                        <div className="six wide field">
                                            <label>Expiration</label>
                                            <div className="two fields">
                                                <div className="field">
                                                    <select className="ui fluid search dropdown" name="cardExpireMonth"
                                                        value={formValues.cardExpireMonth}
                                                        onChange={this.handleChange}
                                                        id="cardExpireMonth">
                                                        <option value="">Month</option>
                                                        <option value="1">January</option>
                                                        <option value="2">February</option>
                                                        <option value="3">March</option>
                                                        <option value="4">April</option>
                                                        <option value="5">May</option>
                                                        <option value="6">June</option>
                                                        <option value="7">July</option>
                                                        <option value="8">August</option>
                                                        <option value="9">September</option>
                                                        <option value="10">October</option>
                                                        <option value="11">November</option>
                                                        <option value="12">December</option>
                                                    </select>
                                                    <div className="invalid-feedback">{formErrors.cardExpireMonth}</div>
                                                </div>
                                                <div className="field">
                                                    <input type="text" name="cardExpireYear" id="cardExpireYear"
                                                        value={formValues.cardExpireYear}
                                                        onChange={this.handleChange}
                                                        maxLength="4" placeholder="Year" />
                                                    <div className="invalid-feedback">{formErrors.cardExpireYear}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui segment">
                                        <div className="field">
                                            <div className="ui toggle checkbox" name="term" value={formValues.terms} onClick={this.handleTermChange}>
                                                <input type="checkbox" 
                                                    // defaultChecked={this.state.terms}
                                                    onChange={this.handleTermChange}
                                                    checked={this.state.terms}
                                                    value={formValues.terms}
                                                    // onChange={this.handleChange}
                                                    id="terms" name="terms"
                                                    tabIndex="0" className="hidden" />
                                                <label> I Agree Terms and Conditions..! </label>
                                                <div className="invalid-feedback">{formErrors.terms}</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block ui button"
                                    disabled={!this.state.terms}
                                >
                                    {isSubmitting ? "Please wait..." : "Submit"}
                                </button>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return{
        data : "Shravan"
    }
}

export default connect(mapStateToProps)(Register);