import React from "react"

const ModalComponent = () => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Installation Agenda
                </label>
              </div>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  10.08.2023 <br />
                  Thursday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  11.08.2023 <br />
                  Friday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  12.08.2023 <br />
                  Saturday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  13.08.2023 <br />
                  Sunday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  14.08.2023 <br />
                  Monday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
                <div className="col-md">
                  15.08.2023 <br />
                  Tuesday
                  <div className="btn btn-outline-primary mt-1">
                    09:00-10:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    10:30-12:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    12:00-13:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    13:30-15:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    15:00-16:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    16:30-18:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    18:00-19:30(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    19:30-21:00(1)
                  </div>
                  <div className="btn btn-outline-primary mt-1">
                    21:00-22:30(1)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-info text-white">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent
