import { useState, useEffect } from 'react'
import './App.css'

import './assets/css/app.css'
import SideBar from './components/SideBar'
import ContentWrapper from './components/ContentWarpper';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('api/products') 
        .then(response => response.json())       
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
     <div id="wrapper">
      <SideBar />
      <ContentWrapper />
     </div>
    </>
  )
}

export default App;

