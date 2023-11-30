import {LightTheme, BaseProvider} from 'baseui'; // baseui setup
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// base web config
import {Client as Styletron} from 'styletron-engine-atomic'; // #
import {Provider as StyletronProvider} from 'styletron-react'; // #

// import { Header, Footer } from './components';
import { Header } from './components';
import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { Home, About, Login, Register, Dashboard, NotFound } from './pages';
import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

const engine = new Styletron(); // #

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <DepsProvider deps={{
          accessService: new AccessService(),
        }}>
          <Router>
            <div className='container'>
              <Header />
              <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/todo/:user' element={<Dashboard />} />
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              {/* <Footer /> */}
            </div>
          </Router>
        </DepsProvider>
        
      </BaseProvider>
    </StyletronProvider>
  );
}
