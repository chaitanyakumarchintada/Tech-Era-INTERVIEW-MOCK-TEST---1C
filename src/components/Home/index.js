import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import TechItems from '../TechItems'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courseData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })

    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        courseData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourseData = () => {
    const {courseData} = this.state

    return (
      <ul className="item-details">
        {courseData.map(each => (
          <TechItems itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  reloadPage = () => {
    window.location.reload()
    this.getData()
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

  renderCourseList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderCourseData()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="head-contain">
          <h1 className="heading">Courses</h1>
          {this.renderCourseList()}
        </div>
      </>
    )
  }
}

export default Home
