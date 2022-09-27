import { useEffect, useState } from "react";
import "./Login.css";
import userLoginSlice from "../../store/userLoginSlice";
import { useSelector, useDispatch } from "react-redux";
import { userLoginLifeCycle } from "../../store/userLoginSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  let [errMsg, setErrMsg] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { userObj, isSuccess, isError, errorMessage, isPending } = useSelector(
    (state) => state.userLogin
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //form submit
  const formSubmit = (userCredObj) => {
    let actionObj = userLoginLifeCycle(userCredObj);
    dispatch(actionObj);
  };

  //use effect
  useEffect(() => {
    if (isError === true) {
      setErrMsg(errorMessage);
    } else if (isSuccess === true) {
      setErrMsg("");
      //navigate to user profile
      navigate("/userprofile");
    }
  }, [isPending, isSuccess, isError]);

  return (
    <div>
      <p className="display-3 text-center">User Login</p>
      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* message about duplaicate user */}
          {errMsg !== "" && (
            <p className="alert alert-danger  display-5 text-center">
              {errMsg}
            </p>
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

            {/* submit button */}
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
