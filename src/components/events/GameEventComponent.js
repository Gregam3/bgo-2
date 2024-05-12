import {Component} from "react";

class GameEventComponent extends Component {
    render() {
        return null;
    }

    onEventStart() {}
    endEvent() {
        this.onEventEnd();
    }
    onEventEnd() {
        console.log("Event Ended");
    }

    static defaultProps = {
        eventData: null,
    };
}

export default GameEventComponent;