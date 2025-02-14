import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './header';
import SearchBar from './searchBar';
import Dashboard from './dashboard';
import Footer from './footer';
//import ImageContainer from './imageContainer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header>

      </Header>
      <SearchBar>
        
      </SearchBar>
      <Dashboard>
      </Dashboard>

      <Footer>
        
      </Footer>
    </>
  )
}

export default App
