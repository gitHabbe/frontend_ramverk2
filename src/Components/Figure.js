import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import io from 'socket.io-client';
import axios from "axios";
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

class Figure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reroute: false,
            socket: "",
            figures: []
            // user: {}
        }
        this.myRef = React.createRef();
    }

    async componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        let user = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/token`,
            {token}
        );
        if (!user.data.token) {
            this.setState({reroute: true});
        }
        // this.setState({user});
        let socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`);
        
        socket.on("buying", async info => {
            console.log("Got back socket 'buying'");
            user = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/get-user`,
                {token, user}, {
                    headers: {
                        "x-access-token": localStorage.getItem("jwtToken")
                    }
                }
            );
			console.log('TCL: Figure -> componentWillMount -> user', user)
            
            const test = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/buy`,
                {figure: info.correctFigure, user, count: info.count}, {
                    headers: {
                        "x-access-token": localStorage.getItem("jwtToken")
                    }
                }
            );
            this.props.setUser();
            console.log('TCL: Figure -> componentWillMount -> test', test)
        });
        
        socket.on("selling", async info => {
            console.log("Got back socket 'selling'");
            user = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/get-user`,
                {token, user}, {
                    headers: {
                        "x-access-token": localStorage.getItem("jwtToken")
                    }
                }
            );
			console.log('TCL: Figure -> componentWillMount -> user', user)
            
            const test = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/sell`,
                {figure: info.correctFigure, user, count: info.count}, {
                    headers: {
                        "x-access-token": localStorage.getItem("jwtToken")
                    }
                }
            );
            this.props.setUser();
            console.log('TCL: Figure -> componentWillMount -> test', test)
        });

        let graphs = {};
        let first = true;
        let graphContainer = this.myRef.current;
        socket.on("stocks", message => {
            if (first) {
                var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

                message.forEach(figure => {
                    // let titleElement        = document.createElement("div");
                    let graphElement        = document.createElement("div");
                    let input               = document.createElement("input");
                    let figureButtonSell    = document.createElement("button");
                    let figureButtonBuy     = document.createElement("button");
                    let form                = document.createElement("form");
                    let graphHeader         = document.createElement("div");
                    let title               = document.createElement("span");


                    figureButtonBuy.classList.add("button", "is-success");
                    figureButtonBuy.innerHTML = "Buy"
                    figureButtonBuy.onclick = async e => {
                        e.preventDefault();
                        if (input.value <= 0) return;
                        await socket.emit("buy", {figure, user, count: input.value});
                        console.log("sent buying emit: ");
                        // await this.props.setUser();
                    }
                    figureButtonSell.classList.add("button", "is-danger");
                    figureButtonSell.innerHTML = "Sell"
                    figureButtonSell.onclick = async e => {
                        e.preventDefault();
                        if (input.value <= 0) return;
                        await socket.emit("sell", {figure, user, count: input.value});
                        console.log("sent selling emit: ");
                        await this.props.setUser();
                    }
                    input.classList.add("input");
                    input.placeholder = "0";
                    input.type = "number";

                    title.innerText = figure.name;
                    form.appendChild(input);
                    form.appendChild(figureButtonBuy);
                    form.appendChild(figureButtonSell);
                    form.classList.add("figureForm");
                    graphHeader.classList.add("graphHeader");
                    graphHeader.appendChild(title);
                    graphHeader.appendChild(form);
                    graphHeader.appendChild(form);
                    graphContainer.appendChild(graphHeader);
                    graphContainer.appendChild(graphElement);

                    let graph = new Rickshaw.Graph({
                        element: graphElement,
                        width: "1000",
                        height: "200",
                        renderer: "line",
                        series: new Rickshaw.Series.FixedDuration([{
                            name: figure.name,
                            color: palette.color(),
                        }], undefined, {
                            timeInterval: 5000,
                            maxDataPoints: 1000,
                            timeBase: new Date().getTime() / 1000
                        })
                    });

                    graph.configure({
                        width: graphContainer.clientWidth,
                    });

                    new Rickshaw.Graph.Axis.Time( { graph: graph } );

                    new Rickshaw.Graph.Axis.Y({
                        graph: graph,
                        orientation: 'left',
                        tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                    });
                    console.log("asdf", {
                        graph: graph,
                        orientation: 'left',
                        tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                    });

                    new Rickshaw.Graph.HoverDetail({
                        graph: graph
                    });

                    graph.render();

                    let slug = slugify(figure.name);

                    graphs[slug] = {
                        name: figure.name,
                        graph: graph,
                    };
                });
                first = false;
            }
            this.setState({figures: []});

            message.forEach(figure  => {
                let slug = slugify(figure.name);
                let data = {};
                this.setState({figures: [...this.state.figures, figure]});
                
                data[figure.name] = figure.value;
                graphs[slug].graph.series.addData(data);
                graphs[slug].graph.render();
            });
        })

        function slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')    // Replace spaces with -
                .replace(/[^\w-]+/g, '') // Remove all non-word chars
                .replace(/--+/g, '-')    // Replace multiple - with single -
                .replace(/^-+/, '')      // Trim - from start of text
                .replace(/-+$/, '');     // Trim - from end of text
        }
        this.setState({socket});
    }

    render() {
        if (this.state.reroute) {
            return <Redirect to="/login" />
        }
        
        return (
            <div>
                <section className="hero is-primary">
                    <div className="container">
                        <div className="hero-body">
                            <h1 className="title is-1">Figures</h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div ref={this.myRef} />
                    </div>
                </section>
            </div>
        );
    }
}

export default Figure;
