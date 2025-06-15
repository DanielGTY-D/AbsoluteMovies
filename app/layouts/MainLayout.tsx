import { Outlet } from "react-router"
import Header from "~/components/UI/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  )
}

export default MainLayout;