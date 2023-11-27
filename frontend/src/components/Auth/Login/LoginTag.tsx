import { useState } from "react";
import { login } from "./LoginAction";
import { connect, useDispatch } from "react-redux";
import "./Login.css"
import { IUserData } from "./LoginAction";

interface ILoginAuth {
  login: (userdata: IUserData, redirectTo: string) => void;
  auth: any;
}

const LoginTag = (props: ILoginAuth) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    const userData = {
      username: username,
      password: password,
    };
    console.log('loged')
    props.login(userData, "/");
  };
  return (
    <div className="w-full">
      <div className="">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          className="border-2 border-green-500 rounded px-2 mx-2 my-2 text-black"
          placeholder=" "
          required
        />
        <label
          htmlFor="username"
          className="text-black"
        >
          Username
        </label>
      </div>
      <div className="">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="border-2 border-green-500 rounded px-2 mx-2 my-2 text-black"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="text-black"
        >
          Password
        </label>
      </div>
      <button
        onClick={onLoginClick}
        type="submit"
        className="text-green-500 bg-white border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Подтвердить
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LoginTag);
