import { useState } from 'react';

import Header from './header';
import SearchBar from './SearchBar';
import Dashboard from './dashboard';
import Footer from './Footer';

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
