import React, {useState, useMemo, createContext, ReactNode} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface Theme{
    toggleColorMode(): void,
    mode: string,
    Styles:any
}
interface Props {
    children?:ReactNode
}
const intialState:Theme = {
    toggleColorMode: ()=> {},
    mode: 'light',
    Styles: {},
}
export const ColorModeContext = createContext(intialState);

export const ColorModeContextProvider = ({children}:Props) => {
  
  const [mode, setMode] = useState("light");

  const Styles:any = {
    mainBackground: mode === 'light' ? 'bg-white' : 'bg-black',
    secBackground: mode === 'light' ? 'bg-light' : 'bg-dark',
    secText: mode === 'light' ? 'text-dark' : 'text-light',
    navbarBg: mode === 'light' ? 'bg-light' : 'bg-black navbar-dark',
    inputStyle: mode === 'light' ? {
      backgroundColor: '#f7f8fA'
    } 
    : {
      backgroundColor: '#1f2021',
      color: '#d3d3d3'
    }
  }
  const colorMode:Theme = useMemo(()=> ({
      toggleColorMode: () => {
          setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
      },
      mode,
      Styles
  }), [mode]);

  const theme = useMemo (
      ()=> createTheme ({
        palette: {
          primary: {
            main: mode === 'light' ? '#efe5da' : '#262829',
          },
          secondary:{
            main: '#9182b9',
          },
          error:{
            main: '#f06267'
          },
          background: {
          ...(mode === 'dark' ? 
              {
                default: '#1f2021',
                paper: '#262829',
              } 
              :{
                default: '#f7f8fA',
                paper: '#efe5da',
            }),
          },
          text: {
          ...(mode === 'light' ? 
              {
                primary: '#161616',
                secondary: '#202020',
              }
              :{
                primary: '#ffffff',
                secondary: '#d3d3d3',
              }),
            },
          } 
      }), [mode]);
      

      
  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              {children}
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
};