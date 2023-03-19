import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {toast } from "react-toastify"
import { AuthorURL } from "../config/url-constant";
import moment from "moment"
const Authors = () => {
  const [authors, setAuthor] = useState("");
  useEffect(() => {
    fetchauthors();
  }, []);
  const fetchauthors = async () => {
    const response = await fetch(AuthorURL);

    const responseData = await response.json();
    console.log(responseData);
    setAuthor(responseData);
  };

  const deleteAuthor = async (id) => {
    console.log(id);

    const response = await fetch(AuthorURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // response.json();
        if (response.status === 204) {
          toast.success("Author deleted Successfully");
          fetchauthors();
        } else {
          toast.error(`Author doesn't delete `);
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
                <h1>Authors</h1>
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
                    <h3 class="card-title">All Authors</h3>
                    <div class="card-tools">
                      <Link to="/addauthor">
                        <i class="fas fa-plus" />
                        &nbsp; Add Author
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Author Name</th>
                          <th style={{ paddingLeft: "50px" }}>Genre</th>
                          <th>Date of Birth</th>
                          <th style={{ width: "40px", paddingLeft: "50px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {authors && authors.length>0 &&authors.map((author) => (
                          <>
                            <tr key={author._id}>
                              <td style={{ padding: "25px" }}>
                                {author.authorname}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {author.genre}
                              </td>
                              <td style={{ padding: "25px" }}>
                              {moment(new Date(author.dateofBirth)).format(
                        "DD-MM-YYYY"
                      )}
                                {/* {author.dateofBirth} */}
                              </td>
                              <td style={{ padding: "25px" }}>
                                <Link to={`/editauthor/${author._id}`}>
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <i
                                  class="fas fa-trash deleteicon"
                                  onClick={() => deleteAuthor(author._id)}
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

export default Authors;
