import { Button, KIND, SHAPE } from 'baseui/button';
import { Input } from 'baseui/input';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../../contexts/user.context';
import { AccessService } from '../../../services';

export default function Register(): React.ReactElement {
  const navigation = useNavigate();
  const accessService = new AccessService();

  const {
    name, username, email, password,
    setName, setUsername, setEmail, setPassword,
  } = useUserContext();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const usern = localStorage.getItem('username');
    if (token) navigation(`/todo/${usern}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setError(false);
    try {
      await accessService.register(
        name,
        username,
        email,
        password,
      );

      // const object = await accessService.login(username, password);
      const usertoken: any = await accessService.getToken(
        username,
        password,
      );

      // store data in local storage and navigate to dashboard
      if (usertoken.data.token) {
        localStorage.setItem('token', usertoken.data.token);
        localStorage.setItem('userid', usertoken.data.accountId);
        localStorage.setItem('username', username);
        navigation(`/todo/${username}`);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(false);
    }
  };
  /// /////////////////////////////////////////////////

  return (
    <>
      <form>
        {success ? <h2 id="success">SUCCESS!</h2> : null}
        {error ? <h2 id="error">ERROR!</h2> : null}
        <Input
          startEnhancer="👑"
          id="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        /><br />
        <Input
          startEnhancer="👤"
          id="username"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
        /><br />
        <Input
          startEnhancer="📧"
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        <Button onClick={handleSubmit} >Register</Button>
        <Button onClick={() => navigation('/')} kind={KIND.secondary} shape={SHAPE.pill}>close</Button>
        </div>
        <br />
        <p> Already registered?.. <a href="/login"> Sign In</a> </p>
      </form>

    </>
  );
}
