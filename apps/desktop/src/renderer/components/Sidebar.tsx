import React from 'react';
import { Box, Typography } from '@mui/material';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FaceIcon from '@mui/icons-material/Face';
import SettingsIcon from '@mui/icons-material/Settings';

export function Sidebar() {
  return (
    <Box sx={{
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'rgba(24, 26, 32, 0.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      p: 2,
      flexShrink: 0
    }}>
      {/* Vault Info Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Box sx={{ width: 28, height: 28, borderRadius: 1.5, bgcolor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c0c1ff', mr: 1 }}>
          <FolderZipIcon sx={{ fontSize: 16 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Local Vault</Typography>
          <Typography sx={{ fontSize: 10, color: '#7e8294', fontFamily: 'monospace' }}>/Photos</Typography>
        </Box>
      </Box>

      {/* Library Label */}
      <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#7e8294', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1, pl: 1 }}>
        Library
      </Typography>

      {/* Nav Items */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <NavItem icon={<ScheduleIcon />} text="Timeline" active count={2437} />
        <NavItem icon={<LocationOnIcon />} text="Places" count={32} />
        <NavItem icon={<FolderIcon />} text="Folders" />
        <NavItem icon={<CleaningServicesIcon />} text="Duplicates" color="#fb7185" badge="4.2 GB" />
        <NavItem icon={<FaceIcon />} text="People & Faces" count={16} />
      </Box>

      {/* Settings Footer */}
      <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <NavItem icon={<SettingsIcon />} text="Vault Settings" />
      </Box>
    </Box>
  );
}

function NavItem({ icon, text, active, count, color, badge }: any) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 1.5,
      py: 1,
      borderRadius: 2,
      cursor: 'pointer',
      color: active ? '#fff' : '#7e8294',
      bgcolor: active ? 'rgba(255,255,255,0.05)' : 'transparent',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: 'rgba(255,255,255,0.05)',
        color: '#fff'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {React.cloneElement(icon, { sx: { fontSize: 16, color: active ? '#c0c1ff' : color || 'inherit' } })}
        <Typography sx={{ fontSize: 12, fontWeight: active ? 600 : 400 }}>{text}</Typography>
      </Box>
      {count !== undefined && (
        <Typography sx={{ fontSize: 10, fontFamily: 'monospace', px: 1, py: 0.5, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
          {count}
        </Typography>
      )}
      {badge && (
        <Typography sx={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 600, color: color, px: 1, py: 0.5, bgcolor: 'rgba(251, 113, 133, 0.1)', borderRadius: 1 }}>
          {badge}
        </Typography>
      )}
    </Box>
  );
}
