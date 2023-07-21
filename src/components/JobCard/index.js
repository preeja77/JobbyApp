import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <>
      <li className="list-item">
        <div className="job-card-container">
          <div className="logo-and-title-container">
            <img src={companyLogoUrl} alt={title} className="company-logo" />
            <div className="title-and-rating-container">
              <p className="job-title">{title}</p>
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
              <p className="type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="second-part-container">
          <h1 className="desc-heading">Description</h1>

          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </>
  )
}
export default JobCard
