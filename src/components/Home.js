import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getHomeData } from '../actions';
import { apiCalls } from '../utils/api';

import NavBar from "./NavBar";

class Home extends Component {

    async componentDidMount(){
        if(localStorage.getItem('auth') === null){
            console.log(this.props);
            this.props.history.push("/login")
        }
        const data = this.props;

        const check = await apiCalls("get", "/posts");
        this.props.getHomeData(check.data);

    }

    titleData() {
        return(
            this.props.homeData && this.props.homeData.length > 0  ?
            this.props.homeData.map((data, index) => {
                return(
                    <div className="column" key={data.id}>
                        <h2> {data.title} </h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                )
            })
            :
            <h2> Loading data...! </h2>
        )
    }

    render() {
        console.log("All Data (props) :: " , this.props);

        return (
            <div>
                <NavBar />
                <br /><br />
                <div className="ui two column doubling stackable grid container">
                    {
                    this.titleData()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("All Data (mapStateToProps) ::", state);
    return {
        homeData : state.HomeData 
    };
}

export default connect(mapStateToProps, { 
    getHomeData
 })(Home);