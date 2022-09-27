import { useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  let [duplicateUser, setDuplicateUser] = useState("");

  //form submit
  const formSubmit = async (newUserObj) => {
    //make HTTP POST req
    let res = await axios.post(
      "http://localhost:4000/user/create-user",
      newUserObj
    );

    console.log("res is ",res);
    if (res.data.message === "User existed") {
      setDuplicateUser("User already existed");
    } else {
      console.log("in else", res);
      //navigate to user login
      navigate("/login");
    }
  };

  return (
    <div>
      <p className="display-3 text-center">User Regitsration</p>
      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* message about duplaicate user */}
          {duplicateUser !== "" && (
            <p className="alert alert-danger  display-5 text-center">{duplicateUser}</p>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold">* Username is required</p>
              )}
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold">* Password is required</p>
              )}
            </div>
            {/* date of birth */}
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of birth
              </label>
              <input
                type="date"
                id="dob"
                className="form-control"
                {...register("dob", { required: true })}
              />
              {errors.dob?.type === "required" && (
                <p className="text-danger fw-bold">
                  * Date of birth is required
                </p>
              )}
            </div>
            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger fw-bold">* Email is required</p>
              )}
            </div>
            {/* submit button */}
            <button className="btn btn-outline-success" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
