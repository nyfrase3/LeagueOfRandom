import React, {useState} from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SignUp = ({setShowModal}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = () => {

    }

  return (
    <>
    <div className='modal-backdrop' onClick={() => setShowModal(false)} style={{zIndex: '900'}}></div>
    <Container component="main" maxWidth="xs" style={{backgroundColor: '#788402', color: '#F7F4EF', position: 'absolute', padding: '1.5rem 2rem 2.5rem 2rem', borderRadius: '10px', top: '5rem', left: '50%', width: '444px',
    marginLeft: '-222px', overflow: 'visible', zIndex: '9999'}}>
           <Typography component="h1" variant="h5" style={{color: '#0b0b0b', fontSize: '1.6rem'}}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="none"
                  name="username"   
                  required
                  fullWidth
                  id="username"
                  label="username"
                  style={{backgroundColor: '#F7F4EF'}}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{position: "relative"}}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
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
              </Box>
    </Container>
    </>
  )
}

export default SignUp