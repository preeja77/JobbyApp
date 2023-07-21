import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="job-container">
      <div className="jobs-content">
        <h1 className="job-motto">Find The Job That Fits Your Life</h1>
        <p className="job-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="submit" className="job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
