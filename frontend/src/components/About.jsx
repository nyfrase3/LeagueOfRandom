import React from 'react'

const About = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#f9f9f9', color: '#302f2f', position: 'relative'}} className='about' >
      <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', position: 'relative', height: '40vh' }} className='about-top'>
        <p>
          This Project Was Built For 
        </p>
        <img src='/items/UA-LOGO.png' style={{width: '8rem', paddingLeft: '0.75rem'}}></img>
        <p>'s </p> < p style={ {paddingLeft: '0.75rem'}}>Database Management System, Fall 2023.</p>
        <div style= {{ position: 'absolute', bottom: '5px', display: 'flex', justifyContent: 'flex-end', whiteSpace: 'nowrap', width: '100%'}}><span style={{fontWeight: '600'}}>author: nick f</span></div>
      </section>
      <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#572d6a', color: '#F7F4EF', padding: '0px 0px 3rem 0px', height: '33vh'}}>
        <h3 style={{marginBottom: '3rem'}}>Technologies </h3>

        <div style={{display: 'flex', justifyContent: 'center', width: '100vw', gap: '70px'}}>
          
          <div>
            <h3>Backend</h3>
        <ul>
          <li style={{display: 'flex', alignItems: 'center', gap: '3px', paddingBottom: '0.35rem'}}><img src='/items/postgres.png' style={{width: '20px'}} /> Postgres</li>
          <li style={{display: 'flex', alignItems: 'center', gap: '3px'}}> <img src='/items/node.png' style={{width: '20px'}} /> ExpressJs</li>
        </ul>
        </div>

        <div>
        <h3>Frontend</h3>
        <ul>
          <li style={{display: 'flex', alignItems: 'center', gap: '3px',  paddingBottom: '0.35rem'}}>React <img src='/items/react.png' style={{width: '20px'}} /></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '3px'}}>MaterialUi  <img src='/items/mui.png' style={{width: '20px'}} />  </li>
        </ul>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <p style={{display: 'flex', alignItems: 'center', gap: '3px'}} >Data provided by <b> <a style={{cursor: 'pointer', padding: '0 5px'}} href='https://developer.riotgames.com/docs/lol' target="_blank" > Riot Games</a></b> <img src='/items/riot.png' style={{width: '30px'}} /> <span style={{fontSize: '0.7rem', alignSelf: 'flex-end', paddingBottom: '3px'}}>accurate to patch 13.18</span></p>
        </div>
        </div>
      </section>
    </div>
  )
}

export default About