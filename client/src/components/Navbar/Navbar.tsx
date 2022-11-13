import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './../../Theme/Theme';


const Navbar = () => {
    const {Styles, mode, toggleColorMode} = useContext(ColorModeContext)
    return ( 
   <nav className={`navbar navbar-expand-lg shadow ${Styles.navbarBg}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">Bank</Link>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to="" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="customers" className="nav-link">Customers</Link>
                </li>
                <li className="nav-item">
                <Link to="transfers" className="nav-link ">Transfers</Link>
                </li>
            </ul>

            <div>
            {
                mode === 'light' 
                ?  <NightlightRoundIcon className="makePointer" onClick={toggleColorMode} />
                : <Brightness7Icon className="makePointer" onClick={toggleColorMode}/>
            }
            </div>
            </div>
        </div>
  </nav>
     );
}
 
export default React.memo(Navbar);