import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
