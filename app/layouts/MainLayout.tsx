import { Outlet } from "react-router"
import Header from "~/components/UI/header/Header";

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default MainLayout;