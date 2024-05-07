import './App.css';
import ChatPanel from "./components/ChatPanel";
import CenterPanel from "./components/CenterPanel";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./RightPanel";
import Card from "./components/Card";

function range(start = 0, end) {
    return Array.from({length: end - start}, (v, k) => k + start);
}

function App() {
    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <h1>BGO</h1>
                    <Card title={"Card example"}
                          description={"This is an example description"}
                          imagePath={"/images/tavern.png"}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
