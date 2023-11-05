import React from "react"

const BreadCrumb = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow">
                  <li className="breadcrumb-item">
                    <a href="form.js" className="text-uppercase">
                      Applications
                    </a>
                  </li>
                  <li
                    aria-current="page"
                    className="breadcrumb-item active text-uppercase"
                  >
                    Purunity Applications
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BreadCrumb
