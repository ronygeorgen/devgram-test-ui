import { Box, Typography, Paper, Chip, Avatar } from '@mui/material';
import { formatDateFull } from '../../../utils/formatDate';

const ExperienceItem = ({ experience }) => {
  return (
    <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          src={experience.companyImage}
          alt={experience.company}
          variant="rounded"
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {experience.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>
            {experience.company} • {experience.type}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {experience.location} • {formatDateFull(experience.startDate)} - {formatDateFull(experience.endDate)}
          </Typography>
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Key Responsibilities:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {experience.responsibilities.map((resp, idx) => (
                  <li key={idx}>
                    <Typography variant="body2" color="text.secondary">
                      {resp}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
          {experience.technologies && experience.technologies.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {experience.technologies.map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  sx={{ bgcolor: 'primary.dark', color: 'white', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ExperienceItem;
