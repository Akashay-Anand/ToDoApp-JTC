// import { Avatar } from 'baseui/avatar';
// import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import {StyledLink as Link} from 'baseui/link';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar2(): React.ReactElement {
  const navigation = useNavigate();
  const [isLogedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [isLogedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    setisLoggedIn(false);
    navigation('/login');
  };

  return (
    <HeaderNavigation>
      <NavigationList $align={ALIGN.left}>
        <NavigationItem >ToDo</NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Link onClick={handleLogout} >Logout</Link>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        {/* <NavigationItem>
          <Button onClick={() => alert('click')} kind={KIND.secondary} size={SIZE.compact} shape={SHAPE.pill}><Avatar name="Jane Doe" size="scale1000" src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy" /> Profile</Button>
        </NavigationItem> */}
      </NavigationList>
    </HeaderNavigation>
  );
}

// {/* <NavigationItem>
//           <Avatar name="Jane Doe" size="scale1000" src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy" />
//         </NavigationItem> */}