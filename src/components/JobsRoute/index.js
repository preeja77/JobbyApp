import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'

import Profile from '../Profile'
import JobCard from '../JobCard'
import Header from '../Header'
import Filter from '../Filter'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class JobsRoute extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: '',
    checkBoxInputs: [],
  }

  /* -----Get jobs List --- */

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchInput, checkBoxInputs} = this.state
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,

        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  /* Search Container */

  onSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  searchButton = () => {
    this.getJobsList()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={this.onSearch}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.searchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  /* ----search random, then no-jobs --- */

  noJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  /* --- if success, then show renderSuccessList --- */

  renderSuccessList = () => {
    const {jobsList} = this.state
    const jobsLength = jobsList.length === 0

    return jobsLength ? (
      <ul>{this.noJobs()}</ul>
    ) : (
      <>
        <ul>
          {jobsList.map(eachJobDetails => (
            <JobCard jobDetails={eachJobDetails} key={eachJobDetails.id} />
          ))}
        </ul>
      </>
    )
  }

  /* --- if Loading, then show renderLoadingView --- */

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  /* --- if Failure, then show renderFailureView --- */
  onRetryJobs = () => this.getjobsList()

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="submit" className="retry-button" onClick={this.onRetryJobs}>
        Retry
      </button>
    </div>
  )

  /* switch statements */

  renderDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessList()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  /* Full_profile */

  render() {
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="profile-and-employment-salary-container">
            <Profile jobsList={this.getJobsList()} />
            <hr className="line" />
            <div className="employment-container">
              <Filter
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
              />
            </div>
          </div>
          <div className="searchInput-and-job-details-container">
            <div className="searchContainer">{this.renderSearchInput()}</div>
            {this.renderDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default JobsRoute
