import {Link} from 'react-router-dom'
import './index.css'

const TechItems = props => {
  const {itemDetails} = props
  const {name, logoUrl, id} = itemDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="tech-list">
        <img src={logoUrl} alt={`${name}`} className="tech-images" />
        <p className="names">{name}</p>
      </li>
    </Link>
  )
}

export default TechItems
