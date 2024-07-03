import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { FaHome, FaUser, FaCog } from 'react-icons/fa'; 




export default function NavBar(){


    return (
      <div className=''>
       <Navbar color="light" light expand="md" className='rounded-xl shadow mt-4 mb-2' >
      <NavbarBrand href="/">
        <img src="" alt="Logo" className='w-44' />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">
            <FaHome />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">
            <FaUser />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">
            <FaCog />
          </NavLink>
        </NavItem>
      </Nav>
      </Navbar>

      </div>
     
       
    )
}