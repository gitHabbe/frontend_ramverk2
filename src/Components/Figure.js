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
            socket: ""
        }
        this.myRef = React.createRef();
    }

    async componentWillMount() {
        const token = localStorage.getItem("jwtToken");
        const test = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/token`,
            {token}
        );
        if (!test.data.token) {
            this.setState({reroute: true});
        }
        this.setState({socket: io.connect(`${process.env.REACT_APP_SOCKET_URL}`)});
        // const figures = await axios.get(`${process.env.REACT_APP_API_URL}/figure/figures`);
        // console.log(figures.data, "figures.data");
        
        let graphs = {};
        let first = true;
        let graphContainer = this.myRef.current;
        this.state.socket.on("stocks", message => {
			console.log('TCL: Figure -> componentWillMount -> message', message)
            if (first) {
                var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

                message.forEach(cake => {
                    let graphTitle = document.createElement("h1");

                    graphTitle.textContent = cake.name;

                    let graphElement = document.createElement("div");

                    graphContainer.appendChild(graphTitle);
                    graphContainer.appendChild(graphElement);

                    let graph = new Rickshaw.Graph({
                        element: graphElement,
                        width: "1000",
                        height: "200",
                        renderer: "line",
                        series: new Rickshaw.Series.FixedDuration([{
                            name: cake.name,
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

                    new Rickshaw.Graph.HoverDetail({
                        graph: graph
                    });

                    graph.render();

                    let slug = slugify(cake.name);

                    graphs[slug] = {
                        name: cake.name,
                        graph: graph,
                    };
                });
                first = false;
            }

            message.map((cake) => {
                let slug = slugify(cake.name);
                let data = {};

                data[cake.name] = cake.value;
                graphs[slug].graph.series.addData(data);
                graphs[slug].graph.render();
            });
        })

        function slugify(text) {
            return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')       // Remove all non-word chars
            .replace(/--+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
        }
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
                            <h1 className="title is-1">Test</h1>
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
