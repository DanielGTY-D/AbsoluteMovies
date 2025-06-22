import { Outlet } from "react-router"
import SecondaryHeader from "~/components/UI/header/SecondaryHeader";


const MainLayout = () => {
  return (
    <>
      <SecondaryHeader />
      <Outlet />
    </>
  )
}

export default MainLayout;