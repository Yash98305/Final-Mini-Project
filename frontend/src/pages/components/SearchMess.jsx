import React from 'react'
import "../../css/menu.css"
import img1 from "../../icons/search.png";

const SearchMess = ({setText}) => {
  return (
    <div className='search'>
       <input type="text" className="search_input" placeholder="Search..." onChange={(e)=>setText(e.target.value)}/>
        <img src={img1} alt="#" className="search_icon" />
    </div>
  )
}

export default SearchMess
