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
        console.log(this.props)
        this.props.moveToNextEvent();
    }

    componentDidMount() {
        this.onEventStart();
    }

    static defaultProps = {
        eventData: null,
    };
}

export default GameEventComponent;