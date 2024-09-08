import "./SideHeader.css"
import { Link } from 'react-router-dom';
import CustomWalletButton from "../CustomWalletButton/CustomWalletButton";
import dashboard from '../../assets/dashboard.svg'
import history from '../../assets/history.svg'

export default function SideHeader() {




  return(
    <header>
      <div className="logo">
        <img src="/Logo.png" alt="" />
        <span>WalletVista</span>
      </div>
      <div className="header-nav">
        <nav>
          <Link to="/dashboard"><img src={dashboard} alt="" /><span>Dashbaord</span></Link>
          <Link to="/history"><img src={history} alt="" /><span>Transactions History</span></Link>

        </nav>
      </div>
      <div className="wallet-connect">
        <CustomWalletButton />
      </div>
      
    </header>
  )
}