/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";
import { AuthorURL } from "../config/url-constant";
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  authorname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Authorname is Required"),
  dateofBirth: Yup.date()
    .required("dateofBirth is a required field"),
  genre: Yup.string().required("Genre is a required field"),
});

function AddAuthor() {
  const navigate = useNavigate();
//   const authCtx = useContext(AuthContext);
  const onSubmit = async (values, actions) => {
    console.log(values);
    let res = await fetch(AuthorURL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      .then((response) => {
        response.json();
        if (response.status === 404) {
          toast.error("Author already exist");
        } else if (response.status === 201) {
          toast.success("Successfully Created");
          navigate("/addbook");
        } else {
          toast.error("Something invalid happened");
        }
      })
      .catch((err) => {
        toast.error(`${err}`);
        console.error("error", err);
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        authorname: "",
        dateofBirth: "",
        genre: "",
      }}
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
                  <b>Author</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add an Author</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="authorname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.authorname}
                      placeholder="Enter authorname"
                      id="authorname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.authorname && touched.authorname && errors.authorname}
                  
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="date"
                      name="dateofBirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dateofBirth}
                      placeholder="Enter dateofBirth"
                      id="dateofBirth"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.dateofBirth && touched.dateofBirth && errors.dateofBirth}
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="string"
                      name="genre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.genre}
                      placeholder="Enter genre"
                      id="genre"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  {errors.genre && touched.genre && errors.genre}
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Add
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

export default AddAuthor;