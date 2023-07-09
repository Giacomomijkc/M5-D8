import React from 'react'
import NavigationBar from '../components/NavigationBar';
import LatestRelease from '../components/LatestRelease';
import Footer from '../components/Footer';

export const Homepage = ({ historyBooks, query, setQuery }) => {
  return (
    <>
        <NavigationBar historyBooks = {historyBooks} query = {query} setQuery={setQuery} showSearch={true}/>
        <LatestRelease historyBooks = {historyBooks} query={query} setQuery={setQuery} />
        <Footer />
    </>
  )
}

export default Homepage;