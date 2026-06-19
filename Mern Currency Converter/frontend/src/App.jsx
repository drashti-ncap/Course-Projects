import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <>
      <header className="hero">
        <h1>Global Currency Converter</h1>
        <p>
          Your go-to solution for real-time currency conversions worldwide.
        </p>
      </header>

      <CurrencyConverter />

      <section className="info-section">
        <h2>Why Choose Global Currency Converter?</h2>
        <p>
          Detailed explanations on advantages or instructions for use.
        </p>
      </section>
    </>
  );
}

export default App;