import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'

const customTheme = createTheme({
  palette: {
    secondary: {
      main: '#bf922a', // Replace with your desired secondary color
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={customTheme}>
      <App />
      </ThemeProvider>
   
  </React.StrictMode>,
)
