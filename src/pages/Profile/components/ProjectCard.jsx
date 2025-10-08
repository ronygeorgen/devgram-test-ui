import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton, Link } from '@mui/material';
import { Favorite, FavoriteBorder, OpenInNew, GitHub } from '@mui/icons-material';
import { useState } from 'react';

const ProjectCard = ({ project }) => {
  const [liked, setLiked] = useState(false);

  // Use _id instead of id for MongoDB
  const projectId = project._id || project.id;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      {project.images && project.images.length > 0 && project.images[0] && (
        <CardMedia
          component="img"
          height="200"
          image={project.images[0]}
          alt={project.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.technologies?.map((tech, idx) => (
            <Chip key={idx} label={tech} size="small" sx={{ bgcolor: 'primary.dark', color: 'white', fontSize: '0.7rem' }} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {project.demoUrl && (
              <Link href={project.demoUrl} target="_blank" rel="noopener">
                <IconButton size="small" sx={{ color: 'primary.main' }}>
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Link>
            )}
            {project.sourceCodeUrl && (
              <Link href={project.sourceCodeUrl} target="_blank" rel="noopener">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <GitHub fontSize="small" />
                </IconButton>
              </Link>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small" onClick={() => setLiked(!liked)} sx={{ color: liked ? 'error.main' : 'text.secondary' }}>
              {liked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
            <Typography variant="caption">{project.likesCount + (liked ? 1 : 0)}</Typography>
          </Box>
        </Box>
        <Chip
          label={project.status}
          size="small"
          sx={{
            mt: 1,
            bgcolor: project.status === 'Live' ? 'secondary.dark' : 'primary.dark',
            color: 'white',
            fontSize: '0.7rem',
            alignSelf: 'flex-start'
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectCard;