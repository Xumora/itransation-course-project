import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { UIContext } from './contexts/UIContext'

import App from './App'
import { DataContext } from './contexts/DataContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={2000}
  >
    <React.StrictMode>
      <BrowserRouter>
        <UIContext>
          <DataContext>
            <App />
          </DataContext>
        </UIContext>
      </BrowserRouter>
    </React.StrictMode>
  </SnackbarProvider>
)
