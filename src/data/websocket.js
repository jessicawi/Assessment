import {dispatchState} from "../redux/dispatcher";
import constDispatch from "../redux/constDispatch";

const coins = [
    "btcusdt@ticker",
    "ethusdt@ticker",
    "xrpusdt@ticker",
    "ltcusdt@ticker",
    "adausdt@ticker",
    "dotusdt@ticker",
    "filusdt@ticker",
    "trxusdt@ticker",
    "eosusdt@ticker",
    "bsvusdt@ticker",
    "atomusdt@ticker",
    "neousdt@ticker",
    "dashusdt@ticker",
    "dogeusdt@ticker",
];
const subs = {
    "method": "SUBSCRIBE",
    "params": coins,
    "id": 1
};

const unSubs = {
    "method": "UNSUBSCRIBE",
    "params": coins,
    "id": 312
};

class Websocket {
    constructor(options) {
        // console.log("import socket...");
        this.socketUrl = 'wss://stream.binance.com:9443/stream?streams=ticker';
        this.ws = null;
        this.isSubscribed = false;
        this.started = false;
        // this.init();
        // this.listen();
    }

    init() {
        if (!this.started) {
            console.log("init socket...");
            this.ws = new WebSocket(this.socketUrl);
            this.started = true;
        }
    }

    // send a message
    send(message) {
        this.ws.send(JSON.stringify(message));
    }

    sendSubscribe() {
        this.send(subs);
        this.isSubscribed = true;
    }

    sendUnsubscribe() {
        this.send(unSubs);
        this.isSubscribed = false;
    }

    close() {
        this.ws.close();
    }

    listen() {
        const _this = this;
        if (this.ws) {
            // connection opened
            this.ws.onopen = () => {
                console.log('connected');
                // this.send({
                //     "method": "SET_PROPERTY",
                //     "params": [
                //         "combined",
                //         true
                //     ],
                //     "id": 5
                // });
                this.sendHeartbeat();
                dispatchState(constDispatch.setIsSocketConnect, true);
            };

            // a message was received
            this.ws.onmessage = (e) => {
                console.log("msg", e);
                if (e.data) {
                    const parsed = JSON.parse(e.data);
                    // console.log("prased", parsed?.data?.c);
                    if (parsed) {
                        // _this.onMessage(parsed);
                        // dispatchState(constDispatch.processToMarketData, parsed);
                    }
                }
            };

            // an error occurred
            this.ws.onerror = (e) => {
                console.log("err", e);
            };

            // connection closed
            this.ws.onclose = (e) => {
                console.log("close", e);
                dispatchState(constDispatch.setIsSocketConnect, false);
            };
        }
    }

    sendHeartbeat() {
        const min = 9 * 60 * 1000; // 9mins
        setTimeout(() => {
            console.log("send pong message");
            this.send({
                "method": "SET_PROPERTY",
                "params": [
                    "combined",
                    true
                ],
                "id": 5
            });
            this.sendHeartbeat();
        }, min);
    }
}

const websocket = new Websocket();
export default websocket;
