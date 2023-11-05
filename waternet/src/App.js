import React from "react"
import Modal from "./Modal"
import NavbarLine from "./NavbarLine"
import BreadCrumb from "./BreadCrumb"
import SelectBoxButton from "./SelectBoxButton"
import Table from "./Table"
import Form from "./Form"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div>
      <Modal />
      <NavbarLine />
      <BreadCrumb />
      <SelectBoxButton />
      <Table />
      <Form />
    </div>
  )
}

export default App
