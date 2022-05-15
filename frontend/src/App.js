import './App.css';
import AppRouter from './router/AppRouter';

import Header from './components/Header/Header'

function App() {
  return (
    <main className="w-100 h-100">

      <Header></Header>
      <AppRouter />
    </main>
  );
}

export default App;
