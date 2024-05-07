import './App.css';
import Card, {CARD_QUALITY, CARD_TYPE} from "./components/Card";

function range(start = 0, end) {
    return Array.from({length: end - start}, (v, k) => k + start);
}

function App() {
    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <h1>BGO</h1>
                    <Card title={"D10"}
                          description={"Roll a 10 sided die for movement"}
                          imagePath={"/images/tavern.png"}
                          cardType={CARD_TYPE.ROLL}
                          cardQuality={CARD_QUALITY.COMMON}
                    />
                    <Card title={"D20"}
                          description={"Roll a 10 sided die for movement"}
                          imagePath={"/images/tavern.png"}
                          cardType={CARD_TYPE.SPELL}
                          cardQuality={CARD_QUALITY.EPIC}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
