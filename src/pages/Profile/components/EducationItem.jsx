import { Box, Typography, Paper, Chip } from '@mui/material';
import { School } from '@mui/icons-material';

const EducationItem = ({ education }) => {
  if (!education) return null;

  return (
    <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            bgcolor: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <School sx={{ color: 'white' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {education.degree}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>
            {education.university}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {education.location} • {education.startYear} - {education.endYear || 'Present'}
          </Typography>
          {education.achievements && education.achievements.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {education.achievements.map((achievement, idx) => (
                <Chip
                  key={idx}
                  label={achievement}
                  size="small"
                  sx={{ bgcolor: 'secondary.dark', color: 'white', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default EducationItem;