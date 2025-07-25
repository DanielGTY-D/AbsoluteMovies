import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import type { UserRegister } from "~/models/user.model";
import { api } from "~/services/instanceAPI";
import ErrorMessage from "~/components/UI/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState<{ message: string; type: string }>({
    message: "",
    type: "",
  });
  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleRegister = async (formData: UserRegister) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      setFormInfo({
        message: data.msg,
        type: "succes",
      });
      reset();
      if (data.msg) {
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setFormInfo({
          message: error.response.data.error,
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
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
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-xl font-bold">
            Username
          </label>
          <input
            className="outline-none border-2 border-rose-400 py-1.5 px-4 rounded-xl bg-white"
            type="text"
            id="username"
            placeholder="E.j: FernandoHerrera"
            {...register("username", {
              required: "El username se requerido",
            })}
          />

          {errors.username && (
            <ErrorMessage>{errors.username?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          {!Object.values(formInfo).includes("") && (
            <p
              className={`${
                formInfo.type === "succes"
                  ? "bg-lime-200 text-black text-lg border border-lime-800 rounded-lg py-1 px-2"
                  : "bg-rose-200 text-black border border-rose-400 rounded-lg py-1 px-2"
              }`}
            >
              {formInfo.message}
            </p>
          )}
          <input
            type="submit"
            value={"Registrarse"}
            className="bg-rose-700 w-fit py-1.5 px-4 ml-auto rounded-xl text-lg text-white self-end font-semibold transition-colors duration-700 cursor-pointer hover:bg-rose-800"
          />
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
