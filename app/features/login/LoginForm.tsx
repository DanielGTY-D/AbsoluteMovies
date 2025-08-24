import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import type { UserLogin } from "~/models/user.model";
import { api } from "~/services/instanceAPI";
import ErrorMessage from "~/components/UI/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAppStore from "~/store/appStore";
import Toaster from "~/components/UI/toaster/toaester";

const LoginForm = () => {
  const navigate = useNavigate();
  // const setUserInfo = useAppStore((state) => state.setUser);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleLogin = async (formData: UserLogin) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      // setUserInfo(data.user);
      localStorage.setItem("USER_INFO", JSON.stringify(data.user));
      navigate("/admin/profile");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setAlert({ message: error.response.data.error, type: "error" });
        // console.log(error.response.data);
      }
    }
  };

  return (
    <>
      <Toaster message={alert.message} removeFn={setAlert} type={alert.type} />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="shadow-2xl bg-rose-100 rounded-xl lg:max-w-xl lg:mx-auto lg:flex lg:flex-col mt-30 p-4 gap-4"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-xl font-bold">
            Email
          </label>
          <input
            className="outline-none border-2 border-rose-400 py-1.5 px-3 rounded-xl bg-white"
            type="text"
            id="email"
            placeholder="correo@correo.com"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="outline-none border-2 border-rose-400 py-1.5 px-3 rounded-xl bg-white"
            placeholder="password"
            {...register("password", {
              required: "El password se requerido",
              minLength: {
                value: 6,
                message: "Password minimo 6 caracteres",
              },
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          <input
            type="submit"
            value={"Iniciar Sesion"}
            className="bg-rose-700 w-fit py-1.5 px-4 ml-auto rounded-xl text-lg text-white self-end font-semibold transition-colors duration-700 cursor-pointer hover:bg-rose-800"
          />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
