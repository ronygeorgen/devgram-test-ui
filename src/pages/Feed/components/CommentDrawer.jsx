import { useState } from 'react';
import { Drawer, Box, Typography, IconButton, TextField, Button, Avatar, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { usePosts } from '../../../hooks/usePosts';
import { useProfiles } from '../../../hooks/useProfiles';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate } from '../../../utils/formatDate';

const CommentDrawer = ({ open, onClose, post }) => {
  const { comments, addComment, getCommentsByPostId } = usePosts();
  const { allProfiles, getProfileByUserId } = useProfiles();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

  const postComments = getCommentsByPostId(post.id);
  const currentUserProfile = allProfiles.find(p => p.userId === user?.id);

  const handleSubmit = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1300 }}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Comments
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {postComments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No comments yet. Be the first!
            </Typography>
          ) : (
            postComments.map((comment) => {
              const commentProfile = getProfileByUserId(comment.userId);
              return (
                <Box key={comment.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Avatar src={commentProfile?.avatarUrl} sx={{ width: 32, height: 32 }} />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {commentProfile?.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(comment.createdAt)}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{comment.content}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              );
            })
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Avatar src={currentUserProfile?.avatarUrl} sx={{ width: 32, height: 32, mt: 0.5 }} />
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={handleSubmit} disabled={!commentText.trim()}>
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;