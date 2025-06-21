import { Outlet } from "react-router"
import Header from "~/components/UI/header/MainHeader";

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default MainLayout;