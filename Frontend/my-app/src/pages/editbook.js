import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { MultiSelect } from "react-multi-select-component";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/main.css";
import { toast } from "react-toastify";
import { BooksURL, AuthorURL, LibraryURL } from "../config/url-constant";

// Creating schema
const validate = Yup.object().shape({
  bookname: Yup.string().required().min(3, "Too Short!").max(50, "Too Long!"),
  year: Yup.date().required("Required"),
  authorId: Yup.string().required("Required"),
  // libraryId: Yup.array().required("Required"),
});

function EditAthlete() {
  const [books, setBooks] = useState("");
  const [authors, setAuthor] = useState("");
  const [library, setLibrary] = useState("");
  const [items, setItems] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchbook = async () => {
      const response = await fetch(BooksURL+`/${params.bookId}`
      );
      const responseData = await response.json();
      const library = [];
      {
        responseData.libraryId.map((item) => {
          library.push({ label: item.libraryname, key: item._id, value: item._id });
        });
      }
      console.log("library",library);
      setItems(library);

      setBooks(responseData);
    };
    const getlibrary = async () => {
      
      let res = await fetch(LibraryURL);
      let responseJson = await res.json();
      const Libraryoptions = [];
      for (let i = 0; i < responseJson.length; i++) {
        Libraryoptions.push({
          label: responseJson[i].libraryname,
          key: responseJson[i]._id,
          value: responseJson[i]._id,
        });
      }
      setLibrary(Libraryoptions);
      
      console.log("options library", Libraryoptions);
    };
    const getauthor = async () => {
      
      let res = await fetch(AuthorURL);
      let responseJson = await res.json();

      setAuthor(responseJson);
    };
    fetchbook();
    getlibrary();
    getauthor();
  }, []);

  const onSubmit = async (values, actions) => {
    
    console.log("values",values);
    let res = await fetch(BooksURL+`/${params.bookId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

      .then((response) => {
        if (response.status === 201) {
          response.json();
          toast.success("Updated Successfully");
          navigate("/books");
        } else {
          toast.error("Something invalid happened");
        }
      })

      .catch((error) => {
        toast.error("Something invalid happened");
        console.error(error);
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      enableReinitialize={true}
      initialValues={{
        bookname: books?.bookname,
        year: books?.year,
        authorId: books?.authorId?._id,
        authorname: books?.authorId?.authorname,
        libraryId: items?.map(s=>s.value)
      }}
      // onSubmit={values=>{console.log(values);}}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
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
                <p className="login-box-msg">Edit a Book</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                       className={'form-control' + (errors.bookname && touched.bookname ? ' is-invalid' : '')}
                      type="text"
                      name="bookname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bookname}
                      placeholder="Enter book Name"
                      id="bookname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.bookname &&
                    touched.bookname &&
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
                  <div className="input-group mb-3">
                    <select
                       className={'form-control' + (errors.authorId && touched.authorId ? ' is-invalid' : '')}
                      id="authorId"
                      name="authorId"
                      onChange={handleChange}
                    >
                      <option value={values.authorId}>
                        {values.authorname}
                      </option>
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
                  {errors.authorId &&
                    touched.authorId &&
                    (<div className ="error">{errors.authorId}</div>)}

                  <div className="input-group mb-3">
                    <MultiSelect
                      class="form-control"
                      displayValue="label"
                      value={items}
                      id="libraryId"
                      name="libraryId"
                      onChange={setItems}
                      isCreatable={true}
                      placeholder="Select Libraries"
                      options={library}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                  </div>
                  {errors.libraryId && touched.libraryId && (<div className ="error">{errors.libraryId}</div>)}

                  
                  <div className="row">
                    <div className="col-8"></div>
                    {/* /.col */}
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        // disabled={!validate}
                      >
                        Update
                      </button>
                    </div>
                    {/* /.col */}
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

export default EditAthlete;