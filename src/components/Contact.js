import { React, Component } from 'react';
import NavBar from "./NavBar";

class Contact extends Component {

    componentDidMount() {
        if (localStorage.getItem('auth') === null) {
            console.log(this.props);
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <br /><br />
                Contact

                <div>
                    
                </div>

            </div>
        )
    }
}

export default Contact;