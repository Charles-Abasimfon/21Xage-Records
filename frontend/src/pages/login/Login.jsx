import { useState, useContext } from 'react';
import { DarkModeContext } from '../../context/dark_mode/darkModeContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import { loginReset } from '../../context/authContext/AuthActions';
import LoginIcon from '@mui/icons-material/Login';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import logo from '../../assets/logo/21xage.webp';
import './login.scss';
import { login } from '../../apicalls/authCalls';

function Login() {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const {
    isFetching,
    dispatch: authDispatch,
    error,
    errorMsg,
  } = useContext(AuthContext);

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  });

  const handleFormInputChange = (event) => {
    authDispatch(loginReset());
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(
      { email: formInputs.email, password: formInputs.password },
      authDispatch
    );
  };

  return (
    <div className='login-container'>
      <div className='colormode-icon-container'>
        {darkMode ? (
          <DarkModeOutlinedIcon
            className='colormode-icon'
            onClick={() => dispatch({ type: 'LIGHT_MODE' })}
          />
        ) : (
          <LightModeOutlinedIcon
            className='colormode-icon'
            onClick={() => dispatch({ type: 'DARK_MODE' })}
          />
        )}
      </div>
      <img src={logo} alt='21Xage Logo' className='logo' />
      <p className='logo-text'>Admin Dashboard & Records Management</p>
      <div className='login-form-container'>
        <form>
          <h3 className='form-title'>Welcome!</h3>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder=''
              value={formInputs.email}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder=''
              value={formInputs.password}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-btn-container'>
            <button
              className='btn'
              onClick={(event) => handleLogin(event)}
              disabled={isFetching}
            >
              {!isFetching ? (
                <>
                  LOG IN <LoginIcon style={{ marginLeft: '5px' }} />
                </>
              ) : (
                <>
                  LOADING{' '}
                  <CircularProgress size={20} style={{ marginLeft: '5px' }} />
                </>
              )}
            </button>
          </div>
          {error && <Error errorMsg={errorMsg} />}
        </form>
      </div>
      <a
        className='need-help'
        href='mailto:devabascharles@gmail.com'
        target='_blank'
      >
        Any issues? Contact developer: devabascharles@gmail.com
      </a>
    </div>
  );
}

export default Login;
