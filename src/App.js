import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import BookDetails from './components/BookDetails';
const apiUrl = 'https://epibooks.onrender.com/history';

const App = () => {

  //uso useState per gestire lo stato dell'array di libri
  const [historyBooks, setHistoryBooks] = useState([]);
  //uso useState per gestire lo stato della query di ricerca
  const [query, setQuery] = useState('');

  //eseguo la chiamata fetch
  const getHistoryBooks = async() => {
    try {
      const data = await fetch(apiUrl);
      const response = await data.json();
      setHistoryBooks(response);
    } catch (error) {
      console.log(error);
    }
  };

  //uso useEffect per richiamare la chiamata fetch quando il componente sta per essere montato
  useEffect(() => {
    getHistoryBooks();
  }, []);

  //nel return uso le rotte per gestire la navigazione su diverse pagine passando gli stati necessari
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage historyBooks={historyBooks} query={query} setQuery={setQuery} />} />
        <Route path="/book/:asin" element={<BookDetails showSearch={false}/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
