import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LibraryURL } from "../config/url-constant";

const validate = Yup.object().shape({
  libraryname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Author name is required"),
    address: Yup.string().required("Genre is a required field"),
});

function EditLibrary() {
  const [library, setLibrary] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchauthor = async () => {
      const response = await fetch(LibraryURL+`/${params.libraryId}`
       
      );
      const responseData = await response.json();
      console.log(responseData);
      setLibrary(responseData);
    };
    fetchauthor();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(params.libraryId);

    
      let res = await fetch(LibraryURL+`/${params.libraryId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json();
        if (response.status===201) {
          navigate("/library");
          toast.success(`Library updated successfully`);
         
        }else{
          toast.error("Library doesn't updated successfully");
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
      enableReinitialize={true}
      initialValues={{
        libraryname:library.libraryname,
        address:library.address
      }}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <div class="hold-transition register-page">
          <div class="register-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>Author</b>
                </h1>
              </div>

              <div className="card-body">
                <p className="login-box-msg">Update Author</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.libraryname && touched.libraryname ? ' is-invalid' : '')}
                      type="text"
                      name="libraryname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.libraryname}
                      placeholder="Library Name"
                      id="libraryname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.libraryname && touched.libraryname && (<div className ="error">{errors.libraryname}</div>) }
                

                    <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      placeholder="Address"
                      id="address"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.address && touched.address && (<div className ="error">{errors.address}</div>) }
                  <div className="row">
                  <div className="col-8"></div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Update
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

export default EditLibrary;