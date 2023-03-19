import React from 'react'
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {toast } from "react-toastify"
import { LibraryURL } from "../config/url-constant";
const Libraries = () => {
    const [libraries, setLibrary] = useState("");
  useEffect(() => {
    fetchlibraries();
  }, []);
  const fetchlibraries = async () => {
    const response = await fetch(LibraryURL);

    const responseData = await response.json();
    console.log(responseData);
    setLibrary(responseData);
  };

  const deletelibrary = async (id) => {
    console.log(id);

    const response = await fetch(LibraryURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // response.json();
        if (response.status === 204) {
          toast.success("Library deleted Successfully");
          fetchlibraries();
        } else {
          toast.error(`Library doesn't delete `);
        }
      })

      .catch((error) => {
        toast.error(`Something went wrong`);
        console.error(error);
      });
  };
  return (
    <div>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Libraries</h1>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">All Libraries</h3>
                    <div class="card-tools">
                      <Link to="/addlibrary">
                        <i class="fas fa-plus" />
                        &nbsp; Add Library
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Library Name</th>
                          <th style={{ paddingLeft: "50px" }}>Address</th>
                          <th style={{ width: "40px", paddingLeft: "50px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {libraries && libraries.length>0 && libraries.map((library) => (
                          <>
                            <tr key={library._id}>
                              <td style={{ padding: "25px" }}>
                                {library.libraryname}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {library.address}
                              </td>
                              <td style={{ padding: "25px" }}>
                                <Link to={`/editlibrary/${library._id}`}>
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <i
                                  class="fas fa-trash deleteicon"
                                  onClick={() => deletelibrary(library._id)}
                                ></i>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Libraries
