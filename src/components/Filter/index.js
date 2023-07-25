import './index.css'

const Filter = props => {
  /* EmploymentList - checkbox */

  const renderEmploymentList = () => {
    const {employmentTypesList, updateCheckBoxElements} = props
    return employmentTypesList.map(eachEmployee => {
      const {categoryClassNames} = eachEmployee.label
      const onCheckBoxInput = () => {
        updateCheckBoxElements(eachEmployee.employmentTypeId)
      }

      return (
        <li className="employment-list-container">
          <div>
            <input
              type="checkbox"
              key={eachEmployee.employmentTypeId}
              className="employee-input"
              onChange={onCheckBoxInput}
            />
            <label
              className={`label ${categoryClassNames}`}
              htmlFor={eachEmployee.employmentTypeId}
            >
              {eachEmployee.label}
            </label>
          </div>
        </li>
      )
    })
  }

  /* salaryList  ---- radio */
  const renderSalaryList = () => {
    const {salaryRangesList, getRadioOptionView} = props

    return salaryRangesList.map(eachSalary => {
      const radioOptionInput = () => {
        getRadioOptionView(eachSalary.salaryRangeId)
      }
      const {categoryClassName} = eachSalary.label
      return (
        <li className="employment-list-container">
          <div>
            <input
              type="radio"
              name="option"
              key={eachSalary.salaryRangeId}
              className="salary-input"
              onChange={radioOptionInput}
            />
            <label
              className={`label ${categoryClassName}`}
              htmlFor={eachSalary.salaryRangeId}
            >
              {eachSalary.label}
            </label>
          </div>
        </li>
      )
    })
  }

  return (
    <>
      <div>
        <h1 className="employment-head">Type of Employment</h1>

        {renderEmploymentList()}
        <hr className="line" />
        <h1 className="salary-head">Salary Range</h1>
        {renderSalaryList()}
      </div>
    </>
  )
}
export default Filter
