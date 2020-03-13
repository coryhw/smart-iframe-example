# Smart iframe example

_Recomendation: To parse the query parameters we recomend [qs.js](https://github.com/ljharb/qs) (A querystring parser with nesting support)_

_The interface between smart iframes and Upshow UI Screen was implemented using [wisper-rpc](https://github.com/wisper-rpc/wisper-js)_

### Boilerplate code example of a smart iframe that can communicate with Upshow UI Screen. 

#### The Upshow UI Screen exposes 3 function through Wisper-RCP that this Smart Iframe could invoke at any time after the iframe bridge from wisper-rcp was initialized.


* __onReady__: _Invoked from the smart iframe after the smart iframe is ready to be shown on screen_ (After this moment Upshow UI Screen will eventually invoke __play__)

```
    bridge.invoke('onReady')
        .then(result => {
            console.log(`resolve onReady - `, result);
        })
        .catch(error => {
            console.error(`reject onReady - `, error);
        });
```

 * __onDone__: _Invoked from the smart iframe to tell Upshow that the smart iframe has ended_

```
    bridge.invoke('onDone')
        .then(result => {
            console.log(`resolve onDone - `, result);
        })
        .catch(error => {
            console.error(`reject onDone - `, error);
        });
```
* __onError__ _Invoked from the smart iframe to tell Upshow that the smart iframe has thrown a fatal error and can not continue working_ 

```
    bridge.invoke('onError', [error])
        .then(() => {
            console.log(`resolve onError`);
        })
        .catch(error => {
            console.error(`reject onError - `, error);
        });
```


#### Methods exposed by the Smart Iframe.

* __play__ _The Upshow UI Screen will invoke this method and this would mean that the Smart Iframe is being shown on screen_ 

```
    const play = () => {
        setTimeout(() => {
                this.onDone();
        }, DURATION * 1000);
        return true;
    }

    bridge.exposeFunction('play', this.play);

```