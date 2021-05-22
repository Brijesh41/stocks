import React, { Component } from 'react';

// import Plot from 'react-plotly.js';
import { Bar } from 'react-chartjs-2';


import 'bootstrap/dist/css/bootstrap.css'

// API: YCZ9WOOOQ2UGU5TJ


import axios from 'axios';

class Stocks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: "",
            tickersearch: "",
            listofstocks: [],
            answer: null,
            searchresults: [],
            searchbar: ""

        }
    }




    styles = {
        fontWeight: 'bold',
        // border: '2px solid #696d70',
        width: '100%',
        fontSize: '20px',
        width: '100%',
        color: '#ececec',
        backgroundColor: '#30475e',
        display: 'inline-block',
        textAlign: 'center'
    };

    navbar = {
        width: '100%'
    }

    buttonstyle = {
        color: '#30475e',
        width: '50%',
        backgroundColor: '#f2a365',

    }

    smallbutton = {

        display: 'inline-block',
        padding: '10px 10px',
        fontSize: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        backgroundColor: '#f2a365',
        borderRadius: '5px',
        color: '#ececec',
        boxShadow: '0 9px #30475e'
    }


    background = {
        backgroundColor: '#30475e',
        border: '2px solid #696d70',
        // #6c757d

    }


    leftcontainer = {
        float: 'left',
        width: '20%',
        border: '2px solid #696d70',
        backgroundColor: 'black',
        height: '1000px'
    }

    rightcontainer = {
        float: 'right',
        width: '80%',
        border: '2px solid #696d70',
        backgroundColor: 'black',
        height: '1000px'
    }

    InputValue = (e) => {
        this.setState({ tickersearch: e.target.value });
    }
    InputValue2 = async (e) => {
        this.setState({ searchbar: e.target.value });
        await this.bestsearch();
    }

    handleRemove = (item) => {

        console.log("Remove particular item");
        console.log(item);

        const updatedlist = this.state.listofstocks.filter((list) => list.id !== item);
        console.log("Updated List" + updatedlist);
        // if(updatedlist==)

        this.setState({ listofstocks: updatedlist });
    }



    searchtickets = async () => {

        console.log(this.state.tickersearch);
        console.log("Call API from here")

        let API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.tickersearch}&outputsize=compact&apikey=YCZ9WOOOQ2UGU5TJ`;

        let response = await axios.get(API_Call)
        console.log(JSON.stringify(response))
        var answer;

        console.log("response" + response.data);
        const price = response.data["Global Quote"]["05. price"]
        console.log("price", price)

        

        if (this.state.listofstocks.includes(this.state.tickersearch)) {
            // console.log("")
            alert("Item Already Present")

        }
        else if(
            price===undefined
            ){
            alert("Please enter correct symbol")
        }
        else {
            var stocknameandid = { id: this.state.tickersearch, name: this.state.tickersearch, value: price };

            this.setState({ listofstocks: this.state.listofstocks.concat(stocknameandid), tickersearch: "" });
            console.log("After update" + this.state.listofstocks)
        }
    }

    deleteitems = () => {
        this.setState({ listofstocks: [] });
    }

    bestsearch = async () => {
        console.log(this.state.searchbar)

        let API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&symbol=${this.state.searchbar}&outputsize=compact&apikey=YCZ9WOOOQ2UGU5TJ`;

        let response = await axios.get(API_Call)
        console.log(JSON.stringify(response))
        var answer;





    }





    render() {
        // this.backend();
        let graphData;
        if (this.state.listofstocks.length > 0) {
            graphData = {
                labels: this.state.listofstocks.map((stockData) => {
                    return stockData.name
                }),
                datasets: [
                    {
                        label: 'STOCK DATA',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.state.listofstocks.map((stockData) => {
                            return stockData.value
                        })
                    }
                ]
            }
            console.log(graphData);

        }

        // {'body { background-color: red; }'}
        // className={'badge m-2 badge-warning'}

        return (
            <div style={{ backgroundColor: 'black' }}>
                <div style={this.background} >
                    <div style={this.navbar}>
                        <span style={this.styles} className={'badge m-2 badge-warning'} > Stock Live Update </span>

                        <button style={this.buttonstyle} className="btn btn-secondary btn-sm">About the developer</button>
                        <button style={this.buttonstyle} className="btn btn-secondary btn-sm">Home</button>

                    </div>

                    <div style={this.leftcontainer} >


                        <h1>{this.state.person}</h1>
                        <input onChange={this.InputValue} style={{ backgroundColor: '#ececec' }} className="text-box" type="text"></input>
                        <button onClick={this.searchtickets} style={this.smallbutton} className="button add-button">Add</button>
                        <ul>
                            {this.state.listofstocks.map(list => (<li key={list.id} style={{ backgroundColor: 'black', color: 'white' }}>{list.name}
                                { <button type="button" style={this.smallbutton} onClick={() => this.handleRemove(list.id)}>
                                    Remove
                    </button>}
                            </li>))}
                        </ul>

                        {/* <input onChange={this.InputValue2} style={{ backgroundColor: '#4bc0c0' }} className="text-box" type="text"></input>

                        <ul>

                            {this.state.searchresults.map(list => (<li key={list.id}>{list.name}</li>))}
                        </ul> */}

                        <button style={this.smallbutton} onClick={this.deleteitems} className="button add-button">Clear All</button>

                    </div>

                    <div style={this.rightcontainer}>
                        <div style={{ textAlign: 'center', color: "#ececec" }}><h4 >Bar Charts </h4></div>


                        {graphData && <Bar
                            data={graphData}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Stock Prices',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />}




                    </div>

                </div>
            </div>

        );
    }
}

export default Stocks;