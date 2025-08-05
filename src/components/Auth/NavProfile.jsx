import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavProfile = () => {
  const { user } = useAuth();

  return (
    <Link to="/profile" className="flex items-center">
      {user?.profilePicture ? (
        <img 
          src={user.profilePicture}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm text-gray-500">
            {user?.email?.charAt(0)?.toUpperCase()}
          </span>
        </div>
      )}
    </Link>
  );
};

export default NavProfile;