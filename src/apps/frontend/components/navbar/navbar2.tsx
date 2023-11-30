import { Avatar } from 'baseui/avatar';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import {StyledLink as Link} from 'baseui/link';
import * as React from 'react';

export default function Navbar2(): React.ReactElement {
  return (
    <HeaderNavigation>
      <NavigationList $align={ALIGN.left}>
        <NavigationItem >ToDo</NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Link href="#basic-link1">Logout</Link>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Button onClick={() => alert('click')} kind={KIND.secondary} size={SIZE.compact} shape={SHAPE.pill}><Avatar name="Jane Doe" size="scale1000" src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy" /> Profile</Button>
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
}

// {/* <NavigationItem>
//           <Avatar name="Jane Doe" size="scale1000" src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy" />
//         </NavigationItem> */}