import './App.css';
import Card, {CARD_QUALITY, CARD_TYPE, PregeneratedCard} from "./components/Card";
import cards from "./cards/cards.json"

function App() {
    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <h1>BGO</h1>
                    <PregeneratedCard card={cards.D8}/>
                </div>
            </div>
        </div>
    );
}

export default App;
