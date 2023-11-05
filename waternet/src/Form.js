import React, { useState } from "react"
import axios from "axios"

const Form = () => {
  const [comments, setComments] = useState("")
  const [category, setCategory] = useState(0)
  const [subCategory, setSubCategory] = useState(0)
  const [process, setProcess] = useState(0)
  const [date, setDate] = useState("")

  const submitLists = async e => {
    e.preventDefault()
    let requestBody = {
      comments: comments,
      category: category,
      subCategory: subCategory,
      process: process,
      date: date,
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users",
        requestBody
      )
      console.log(response)
      setDate("")
      window.location.reload()
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error)
    }
  }

  const handleCategoryChange = e => {
    const selectedCategory = parseInt(e.target.value)
    let selectedSubCategory = 0

    if (selectedCategory === 1) {
      selectedSubCategory = 1
    } else if (selectedCategory === 2) {
      selectedSubCategory = 2
    }

    setCategory(selectedCategory)
    setSubCategory(selectedSubCategory)
  }

  const isFormValid = comments && category && subCategory && process

  return (
    <section>
      <form>
        <div className="container p-5 mt-5">
          <div className="row col-md-8 d-flex justify-content-center">
            <div className="col-md-3">
              <select
                className="form-select"
                name="category"
                aria-label="Default select example"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value={1}>Service</option>
                <option value={2}>Maintenance</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="subCategory"
                aria-label="Default select example"
                value={subCategory}
                onChange={e => {
                  setSubCategory(e.target.value)
                }}
              >
                <option value={1}>Filter Change</option>
                <option value={2}>Cleaning</option>
              </select>
            </div>
          </div>
          <div className="row mt-2 d-flex justify-content-center">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                name="subject"
                placeholder="Subject: SER - 99 / Cari Adı"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={comments}
                onChange={e => {
                  setComments(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="row mt-2 col-md-6 d-flex justify-content-center">
            <div className="col-md-4">
              <select
                className="form-select"
                name="process"
                aria-label="Default select example"
                value={process}
                onChange={e => {
                  setProcess(e.target.value)
                }}
              >
                <option value={1}>First registration</option>
                <option value={2}>Closed</option>
              </select>
            </div>
          </div>
          <div className="row mt-2 d-flex justify-content-center">
            <div className="col-md-8">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  name="comments"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></textarea>
                <label htmlFor="floatingTextarea">Comments</label>
              </div>
            </div>
            <div className="col-md-8 text-end mt-2">
              <div className="btn btn-info disabled">Delete</div>
              <div className="btn btn-info disabled">Update</div>
              <button
                type="button"
                className={`btn btn-info ${isFormValid ? "" : "disabled"}`}
                onClick={submitLists}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Form
