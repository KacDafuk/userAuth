import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getAuthFetchOptions,
  handleError,
  handleRespData,
} from "../../utils/utilsAuth";
import { AUTH_URL } from "../../Consts";
import { useState } from "react";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});
const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function submitLogin(data: any) {
    try {
      const response = await fetch(
        AUTH_URL + "/login",
        getAuthFetchOptions(data)
      );
      const respData = await response.json();
      handleRespData(respData);
      const { user } = respData;
      if (user) {
        localStorage.setItem("token", user);
        navigate("/dashboard");
        return;
      }
    } catch (e: unknown) {
      handleError(e, setLoginError);
    }
  }
  console.log(loginError, "ERROR LOGIN");
  return {
    register,
    handleSubmit,
    errors,
    submitLogin,
    loginError,
  };
};

export default useLogin;
