import './index.css'

const AppointmentItem = props => {
  const {appointmentData, isClickStared} = props
  const {id, title, date, isStared} = appointmentData

  const onClickStar = () => {
    isClickStared(id)
  }

  return (
    <li className="list-container">
      <div className="card-star-container">
        <p className="title-class">{title}</p>
        <button
          type="button"
          onClick={onClickStar}
          className="star-btn"
          data-testid="star"
        >
          <img
            src={
              isStared
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
            className="star-img"
          />
        </button>
      </div>

      <p className="date-class">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
