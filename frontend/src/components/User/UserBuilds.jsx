import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BuildsTable from '../../BuildsTable';

const UserBuilds = ({user}) => {
    const [builds, setBuilds] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const {username} = params;
    const buildIdToEdit = useRef();

    const handleDeleteBuild = (buildId) => {
        fetch(`${import.meta.env.VITE_APP_URL}builds/${buildId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              }
        }).then(res => res.json()).then(json => {
            if (json.success) {
                const newBuilds = builds.filter( build => build.id !== buildId);
                setBuilds(newBuilds);
            }
        })
    };

    const handleEditBuild = (buildId) => {

        const buildToEdit = builds.find(build => build.id == buildId);
        if (buildToEdit) {
            const itemsToEdit = buildToEdit.items;
            localStorage.setItem('build', JSON.stringify(itemsToEdit));
            localStorage.setItem('champion', buildToEdit.champion);
            navigate(`/build/${buildId}`);
        }
     


    }

  

    useEffect(()=> {
        if (user) {
            if (user.username !== username) {
                navigate('/');
            } else {
                fetch(`${import.meta.env.VITE_APP_URL}builds/${user.username}`, {
                    credentials: 'include'
                }).then( res => res.json()).then( json => setBuilds(json));
            }
       
        }
    }, [user])

  return (
    <div style={{padding: '1rem'}}>
        <BuildsTable builds={builds} deleteBuild={handleDeleteBuild} editBuild={handleEditBuild}/>
    </div>
  )
}

export default UserBuilds