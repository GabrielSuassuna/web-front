import "./App.css";
import AppRouter from "./router/AppRouter";

import Header from "./components/Header/Header";

function App() {
  return (
    <main className="w-full flex flex-col h-full" style={{ height: "100vh" }}>
      <Header></Header>
      <AppRouter />
    </main>
  );
}

export default App;
