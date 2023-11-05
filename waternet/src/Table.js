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
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option1"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option1"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option2"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option2"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option3"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option3"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option4"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option4"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option5"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option5"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option6"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option6"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option7"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option7"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option8"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option8"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option9"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option9"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      10.08.2023 <br />
                      Thursday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option10"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option10"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option11"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option11"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option12"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option12"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option13"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option13"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option14"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option14"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option15"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option15"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option16"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option16"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option17"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option17"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option18"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("10.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option18"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      11.08.2023 <br />
                      Friday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option19"
                        autoComplete="off"
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "9:30-10:30(1)")
                        }
                        defaultChecked=""
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option19"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option20"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option20"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option21"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option21"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option22"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option22"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option23"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option23"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option24"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option24"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option25"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option25"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option26"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option26"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option27"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("11.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option27"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      12.08.2023 <br />
                      Saturday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option28"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option28"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option29"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option29"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option30"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option30"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option31"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option31"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option32"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option32"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option33"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option33"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option34"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option34"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option35"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option35"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option36"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("12.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option36"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      13.08.2023 <br />
                      Sunday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option37"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option37"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option38"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option38"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option39"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option39"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option40"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option40"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option41"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option41"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option42"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option42"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option43"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option43"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option44"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option44"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option45"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("13.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option45"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      14.08.2023 <br />
                      Monday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option46"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option46"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option47"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option47"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option48"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option48"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option49"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option49"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option50"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option50"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option51"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option51"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option52"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option52"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option53"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option53"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option54"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("14.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option54"
                      >
                        21:00-22:30(1)
                      </label>
                    </div>
                    <div className="col-md">
                      09.08.2023 <br />
                      Wednesday
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option55"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "9:30-10:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option55"
                      >
                        9:30-10:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option56"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "10:30-12:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option56"
                      >
                        10:30-12:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option57"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "12:00-13:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option57"
                      >
                        12:00-13:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option58"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "13:30-15:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option58"
                      >
                        13:30-15:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option59"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "15:00-16:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option59"
                      >
                        15:00-16:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option60"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "16:30-18:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option60"
                      >
                        16:30-18:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option61"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "18:00-19:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option61"
                      >
                        18:00-19:30(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option62"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "19:30-21:00(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option62"
                      >
                        19:30-21:00(1)
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="option63"
                        autoComplete="off"
                        defaultChecked=""
                        onClick={() =>
                          handleTimeSlotClick("09.08.2023", "21:00-22:30(1)")
                        }
                      />
                      <label
                        className="btn btn-secondary mt-1"
                        htmlFor="option63"
                      >
                        21:00-22:30(1)
                      </label>
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
