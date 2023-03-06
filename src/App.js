import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'react-notistack'

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
      <SnackbarProvider maxSnack={2} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️'
      }}
      // TransitionComponent={Fade}
     >

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
     </SnackbarProvider>
    </>
  )
}

export default App
