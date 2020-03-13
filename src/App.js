import React, { Component } from 'react';
import {  IframeBridge } from 'wisper-rpc';
import './App.css';

const URL = "https://example.com";

const DURATION = 30;

class App extends Component {
    constructor(props) {
        super(props);
        this.name = 'Smart Iframe';
        this.bridge = new IframeBridge(window.parent);

        // Method bindings
        this.play = this.play.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        this.bridge.exposeFunction('play', this.play);
    }

    componentDidCatch(error, info){
        this.onError(error)
    }

    play() {
        setTimeout(() => {
                this.onDone();
        }, DURATION * 1000);
        return true;
    }

    onReady() {
        this.bridge.invoke('onReady', [this.name]).then(result => {
            console.log(this.name, ': resolve onReady - ', result);
        }, error => {
            console.error(error);
        });
    }

    onDone() {
        this.bridge.invoke('onDone', [this.name]).then(result => {
            console.log(this.name, ': resolve onDone - ', result);
        }, error => {
            console.error(error);
        });
    };

    onError(error) {
        this.bridge.invoke('onError', [error]).then(() => {
            console.log(this.name, ': resolve onError', {error});
        }, error => {
            console.error(error);
        });
    };

    render() {
        return (<div className="App">
                    <iframe
                        className="iframe"
                        onLoad={this.onReady}
                        title="smart iframe"
                        src={URL}
                    />
                </div>
            );
    }
}

export default App;