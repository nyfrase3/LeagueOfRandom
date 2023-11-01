import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
  <div className=''>
    <div className="bg-gray-900 text-gray-200">
      <h1 className="text-3xl pr-10">League of Random</h1>
      <div className='p-5 items-baseline justify-center flex gap-8 '>
        <NavLink to="/">Random</NavLink>
        <NavLink to="/build">Item Builder</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div/>
    </div>
  </div>
  );
};

export default Header;
