import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './header'

function Layout () {
  return (
    <div className='app-layout'>
      <Sidebar />

      <div className='app-content'>
        <Header />

        <main className='page-content'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
