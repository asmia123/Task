/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";
import { SignupURL } from "../config/url-constant";
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
  photo: Yup.mixed()
    .nullable()
    .required("A file is required")
    .test(
      "size",
      "Filesize is too big",
      (value) => value && value.size <= 5 * 1024 * 1024 // 5MB
    )
    .test(
      "type",
      "Invalid file format selection",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  acceptedTos: Yup.boolean().oneOf([true], "Please Accept terms of service"),
});

function Login() {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const onSubmit = async (values, actions) => {
    console.log(values);
    const data = new FormData();
    console.log(file);
    data.append("username", values.username);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("photo", file);
    let res = await fetch(SignupURL, {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 404) {
          toast.error("Email already exist");
        } else if (response.status === 201) {
          toast.success("Successfully Registered");
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
        userName: "",
        email: "",
        password: "",
        photo: null,
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
                  <b>Registration</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Log in to start your session</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter userName"
                      id="username"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.username && touched.username && errors.username}
                  
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email"
                      id="email"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.email && touched.email && errors.email}
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      id="password"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  {errors.password && touched.password && errors.password}
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                        setFile(event.currentTarget.files[0]);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
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
                        disabled={!validate}
                      >
                        Register
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </Form>
                <p className="mb-1"></p>
                <p className="mb-0">
                  <Link to="/login" element={<Login />}>
                    I already have a membership
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;