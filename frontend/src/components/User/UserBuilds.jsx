import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BuildsTable from '../../BuildsTable';

const UserBuilds = ({user}) => {
    const [builds, setBuilds] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    console.log(user + ' is the user in the user builds page')
    const {username} = params;

    const handleDeleteBuild = (buildId) => {
        console.log(buildId + ' is the build id to delete!');
        fetch(`${import.meta.env.VITE_APP_URL}builds/${buildId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              }
        }).then(res => res.json()).then(json => {
            console.log(json)
            if (json.success) {
                const newBuilds = builds.filter( build => build.id !== buildId);
                setBuilds(newBuilds);
            }
        });
    }
  

    useEffect(()=> {
        if (user) {
            if (user.username !== username) {
                navigate('/');
            }
            fetch(`${import.meta.env.VITE_APP_URL}builds/${user.username}`, {
                credentials: 'include'
            }).then( res => res.json()).then( json => setBuilds(json));
        }
    }, [user])

  return (
    <div style={{padding: '1rem'}}>
        <BuildsTable builds={builds} deleteBuild={handleDeleteBuild}/>
    </div>
  )
}

export default UserBuilds