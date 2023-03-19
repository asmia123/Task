/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LibraryURL, AuthorURL, BooksURL} from "../config/url-constant"
import "./main.css";
import AddAuthor from "./addauthor";
import AddLibrary from "./addlibrary";
// Creating schema
const validate = Yup.object().shape({
  bookname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Book name is required"),
  year: Yup.date().required("Published year is required"),
  authorId: Yup.string().required("Author is required"),
  libraryId: Yup.array().required("Library is a required field"),
});

function AddBook() {
  const [authors, setAuthor] = useState("");
  const [libraries, setLibrary] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [isLibrary, setIsLibrary] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getlibrary = async () => {
      let res = await fetch(LibraryURL);
      let responseJson = await res.json();
      console.log(responseJson);
      const Library = [];
      for (let i = 0; i < responseJson.length; i++) {
        Library.push({
          label: responseJson[i].libraryname,
          key: responseJson[i]._id,
          value: responseJson[i]._id,
        });
      }
      setLibrary(Library);
    };
    const getauthor = async () => {
      let res = await fetch(AuthorURL);
      let responseJson = await res.json();
console.log(responseJson)
      setAuthor(responseJson);
    };

    getlibrary();
    getauthor();
  }, []);

  const onSubmit = async (values, actions) => {
    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i].value);
      values.libraryId.push(selected[i].value);
    }
    console.log(values);
  
    let res = await fetch(BooksURL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
  
      .then((response) => {
        response.json();
        if (response.ok) {
          toast.success("Book added successfully");

          navigate("/books");
        } else {
          toast.error("Something invalid happened");
        }
      })

      .catch((error) => {
        console.error(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        bookname: "",
        year: "",
        authorId: "",
        libraryId: [],
      }}
      // onSubmit={(values) => {
      //   console.log(values);
      // }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <div class="hold-transition register-page">
          <div class="register-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>Book</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add a Book</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                    className={'form-control' + (errors.bookname && touched.bookname ? ' is-invalid' : '')}
                      type="text"
                      name="bookname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bookname}
                      placeholder="Enter Book Name"
                      id="bookname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                   
                  </div>
                  {(errors.bookname &&
                      touched.bookname) &&
                      (<div className ="error">{errors.bookname}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')}
                      type="text"
                      name="year"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.year}
                      placeholder="Enter Year"
                      id="year"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="far fa-calendar-alt" />
                      </div>
                    </div>
                    
                  </div>
                  {errors.year &&
                      touched.year &&
                      (<div className ="error">{errors.year}</div>)}

                   <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="acceptedTos" checked={isChecked}
                        onChange={() => setIsChecked((prev) => !prev)}
                        />
                        <label htmlFor="acceptedTos">
                          Author Exist
                        </label>
                      </div>
                    </div>
                    </div>
                    {isChecked ?(<>
                      <div className="input-group mb-3">
                    <select
                      className={'form-control' + (errors.authorId && touched.authorId ? ' is-invalid' : '')}
                      value={values.authorId}
                      id="authorId"
                      name="authorId"
                      onChange={handleChange}
                    >
                      <option value="">Select an Author</option>
                      {authors.length > 0 &&
                        authors.map((author) => (
                          <option key={author._id} value={author._id}>
                            {author.authorname}
                          </option>
                        ))}
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                  </div>
                  {errors.authorId && touched.authorId && (<div className ="error">{errors.authorId}</div>)}
                    </>):(<Link to="/addAuthor" element={<AddAuthor />}>AddAuthor</Link>)}
                  
                    <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="accepted" checked={isLibrary}
                        onChange={() => setIsLibrary((prev) => !prev)}
                        />
                        <label htmlFor="accepted">
                          Library Exist
                        </label>
                      </div>
                    </div>
                    </div>
                    {isLibrary ?(<><div className="input-group mb-3">
                    <MultiSelect
                      style={{ width: "500px " }}
                      className={'rmsc' + (errors.libraryId && touched.libraryId ? ' is-invalid' : '')}
                      displayValue="label"
                      value={selected}
                      id="libraryId"
                      name="libraryId"
                      onChange={setSelected}
                      isCreatable={true}
                      placeholder="Select Libraries"
                      options={libraries}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                   
                  </div>
                  {errors.libraryId && touched.libraryId && (<div className ="error">{errors.libraryId}</div>)}
                  
                    </>):(<Link to="/addlibrary" element={<AddLibrary />}>AddLibrary</Link>)}
                  
                  <span></span>

                  <div className="row">
                    <div className="col-8"></div>

                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default AddBook;