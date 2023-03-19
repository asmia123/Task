/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BooksURL } from "../config/url-constant";
import moment from "moment";
import "./main.css";
const Books = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const deletebook = async (id) => {
    console.log(id);
    const response = await fetch(BooksURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Book deleted Successfully");
          navigate("/books");
        } else {
          toast.error(`Book doesn't deleted `);
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
                <h1>Books</h1>
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
                    <h3 class="card-title">All Books</h3>
                    <div class="card-tools">
                      <Link to="/addbook">
                        <i class="fas fa-plus" />
                        &nbsp; Add Book
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Book Name</th>
                          <th>Year</th>
                          <th>Author Name</th>
                          <th>Date of Birth</th>
                          <th>Genre</th>
                          <th>Library Name</th>
                          <th>Address</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state && state.searchItems !== undefined && state.searchItems.map((book) => (
                          <>
                            <tr key={book._id}>
                              <td style={{ padding: "25px" }}>
                                {book.bookname}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {book?.year}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {book?.authorId?.authorname}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {moment(new Date(book?.authorId?.dateofBirth)).format(
                        "DD-MM-YYYY"
                      )}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {book?.authorId?.genre}
                              </td>
                              
                              {book?.libraryId?.map((library) => (<>
                                <div class="libraryname">
                                <td style={{ padding: "25px" }}>
                                {library.libraryname}
                              </td>
                              </div>
                              <td style={{ padding: "25px" }}>
                              {library?.address}
                            </td></>
                              ))}
                          
                              <td style={{ padding: "25px" }}>
                                <Link to={`/editbooks/${book._id}`}>
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <i
                                  class="fas fa-trash deleteicon"
                                  onClick={() => deletebook(book._id)}
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
  );
};

export default Books;