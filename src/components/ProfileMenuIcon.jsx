import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProfileMenuIcon({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Profile"
    >
      <Avatar style={{ width: 32, height: 32, borderRadius: '50%' }}>
        {user && user.profile_photo_url ? (
          <AvatarImage src={user.profile_photo_url} alt={user.name || 'Profile'} style={{ width: 32, height: 32, borderRadius: '50%' }} />
        ) : (
          <AvatarFallback>P</AvatarFallback>
        )}
      </Avatar>
    </button>
  );
}
