import React, { Component } from 'react';
import {  IframeBridge } from 'wisper-rpc';
import './App.css';
import anime from 'animejs'
import qs from "qs";
const {
    organization_id = 'default_value',
    account_name = 'default_value',
    auto_run = false
} = qs.parse(window.location.search.slice(1));


class App extends Component {
    constructor(props) {
        super(props);
        this.name = 'Smart Iframe';
        this.bridge = new IframeBridge(window.parent);
        this.organization_id = organization_id;

        // Method bindings
        this.play = this.play.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onError = this.onError.bind(this);

        let t = this;
        this.logoAnimation = (function() {
            var logoAnimationTL = anime.timeline({
                    autoplay: false,
                    easing: 'easeOutSine'
                })
                    .add({
                        targets: '.its',
                        opacity: [0, 1],
                        scale: [1.5, 1],
                        duration: 500,
                    })
                    .add({
                        targets: '.its',
                        opacity: [1, 0],
                        duration: 1,
                    })
                    .add({
                        targets: '.on',
                        opacity: [0, 1],
                        scale: [1.5, 1],
                        duration: 500,
                    })
                    .add({
                        targets: '.on',
                        opacity: [1, 0],
                        duration: 1,
                    })
                    .add({
                        targets: '.at',
                        opacity: [0, 1],
                        scale: [1.5, 1],
                        duration: 500,
                    })
                    .add({
                        targets: '.at',
                        opacity: [1, 0],
                        duration: 1,
                    })
                    .add({
                        targets: '.buffalo',
                        opacity: [0, 1],
                        scale: [1.5, 1],
                        duration: 500,
                    })
                    .add({
                        targets: '.buffalo',
                        opacity: [.5, 0],
                        translateY: 100,
                        duration: 200,
                    }, '+=500')
                    .add({
                        targets: '.itsonat-sm, .ot',
                        opacity: [0, 1],
                        translateY: [-190, 0],
                        duration: 175,
                        delay: anime.stagger(100)
                    })
                    .add({
                        targets: '.section',
                        opacity: [0, 1],
                        duration: 15,
                        translateY: 10,
                    })
                    .add({
                        targets: '.blue-bg',
                        translateX: [-1000,0],
                        opacity: [0, 1],
                        duration: 455,
                        delay: anime.stagger(100)
                    })
                    .add({
                        targets: '.beige-bg',
                        opacity: [0, 1],
                        duration: 15
                    })
                    .add({
                        targets: '.blue-bg',
                        height: ['3%','100%'],
                        duration: 255,
                        delay: anime.stagger(150)
                    })
                    .add({
                        targets: '.team-text',
                        opacity: [0, 1],
                        duration: 75
                    })
                    .add({
                        targets: '.team1',
                        opacity: [0, 1],
                        duration: 75
                    })
                    .add({
                        targets: '.team2',
                        opacity: [0, 1],
                        duration: 75
                    })
                    .add({
                        targets: '.line',
                        opacity: [0, 1],
                        duration: 75
                    })
                    .add({
                        targets: '.score-text',
                        opacity: [0, 1],
                        translateY: 10,
                        duration: 175
                    })
                    .add({
                        targets: '.vs',
                        opacity: [0, 1],
                        translateX: "-50%",
                        left: [0, "50%"],
                        scale: 2,
                        rotate: '1turn',
                        duration: 500
                    })
                    .add({
                        targets: '.org-type',
                        opacity: [0, 1],
                        translateX: "-50%",
                        left: [0, "56.5%"],
                        scale: 2,
                        rotate: '1turn',
                        duration: 500
                    })
                .add({
                    targets: '.org-type',
                    duration: 1
                }, "+=5000")
                .add({
                    targets: '.section',
                    opacity: [1, 0],
                    height: 0,
                    duration: 300,
                    delay: anime.stagger(350),
                    translateX: [0, -1000],
                })
                .add({
                    targets: '.section2',
                    opacity: [0, 1],
                    duration: 300,
                    height: '240px',
                    translateX: [-1000, 0],
                    delay: anime.stagger(350)
                })
                .add({
                    targets: '.org-type',
                    duration: 1
                }, "+=5000")
                .add({
                    targets: '.section2',
                    opacity: [1, 0],
                    height: 0,
                    duration: 300,
                    delay: anime.stagger(350),
                    translateX: [0, -1000],
                })
                .add({
                    targets: '.section',
                    opacity: [0, 1],
                    height: '240px',
                    duration: 300,
                    translateX: [-1000, 0],
                    delay: anime.stagger(350)
                })


                .add({
                    targets: '.org-type',
                    duration: 1,
                    complete: function(anim){
                        t.onDone();
                    }
                }, "+=5000")

            ;

            return logoAnimationTL;

        })();


    }

    componentDidMount() {
        this.bridge.exposeFunction('play', this.play);
        this.onReady();
    }

    componentDidCatch(error, info){
        this.onError(error)
    }

    play() {
        console.log('Play was called by outer frame');
        this.logoAnimation.play();
        return true;
    }

    onReady() {
        if(auto_run) {
            this.logoAnimation.play();
        }
        this.bridge.invoke('onReady', [this.name]).then(result => {
            console.log(this.name, ': resolve onReady - ', result);
        }, error => {
            console.error(error);
        });
    }

    onDone() {
        console.log('Done was called by inner frame');
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
                Organization: {organization_id}
        </div>
            );
    }
}

export default App;