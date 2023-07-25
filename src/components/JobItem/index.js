import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {RiSuitcaseFill} from 'react-icons/ri'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <>
      <li className="list-item">
        <Link to={`/jobs/${id}`} className="nav-link">
          <div className="job-card-container">
            <div className="logo-and-title-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-and-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="star-and-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="job-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-and-package-container">
              <div className="type-and-salary-container">
                <div className="location-icon-location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="emp-icon-employmentType-container">
                  <RiSuitcaseFill className="emp-type-icon" />
                  <p className="type">{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="second-part-container">
            <h1 className="desc-heading">Description</h1>

            <p className="job-description">{jobDescription}</p>
          </div>
        </Link>
      </li>
    </>
  )
}
export default JobItem
