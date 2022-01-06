import {toast} from "react-toastify";

export default class Toast {
    constructor() {
        this.type = toast.TYPE.ERROR;
        this.position = toast.POSITION.BOTTOM_RIGHT;
        this.isError = true;
    }

    static get init() {
        if (!Toast?.instance) {
            Toast.instance = new Toast();

        }
        return Toast.instance;
    }

    get top() {
        this.position = toast.POSITION.TOP_RIGHT;
        return this;
    }

    get bottom() {
        this.position = toast.POSITION.BOTTOM_RIGHT;
        return this;
    }

    get success() {
        this.type = toast.TYPE.SUCCESS;
        this.isError = false;
        return this;
    }

    get warning() {
        this.type = toast.TYPE.WARNING;
        this.isError = false;
        return this;
    }

    get error() {
        this.type = toast.TYPE.ERROR;
        this.isError = true;
        return this;
    }

    show(msg, timeout) {
        const option = {
            type: this.type,
            position: this.position,
        };

        if (timeout) {
            option.autoClose = timeout;
        }

        let message = !this.isError && msg || (msg.message || msg.errors || msg.type || msg.errmsg || msg.errorMsg || JSON.stringify(msg));
        if (typeof msg === "string") {
            message = msg;
        }

        if (Array.isArray(msg.message)) {
            message = processArray(msg.message);
        }

        toast(message, option);
    }

}

const processArray = (arrays) => {
    let component = arrays.forEach((d, i) => {
        return (
            <div key={i}>
                {d}
                <br/>
            </div>
        );

    });

    return (
        <div>
            {component}
        </div>
    );
};
