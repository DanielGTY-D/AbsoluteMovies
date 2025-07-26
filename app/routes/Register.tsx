import { ToastContainer } from "react-toastify";
import { ClientOnly, SecondaryHeader } from "~/components/UI";
import RegisterForm from "~/features/register";

const Register = () => {
  return (
    <>
      <SecondaryHeader />
      <RegisterForm />
    </>
  );
};

export default Register;
