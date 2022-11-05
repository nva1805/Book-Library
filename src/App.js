import './App.scss';
import Header from './components/layout/Header/Header.js'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>
          
        </div>
      </div>
      <div className='app-container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
