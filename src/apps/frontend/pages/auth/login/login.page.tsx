import { Button, KIND, SHAPE } from "baseui/button";
import {Input} from 'baseui/input';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeps } from '../../../contexts';
import { useUserContext } from "../../../contexts/user.context";

export default function Login(): React.ReactElement {
  const navigation = useNavigate();
  const { accessService } = useDeps();

  const { username, password, setUsername, setPassword } = useUserContext();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = useCallback(async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      await accessService.login(username, password);
      setSuccess(true);

      // generate token for login
      const usertoken: any = await accessService.getToken(username, password);

      if (usertoken.data.token) {
        localStorage.setItem('token', usertoken.data.token);
        localStorage.setItem('userid', usertoken.data.accountId);
        localStorage.setItem('username', username);
      }

      // navigate to the todo page from here
      navigation(`/todo/${username}`);
    } catch (err) {
      setError(true);
    }
  }, [accessService, username, password, navigation]);

  return (
    <>
      <form>
        {success ? <h2 id="success">SUCCESS!</h2> : null}
        {error ? <h2 id="error">ERROR!</h2> : null}
        <Input
          startEnhancer="👤"
          id="username"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
        /><br />
        <Input
          startEnhancer="🔐"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
          type="password"
          placeholder="Password"
        /> <br />
        <div className="d-flex justify-content-between">
        <Button onClick={login} >Login</Button>
        <Button onClick={() => navigation('/')} kind={KIND.secondary} shape={SHAPE.pill}>close</Button>
        </div>
        <br />
        <p className="message">
              Not registered?
              <a href="/register">Create an account</a>
        </p>
      </form>

    </>
  );
}

// {/* <input
//           onChange={(e) => setUsername(e.target.value)}
//           id="username"
//           value={username}
//           type="text"
//         />
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           id="password"
//           value={password}
//           type="password"
//         /> */}
// {/* <button type="button" onClick={login}> LOGIN </button> */}
