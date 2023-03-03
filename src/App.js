import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

/* NPM-Packages */
import './App.css'
/* Store-File */
/* Components */
import RoutesFile from './Routes'
import { Helmet } from 'react-helmet'
// import Fade from '@material-ui/core/Fade'
function App () {
  return (
    <>
      <Helmet>
        <title>Ollato</title>
      </Helmet>

      {/* <meta name="description" content="App Description" /> */}
      {/* <meta name="theme-color" content="#008f68" /> */}
        <div className="App">
          <BrowserRouter>
            <Suspense fallback={''}>
              <RoutesFile />
            </Suspense>
          </BrowserRouter>
        {/* <SignUp /> */}
      </div>
    </>
  )
}

export default App
