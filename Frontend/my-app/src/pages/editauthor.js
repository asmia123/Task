import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthorURL } from "../config/url-constant";
import moment from "moment";

const validate = Yup.object().shape({
  authorname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Author name is required"),
    dateofBirth: Yup.date()
    .required("dateofBirth is a required field"),
    genre: Yup.string().required("Genre is a required field"),
});

function EditAuthor() {
  const [author, setAuthor] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchauthor = async () => {
      const response = await fetch(AuthorURL+`/${params.authorId}`
       
      );
      const responseData = await response.json();
      console.log(responseData);
      setAuthor(responseData);
    };
    fetchauthor();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(params.authorId);

    
      let res = await fetch(AuthorURL+`/${params.authorId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json();
        if (response.status===201) {
          navigate("/author");
          toast.success(`Author updated successfully`);
         
        }else{
          toast.error("Author doesn't updated successfully");
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
        authorname:author.authorname,
        dateofBirth:author.dateofBirth,
        genre:author.genre
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
                     className={'form-control' + (errors.authorname && touched.authorname ? ' is-invalid' : '')}
                      type="text"
                      name="authorname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.authorname}
                      placeholder="Author Name"
                      id="authorname"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.authorname && touched.authorname && (<div className ="error">{errors.authorname}</div>) }
                  



                    <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.dateofBirth && touched.dateofBirth ? ' is-invalid' : '')}
                      type="date"
                      name="dateofBirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={moment(new Date(values.dateofBirth)).format(
                        "YYYY-MM-DD"
                      )}
                      placeholder="Date of Birth"
                      id="dateofBirth"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.dateofBirth && touched.dateofBirth && (<div className ="error">{errors.dateofBirth}</div>) }




                    <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.genre && touched.genre ? ' is-invalid' : '')}
                      type="text"
                      name="genre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.genre}
                      placeholder="Genre"
                      id="genre"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.genre && touched.genre && (<div className ="error">{errors.genre}</div>) }
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

export default EditAuthor;