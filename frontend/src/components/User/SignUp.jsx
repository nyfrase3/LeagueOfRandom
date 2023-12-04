import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import  Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SignUp = ({closeModal, setUser, type}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    
    const isSignUp = type == 'Sign Up';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username: username.trim().toLowerCase(), password: password.trim()}; 

        if (isSignUp) {
            
            if (username.length == 0) {
                setSignUpError('username is required');
                return;
            }
            if (password.length < 6) {
                setSignUpError('password must be atleast 6 characters long');
                return;
            }
            // check if inputs are valid
            // check if user is already in database, if so say username already reqgistered, sign in.
           
            fetch(`${import.meta.env.VITE_APP_URL}signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user),
                credentials: 'include'
            }).then( res => 
                {
                    if (res.ok){
                       return res.json(); 
                }}).then(json => {
                    if (json.error){
                        setSignUpError(json.error + ', log in?');
                    }else {
                        setUser(json);
                        closeModal();
                    }
                })
    
        } else { // else we are on the Log In menu

            const res = await fetch(`${import.meta.env.VITE_APP_URL}logIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user),
                credentials: 'include'
            })

            const json = await res.json();
            if (json.successMessage) {
                setUser(json.user)
                closeModal();
            } else {
                setSignUpError('Invalid Credentials');
            }
       
            }   
        }


  return (
    <>
    <div className='modal-backdrop' onClick={closeModal} style={{zIndex: '900'}}></div>

    <Container component="main" style={{backgroundColor: '#F7F4EF', color: '#F7F4EF', position: 'absolute', padding: '1.5rem 0 2rem 0', borderRadius: '10px', top: '5rem', left: '50%', width: '420px',
    marginLeft: '-222px', overflow: 'visible', zIndex: '9999'}}>
           <Typography component="h1" variant="h5" style={{color: '#0b0b0b', fontSize: '1.6rem', fontWeight: '600'}}>
            {type}
          </Typography>
       
                 {
                  signUpError && 
                 <span style= {{color: '#141823', position: 'absolute', left: '30px', fontSize: '0.75rem', lineHeight: '14px'}}>{signUpError}</span>
                }
          <Box component="form" noValidate onSubmit={ e => handleSubmit(e)} sx={{ mt: 5 }}>
            <Grid container spacing={2} style={{flexDirection: 'column', alignItems: 'center'}}>
              <Grid item sm={10}>
                <TextField
                  autoComplete="none"
                  name="username"   
                  required
                  fullWidth
                  id="username"
                  label="username"
                  value={username}
                  onChange={(e) => {
                    setSignUpError('')
                    setUserName(e.target.value)
                }}
                  style={{backgroundColor: '#F7F4EF'}}
                />
              </Grid>
            
              <Grid item sm={10} style={{position: "relative"}}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type= {showPassword ? '' : "password" }
                  autoComplete="password"
                  style={{backgroundColor: '#F7F4EF'}}
                />    
                <span className='show-pass' style={{position: 'absolute', bottom: '2px', right: '3px', zIndex: '999', color: '#141823', cursor: 'pointer'}} onClick={()=> setShowPassword(!showPassword)}>
                {
                    showPassword ? 

                    <FontAwesomeIcon icon={faEye} /> 
                    :
                    <FontAwesomeIcon icon={faEyeSlash} />
                }
                </span>
              </Grid>
              </Grid>
              <button style={{margin: '0.5rem auto 0 auto'}}>{type}</button>
              </Box>
    </Container>
    </>
  )
}

export default SignUp