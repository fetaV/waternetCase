import React from "react"

const SelectBoxButton = () => {
  return (
    <>
      <section>
        <div className="container mt-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Sales Process</option>
                <option value="1">Call Center Process</option>
                <option value="2">Customer Care Process</option>
              </select>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-info text-white w-100">
                Contract or Subscription Number
              </button>
            </div>
          </div>
        </div>
      </section>

      <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Services Applications</option>
              <option value="1">Call Center Applications</option>
              <option value="2">Pool Records</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectBoxButton
