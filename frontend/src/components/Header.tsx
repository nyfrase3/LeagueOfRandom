import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full p-5 items-baseline flex gap-8 bg-gray-900 text-gray-200">
      <h1 className="text-3xl pr-10">League of Random</h1>
      <NavLink to="/">Random</NavLink>
      <NavLink to="/build">Item Builder</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Header;
