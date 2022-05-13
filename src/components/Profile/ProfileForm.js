import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const passInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPass = passInputRef.current.value;

    //validation optional

    //sending request to backend
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDACiH6-BUE2ajtbTiPwQZxH72WFBHLrtY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          history.replace("/");
          return res.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={passInputRef}
          type="password"
          minLength="6"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
