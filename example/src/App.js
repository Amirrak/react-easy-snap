import React, { useState } from 'react'
import { WindowScroll, PageSnap } from 'react-easy-snap'
import './App.css'


const App = () => {

  const [currentPageState, setCurrentPageState] = useState();

  return (
    <WindowScroll height='100vh' width='100vw' scrollDirection='y' timeScrollDisabled='200' mainPage='0'
                  currentPageState={currentPageState} setCurrentPageState={setCurrentPageState}
                  minWidth='960' backgroundColor='black'>
      <PageSnap>
        <div id='page1'></div>
      </PageSnap>
      <PageSnap>
        <div id='page2'></div>
      </PageSnap>
      <PageSnap>
        <div id='page3'></div>
      </PageSnap>

    </WindowScroll>
  )
}

export default App