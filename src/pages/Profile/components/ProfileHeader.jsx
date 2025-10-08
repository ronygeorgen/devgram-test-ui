import { Box, Avatar, Typography, Button, Chip } from '@mui/material';
import { Language } from '@mui/icons-material';

const ProfileHeader = ({ profile, isOwnProfile }) => {
  if (!profile) return null;

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { xs: 'center', sm: 'flex-start' } }}>
        <Avatar
          src={profile.avatarUrl}
          alt={profile.fullName}
          sx={{ width: 120, height: 120, border: '4px solid', borderColor: 'primary.main' }}
        />
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {profile.fullName}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            @{profile.username}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
            {profile.headline}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, maxWidth: 600 }}>
            {profile.bio || 'No bio yet.'}
          </Typography>
          {profile.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Language fontSize="small" />
              <Typography variant="body2" component="a" href={profile.website} target="_blank" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                {profile.website}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 3, mb: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {profile.stats?.postsCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posts
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {profile.stats?.followersCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Followers
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {profile.stats?.followingCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Following
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            {profile.skills?.map((skill, idx) => (
              <Chip key={idx} label={skill} size="small" sx={{ bgcolor: 'secondary.dark', color: 'white' }} />
            ))}
          </Box>
          {!isOwnProfile && (
            <Button variant="contained" size="large">
              Follow
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;