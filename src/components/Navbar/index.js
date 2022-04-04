import {Link} from 'react-router-dom'

import './index.css'

const Navbar = () => (
  <div className="nav-bar">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="web-logo"
      />
    </Link>
  </div>
)

export default Navbar
