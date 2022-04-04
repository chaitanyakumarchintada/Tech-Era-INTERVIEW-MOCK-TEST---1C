import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Courses extends Component {
  state = {
    CourseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTechDetails()
  }

  getFormattedData = data => ({
    techName: data.name,
    imageUrl: data.image_url,
    description: data.description,
    id: data.id,
  })

  getTechDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inprogress})

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        techName: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
        id: data.course_details.id,
      }
      this.setState({
        CourseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTechDetails = () => {
    const {CourseList} = this.state
    const {techName, imageUrl, description} = CourseList

    return (
      <div>
        <div>
          <img src={imageUrl} alt={techName} className="image_urls" />
        </div>
        <div>
          <h1>{techName}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  reloadPage = () => {
    window.location.reload()
    this.getTechDetails()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="/">
        <button onClick={this.reloadPage} type="button" className="retry-btn">
          Retry
        </button>
      </Link>
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderTechDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default Courses
