import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import  Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const DeleteAccount = ({closeModal, user }) => {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const payload = { }

    if (user) {
        payload.username = user.username;
    }

    const handleSubmit = (e) => {
        payload.password = password;
        console.log(payload)
        console.log('submit')
        fetch(`${import.meta.env.VITE_APP_URL}deleteAccount`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
        }).then(res => res.json()).then(json => {
            console.log(json)
            if (json.errorMessage) {
                setError(json.errorMessage)
            }}
            );
    }

   

  return (
    <>
    <div className='modal-backdrop' onClick={closeModal} style={{zIndex: '900'}}></div>

    <Container component="main" maxWidth="xs" style={{backgroundColor: '#F7F4EF', color: '#F7F4EF', position: 'absolute', padding: '1.5rem 2rem 1rem 2rem', borderRadius: '10px', top: '5rem', left: '50%', width: '444px',
    marginLeft: '-222px', overflow: 'visible', zIndex: '9999'}}>
           <Typography component="h1" variant="h5" style={{color: '#0b0b0b', fontSize: '1.35rem'}}>
            <span style={{fontWeight: '600'}}>
            Delete Account
            </span>
           <p style={{fontSize: '0.8rem', margin: '3px 0px 0px 0px'}}> Confirm your password </p>
          </Typography>
       
                 {
                  error && 
                 <span style= {{color: '#FF4500', position: 'absolute', left: '170px', fontSize: '0.75rem', lineHeight: '14px', cursor: 'pointer' }} onClick={()=> setError('')}>{error}</span>
                }
          <Box  sx={{ mt: 3 }} >
            <Grid container spacing={2} style={{justifyContent: 'center', gap: '1rem'}}>
            
              <Grid item xs={12} sm={7} style={{position: "relative"}}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  value={password}
                  onChange={(e) => { setError(''); setPassword(e.target.value)}}
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
              <Grid style={{ display: 'flex', gap: '1rem'}}>
              <button  onClick={ e => handleSubmit(e)} disabled = { password?.length < 6 }>Delete</button>
              <button  onClick={ e => closeModal()}>Cancel</button>
              </Grid>
              </Grid>s
          
              </Box>
    </Container>
    </>
  )
}

export default DeleteAccount