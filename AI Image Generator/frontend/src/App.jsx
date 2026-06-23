import Images from "./components/Images";
import GenerateImage from "./components/GenerateImage";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Studio</p>
          <h1>AI Image Generator</h1>
        </div>
        <div className="status-pill">
          <span aria-hidden="true" />
          DALL-E 3
        </div>
      </header>

      <GenerateImage />
      <Images />
    </main>
  );
}

export default App;
