import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileList: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfileDetails = updatedProfile => ({
    profileImageUrl: updatedProfile.profile_image_url,
    name: updatedProfile.name,
    shortBio: updatedProfile.short_bio,
  })

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedProfile = data.profile_details
    const updatedProfileDetails = this.getProfileDetails(updatedProfile)

    this.setState({
      profileList: updatedProfileDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessList = () => {
    const {profileList} = this.state
    const {profileImageUrl, name, shortBio} = profileList

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  /* ---- Failure view --- */

  renderFailureView = () => (
    <div className="failure-view-container">
      <button type="submit" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessList()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-bg-container">{this.renderProfileDetails()}</div>
    )
  }
}

export default Profile
