import './App.css';
import ChatPanel from "./components/ChatPanel";
import CenterPanel from "./components/CenterPanel";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./RightPanel";

function range(start = 0, end) {
    return Array.from({length: end - start}, (v, k) => k + start);
}

function App() {
    return (
        <div className="app-container">
            <div className={"board"}>
                {range(1, 41).map(i => <div className={"board-tile"}>{i}</div>)}
            </div>
            <div className={"panels-container"}>
                <CenterPanel/>
                <LeftPanel/>
                <RightPanel/>
            </div>
            <ChatPanel/>
        </div>
    );
}

export default App;
