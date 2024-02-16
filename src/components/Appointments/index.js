import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isDisplayStared: false,
  }

  isClickStared = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isStared: !eachList.isStared}
        }
        return eachList
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  isClickFilterStaredbtn = () => {
    const {isDisplayStared} = this.state

    this.setState({isDisplayStared: !isDisplayStared})
  }

  addApointments = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isStared: false,
    }
    if (titleInput !== '' && dateInput !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  getFilterList = () => {
    const {appointmentList, isDisplayStared} = this.state
    if (isDisplayStared) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStared === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isDisplayStared} = this.state
    const filterAppoinmentList = this.getFilterList()

    const staredClick = isDisplayStared ? 'active' : ''

    return (
      <div className="app-container">
        <div className="card-container">
          <div className="form-container">
            <form onSubmit={this.addApointments}>
              <h1>Add Appointment</h1>
              <label htmlFor="TITLE" className="title-label">
                TITLE
              </label>
              <div>
                <input
                  type="text"
                  id="TITLE"
                  className="title-input"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                  placeholder="Title"
                />
              </div>

              <label htmlFor="date" className="date-label">
                DATE
              </label>

              <div>
                <input
                  id="date"
                  type="date"
                  onChange={this.onChangeDate}
                  value={dateInput}
                  className="date-input"
                />
              </div>

              <div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>

          <hr className="hr-line" />

          <div className="appointment-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.isClickFilterStaredbtn}
              className={`stared-btn ${staredClick}`}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-list-container">
            {filterAppoinmentList.map(eachList => (
              <AppointmentItem
                key={eachList.id}
                appointmentData={eachList}
                isClickStared={this.isClickStared}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
