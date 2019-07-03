import React from 'react'
import './TopMenu.scss'
import { Menu, Image, Button, Icon, Header } from 'semantic-ui-react'

interface TopMenuProps {
  logo: string
}

const TopMenu: React.FC<TopMenuProps> = ({ logo }) => {
  return (
    <Menu fixed='top' borderless className='top-menu'>
      <Menu.Item header className='logo'>
        <Image src={logo} size='tiny' />
        <Header className='headerInLogo'>Voimanosto</Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button icon color='green'>
            Log In <Icon name='sign-in' />
          </Button>
          <Menu.Item>
            <Button icon color='red'>
              Log out <Icon name='sign-out' />
            </Button>
          </Menu.Item>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default TopMenu
