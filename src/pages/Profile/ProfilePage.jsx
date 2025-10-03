import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Grid, Typography } from '@mui/material';
import Layout from '../../components/Layout';
import ProfileHeader from './components/ProfileHeader';
import ProjectCard from './components/ProjectCard';
import EducationItem from './components/EducationItem';
import ExperienceItem from './components/ExperienceItem';
import FeedCard from '../Feed/components/FeedCard';
import CommentDrawer from '../Feed/components/CommentDrawer';
import { useApp } from '../../context/AppContext';

const ProfilePage = () => {
  const { username } = useParams();
  const { profile: currentProfile, getProfileByUsername, getPostsByUserId, projects, education, experience } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const profile = getProfileByUsername(username);
  const isOwnProfile = currentProfile?.username === username;
  const userPosts = profile ? getPostsByUserId(profile.userId) : [];
  const userProjects = profile ? projects.filter(p => p.userId === profile.userId) : [];
  const userEducation = profile ? education.filter(e => e.userId === profile.userId) : [];
  const userExperience = profile ? experience.filter(e => e.userId === profile.userId) : [];

  if (!profile) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Profile not found
          </Typography>
        </Container>
      </Layout>
    );
  }

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setCommentDrawerOpen(true);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label="Posts" />
            <Tab label="Projects" />
            <Tab label="Experience" />
            <Tab label="Education" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            {userPosts.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No posts yet
              </Typography>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {userPosts.map((post) => (
                  <FeedCard key={post.id} post={post} onComment={handleCommentClick} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {userProjects.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No projects yet
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {userProjects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            {userExperience.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No experience added yet
              </Typography>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {userExperience.map((exp) => (
                  <ExperienceItem key={exp.id} experience={exp} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            {userEducation.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No education added yet
              </Typography>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {userEducation.map((edu) => (
                  <EducationItem key={edu.id} education={edu} />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>

      <CommentDrawer
        open={commentDrawerOpen}
        onClose={() => setCommentDrawerOpen(false)}
        post={selectedPost}
      />
    </Layout>
  );
};

export default ProfilePage;
