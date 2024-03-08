import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import Main from './Components/MainContent/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const FIGMA_THEME = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: '#035794',
    },
  },
  spacing : 5
});

interface BreadcrumbInterface {
  routeForBreadcrumb : string,
  setRouteForBreadcrumb : (value : string) => void,
  
  drawer : boolean,
  setDrawer : (value : boolean) => void,

  menu : boolean,
  setMenu : (value : boolean) => void
}

export const BreadCrumbContext = React.createContext<BreadcrumbInterface | null>(null)


function App() {

 

  const [routeForBreadcrumb, setRouteForBreadcrumb] = useState("/home")
  const [drawer, setDrawer] = useState(true)
  const [menu, setMenu] = useState(false)
  const [access_token, setAccess_token] = useState(false)
  useEffect(() => {
    
    if(window.innerWidth < 764){
        setMenu(true)
    }
    else{
        setMenu(false)
    }

    window.addEventListener('resize', (e) => {
        if(e.target != null) {
            if((e.target as any).innerWidth < 764) {
                setMenu(true)
            }
            else{
                setMenu(false)
            }
        }
        
    })


  try {
    axios.post('https://developer.api.autodesk.com/authentication/v2/token',{
      "grant_type" : "client_credentials",
      "scope" : "bucket:create bucket:read bucket:update bucket:delete data:read data:write data:create viewables:read user:write user:read account:read"
    }, 
    {
      headers : {
        "Authorization" : "Basic MlFIREF5UGZTTExLcm02V1RZR3RKUVR5QXh0cGI3NUpZNVg5eU5sSWtodEFZMnBQOnZGd1pScjAxUUk1QU96WGRzS3hlVGZVVGpBNlNyc3BFdmNIaFB4UDZiWVg1d1lVY0wydTg2VVhJT1daR0FGQmQ=",
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      localStorage.setItem('access_token', JSON.stringify(res.data))
      setAccess_token(true)
      return;
    })
  }catch(err) {
    console.log(err);
  }
}, [])
  return (
    <ThemeProvider theme={FIGMA_THEME}>
      <div className="App">
        {
          access_token && <BreadCrumbContext.Provider value={{routeForBreadcrumb, setRouteForBreadcrumb, drawer, setDrawer, menu, setMenu}}>
            <Navbar />
            <Main />
        </BreadCrumbContext.Provider>
        }
        
      </div>
    </ThemeProvider>
    
  );
}



export default App;
