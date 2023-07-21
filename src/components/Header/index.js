import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="navbar-large-container">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li className="nav-item">Jobs</li>
            </Link>
          </ul>
          <div className="logout-container">
            <button type="submit" className="btn-field" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
