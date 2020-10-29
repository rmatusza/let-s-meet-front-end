import React, {useState} from 'react';

const NavBar = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [city, setCity] = useState('Houston')
  const [groups, setGroups] = useState([])

  const updateInputVal = e => setInputValue(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userCity = {city}
    console.log(userCity)
    const res = await fetch(`http://localhost:8080/api/groups/search/${userCity.city}`)
    if (res.ok && inputValue) {
      const returnedGroups = await res.json({groups})
      console.log(returnedGroups.groups)
      
      let groupMatches = []

      returnedGroups.groups.forEach(group => {
        let groupName = group.name
        let lowerGroupName = groupName.toLowerCase()
        if(lowerGroupName.includes(inputValue.toLowerCase())) {
          groupMatches.push(groupName)
        }
        // console.log(group.name)
      })

      console.log(groupMatches)

      // setGroups(...returnedGroups)

      return
    }

    console.error('something went wrong with the search')
  }

  return (
    <>
      <div className="navbar-container">

        <div className="search-bar-container">
          <form onSubmit={handleSubmit}>
            <input className="search-bar" value={inputValue} onChange={updateInputVal} placeholder={'Search'} />
          </form>
        </div>

        <div className="location-container">
          City: <span className="city-name">Houston</span>
        </div>

      </div>
    </>
  )
}

export default NavBar;
