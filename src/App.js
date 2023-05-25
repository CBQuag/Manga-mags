import logo from './logo.svg';
import './App.css';
import Page from './components/Pages';
import Manga from './components/Manga';
import Magazines from './components/Magazines';
import Mangas from './components/Magazine';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

let style = {
  position: 'fixed',
  textDecoration: 'none',
  color:'white',
  bottom: '0px',
  right: '0px'
}

function App() {
  return (
    <div>
      <div className='mobile'>
        <h1>Loading...</h1>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
      <div className="App">
      
      <Link style={style} to='/'>clear</Link>
      <h1>Magazines</h1>
      <Routes>
        <Route path='/*' element={<Magazines page={1} />} />
      </Routes>
    </div>
    </div>
    
  );
}

export default App;
