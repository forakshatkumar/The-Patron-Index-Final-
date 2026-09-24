import { NavLink } from 'react-router-dom'

function Sidebar () {
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '▦'
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: '◉'
    },
    {
      name: 'Customer Segments',
      path: '/segments',
      icon: '◫'
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: '↔'
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: '⌁'
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: '▤'
    }
  ]

  return (
    <aside className='sidebar'>
      <NavLink to='/dashboard' className='sidebar-brand'>
        <div className='brand-logo'>P</div>

        <div>
          <h2>The Patron Index</h2>
          <span>Customer Intelligence</span>
        </div>
      </NavLink>

      <div className='sidebar-section-label'>WORKSPACE</div>

      <nav className='sidebar-nav'>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <span className='sidebar-icon'>{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className='sidebar-bottom'>
        <NavLink to='/import' className='import-button'>
          <span>＋</span>
          Import Data
        </NavLink>

        <NavLink
          to='/settings'
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          <span className='sidebar-icon'>⚙</span>
          <span>Settings</span>
        </NavLink>

        <div className='sidebar-user'>
          <div className='sidebar-avatar'>AK</div>

          <div className='sidebar-user-info'>
            <strong>Brew & Bites</strong>
            <span>Business Account</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
