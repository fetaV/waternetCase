import axios from "axios"
import React, { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import {
  FaCalendarCheck,
  FaCalendarPlus,
  FaPenSquare,
  FaTrash,
} from "react-icons/fa"

const Table = () => {
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [dataList, setDataList] = useState([])
  const [activeModalId, setActiveModalId] = useState(null)
  const [newDate, setNewDate] = useState("")

  const userId = activeModalId

  const openModal = (id, data) => {
    setActiveModalId(id)
    setShowModal(true)
  }
  const openModal2 = (id, data) => {
    setActiveModalId(id)
    setShowModal2(true)
  }

  const closeModal = () => {
    setActiveModalId(null)
    setShowModal(false)
  }
  const closeModal2 = () => {
    setActiveModalId(null)
    setShowModal2(false)
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        const responseData = response.data
        console.log("11", responseData)
        setDataList(responseData)
      })
      .catch(error => {
        console.error("API çağrısı sırasında hata oluştu: ", error)
      })
  }, [])

  function _idLastTwoDigits(_id) {
    if (_id.length >= 2) {
      return _id.slice(-2)
    } else {
      return _id
    }
  }

  const saveChanges = async () => {
    let requestBody = {
      activeModalId,
      date: newDate,
    }

    console.log(requestBody)

    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        requestBody
      )

      console.log(response)

      const updatedDataList = dataList.map(data => {
        if (data._id === userId) {
          return {
            ...data,
            date: newDate,
          }
        }
        return data
      })

      setDataList(updatedDataList)
      setShowModal(false)
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error)
    }
  }

  const cancelDate = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/users/${userId}/date`
      )

      if (response.status === 200) {
        const updatedDataList = dataList.map(data => {
          if (data._id === userId) {
            return {
              ...data,
              date: undefined,
            }
          }
          return data
        })

        setDataList(updatedDataList)
        setShowModal2(false)
      } else {
        console.error("Tarih silme işlemi başarısız oldu.")
      }
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error)
    }
  }

  const handleTimeSlotClick = (date, timeSlot) => {
    const selectedTimeSlot = `${date} ${timeSlot}`
    setNewDate(selectedTimeSlot)
  }

  return (
    <>
      {/* Modal1 Start */}
      {dataList.map(
        data =>
          activeModalId === data._id && (
            <Modal
              show={showModal}
              onHide={closeModal}
              size="xl"
              key={data._id}
            >
              <Modal.Header closeButton>
                <Modal.Title>Installation Agenda</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Installation
                  </label>
                </div>
                <div className="border rounded-3 p-3">
                  <div className="btn btn-info text-white">Reset Fields</div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-2">
                      <label className="col-form-label">Contract No</label>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="10001580"
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-2">
                      <label className="col-form-label">Service Category</label>
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        disabled
                        aria-label="Default select example"
                      >
                        <option selected>Assembly</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-2">
                    <div className="col-md-2">
                      <label className="col-form-label">Contract Name</label>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Net Price"
                      />
                    </div>
                  </div>
                </div>
                <div className="border rounded-3 p-3">
                  <div className="d-flex justify-content-between">
                    <div className="btn btn-outline-info mb-3">Last Week</div>
                    <div className="btn btn-outline-info mb-3">Next Week</div>
                  </div>
                  <div className="row">
                    <div className="col-md">
                      09.08.2023 <br />
                      Wednesday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      10.08.2023 <br />
                      Thursday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      11.08.2023 <br />
                      Friday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      12.08.2023 <br />
                      Saturday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      13.08.2023 <br />
                      Sunday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      14.08.2023 <br />
                      Monday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                    <div className="col-md">
                      09.08.2023 <br />
                      Wednesday
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "9:30-10:30(1)")
                        }
                      >
                        9:30-10:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "10:30-12:00(1)")
                        }
                      >
                        10:30-12:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "12:00-13:30(1)")
                        }
                      >
                        12:00-13:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "13:30-15:00(1)")
                        }
                      >
                        13:30-15:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "15:00-16:30(1)")
                        }
                      >
                        15:00-16:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "16:30-18:00(1)")
                        }
                      >
                        16:30-18:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "18:00-19:30(1)")
                        }
                      >
                        18:00-19:30(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "19:30-21:00(1)")
                        }
                      >
                        19:30-21:00(1)
                      </div>
                      <div
                        className="btn btn-outline-primary mt-1"
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "21:00-22:30(1)")
                        }
                      >
                        21:00-22:30(1)
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-info text-white"
                  onClick={saveChanges}
                >
                  Save changes
                </button>
              </Modal.Footer>
            </Modal>
          )
      )}
      {/* Modal1 End */}

      {/* Modal2 Start */}
      {dataList.map(
        data =>
          activeModalId === data._id && (
            <Modal
              show={showModal2}
              onHide={closeModal2}
              size="xl"
              key={data._id}
            >
              <Modal.Header closeButton>
                <Modal.Title>Check Reservation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="border rounded-3 p-3">
                  <h3>Installation / Service is scheduled for {data.date}</h3>
                </div>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <button
                  className="btn btn-info text-white w-50"
                  onClick={cancelDate}
                >
                  Cancel
                </button>
              </Modal.Footer>
            </Modal>
          )
      )}
      {/* Modal2 End */}

      <section>
        <div class="container mt-5">
          <div class="row">
            {dataList.map((data, index) => (
              <table className="mt-3 border border-5">
                <thead>
                  <tr key={data._id}>
                    <th className="text-start">Order</th>
                    <th className="text-start">No</th>
                    <th className="text-start">Subject</th>
                    <th className="text-start">Sub Category</th>
                    <th className="text-start">Process</th>
                    <th className="text-start">Saved By</th>
                    <th className="text-start">Date</th>
                    <th className="text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td className="text-start">
                      SER -{_idLastTwoDigits(data._id)}
                    </td>
                    <td className="text-start" data-label="Order">
                      {data.comments}
                    </td>
                    <td className="text-start" data-label="NO">
                      {data.category === 0
                        ? "Category"
                        : data.category === 1
                        ? "Service"
                        : data.category === 2
                        ? "Maintenance"
                        : data.category}{" "}
                      <br />
                      {data.subCategory === 0
                        ? "Sub Category"
                        : data.subCategory === 1
                        ? "Filter Change"
                        : data.subCategory === 2
                        ? "Cleaning"
                        : data.subCategory}{" "}
                      <br />
                    </td>
                    <td className="text-start" data-label="Process">
                      {data.process === 0
                        ? "Process"
                        : data.process === 1
                        ? "First registration"
                        : data.process === 2
                        ? "Closed"
                        : data.process}
                    </td>
                    <td className="text-start" data-label="Saved By">
                      Gökay Kahraman
                    </td>
                    <td className="text-start" data-label="Date">
                      {data.date}
                    </td>
                    <td className="text-start" data-label="Actions">
                      <i class="btn ">
                        <FaTrash />
                      </i>
                      <i class="btn ">
                        <FaPenSquare />
                      </i>
                      {data.date ? (
                        <button className="btn">
                          <FaCalendarCheck
                            onClick={() => openModal2(data._id)}
                          />
                        </button>
                      ) : (
                        <i className="btn" onClick={() => openModal(data._id)}>
                          <FaCalendarPlus />
                        </i>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Table
