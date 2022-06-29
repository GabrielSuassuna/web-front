import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <main className="w-full flex flex-col h-full" style={{ height: "100vh" }}>
      <AppRouter />
    </main>
  );
}

export default App;
