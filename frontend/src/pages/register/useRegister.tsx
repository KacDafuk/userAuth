import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { AUTH_URL } from "../../Consts";
import { useState } from "react";
import { handleRespData } from "../../utils/utilsAuth";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  name: yup.string().required(),
});

const useRegister = () => {
  const [registerError, setRegisterError] = useState("");
  async function submitRegister(data: any) {
    try {
      const resp = await fetch(
        AUTH_URL + "/register",
        getAuthFetchOptions(data)
      );
      handleRespData(await resp.json());
    } catch (e) {
      if (e instanceof Error) {
        setRegisterError(e.message);
        return;
      }
      setRegisterError("registration failed");
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    submitRegister,
    registerError,
  };
};

export default useRegister;
