/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LibraryURL } from "../config/url-constant";
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  libraryname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .required("Email is a required field"),
});

function AddLibrary() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);
    let res = await fetch(LibraryURL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      .then((response) => {
        response.json();
        if (response.status === 404) {
          toast.error("Library already exist");
        } else if (response.status === 201) {
          toast.success("Successfully created");
          navigate("/login");
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
        libraryname: "",
        address: "",
      }}
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
                  <b>Library</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add a Library</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="libraryname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.libraryname}
                      placeholder="Enter libraryname"
                      id="libraryname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.libraryname && touched.libraryname && errors.libraryname}
                  
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      placeholder="Enter address"
                      id="address"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.address && touched.address && errors.address}
                  
                  {errors.photo && touched.photo && errors.photo}
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
                        // disabled={!validate}
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

export default AddLibrary;