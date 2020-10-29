import React from 'react';
import Banner from './Banner'
import NavBar from './NavBar'

const HomePage = () => {
  localStorage.setItem('ryan', 14)
  const username = localStorage.key(0)
  const user_id = localStorage.getItem(username)
  return (
    <div className="home-page">
      <Banner userId={user_id} username={username} />
      <NavBar />
    </div>
  )
}

export default HomePage;