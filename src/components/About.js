import {React, Component} from 'react';
import { connect } from 'react-redux';
import NavBar from "./NavBar";

class About extends Component{
    
    componentDidMount(){
        if(localStorage.getItem('auth') === null){
            console.log(this.props);
            this.props.history.push("/login")
        }
    }
    
    render(){
        console.log("All Data (props) :: " , this.props);

        return(
            <div>
                <NavBar />
                <br/><br/>
                About
            </div>
        )
    }
}

export default connect()(About);