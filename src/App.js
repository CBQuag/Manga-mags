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
  top: '0px',
  left: '0px'
}

function App() {
  return (
    <div className="App">
      {/* <Magazines page={1}/> */}
      {/* <Mangas magazine={8}/> */}
      <Link style={style} to='/'>back</Link>
      
      <Routes>
        <Route path='/*' element={<Magazines page={1} />} />
      </Routes>
      {/* <Manga title='vinland saga' chapter={1} /> */}
    </div>
  );
}

export default App;
