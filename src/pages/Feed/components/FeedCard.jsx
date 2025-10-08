import { useState } from 'react';
import { Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Typography, Chip, Box, Menu, MenuItem } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline, Share, MoreVert, Code } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../../hooks/usePosts';
import { useProfiles } from '../../../hooks/useProfiles';
import { formatDate } from '../../../utils/formatDate';

const FeedCard = ({ post, onComment }) => {
  const { allProfiles, getProfileByUserId } = useProfiles();
  const { toggleLike, sharePost } = usePosts();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [playing, setPlaying] = useState(false);

  const profile = getProfileByUserId(post.userId);

  const handleLike = () => {
    setLiked(!liked);
    toggleLike(post.id);
  };

  const handleShare = () => {
    sharePost(post.id);
    handleCloseMenu();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderCaption = (caption) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(caption)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <Typography key={`text-${lastIndex}`} variant="body2" sx={{ mb: 1 }}>
            {caption.substring(lastIndex, match.index)}
          </Typography>
        );
      }
      parts.push(
        <Box key={`code-${match.index}`} sx={{ mb: 1 }}>
          {match[1] && (
            <Chip
              label={match[1].toUpperCase()}
              size="small"
              icon={<Code />}
              sx={{ mb: 0.5, bgcolor: 'secondary.dark', color: 'white', fontSize: '0.7rem' }}
            />
          )}
          <Box
            component="pre"
            sx={{
              bgcolor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid',
              borderColor: 'secondary.main',
              borderRadius: 1,
              p: 1.5,
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            }}
          >
            <code>{match[2].trim()}</code>
          </Box>
        </Box>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < caption.length) {
      parts.push(
        <Typography key={`text-${lastIndex}`} variant="body2">
          {caption.substring(lastIndex)}
        </Typography>
      );
    }

    return parts.length > 0 ? parts : <Typography variant="body2">{caption}</Typography>;
  };

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profile?.avatarUrl}
            alt={profile?.fullName}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/profile/${profile?.username}`)}
          />
        }
        action={
          <>
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem onClick={handleShare}>Share to feed</MenuItem>
              <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
            </Menu>
          </>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
              onClick={() => navigate(`/profile/${profile?.username}`)}
            >
              {profile?.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{profile?.username}
            </Typography>
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="caption" color="text.secondary">
              {profile?.headline}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        }
      />

      {post.type !== 'text' && post.mediaUrl && (
        <>
          {post.type === 'image' && (
            <CardMedia
              component="img"
              image={post.mediaUrl}
              alt="Post media"
              sx={{ maxHeight: 500, objectFit: 'cover' }}
            />
          )}
          {post.type === 'video' && (
            <Box sx={{ position: 'relative', bgcolor: 'black' }}>
              <video
                src={post.mediaUrl}
                controls
                style={{ width: '100%', maxHeight: 500, display: 'block' }}
                onClick={() => setPlaying(!playing)}
              />
            </Box>
          )}
        </>
      )}

      <CardContent>
        {renderCaption(post.caption)}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {post.hashtags?.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag}`}
              size="small"
              sx={{ bgcolor: 'primary.dark', color: 'white', fontSize: '0.75rem' }}
            />
          ))}
          {post.mentions?.map((mention, idx) => (
            <Chip
              key={idx}
              label={`@${mention}`}
              size="small"
              sx={{ bgcolor: 'secondary.dark', color: 'white', fontSize: '0.75rem' }}
              onClick={() => navigate(`/profile/${mention}`)}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={handleLike} sx={{ color: liked ? 'error.main' : 'text.secondary' }}>
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="caption">{post.likesCount + (liked ? 1 : 0)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={() => onComment(post)} sx={{ color: 'text.secondary' }}>
              <ChatBubbleOutline />
            </IconButton>
            <Typography variant="caption">{post.commentsCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={handleShare} sx={{ color: 'text.secondary' }}>
              <Share />
            </IconButton>
            <Typography variant="caption">{post.sharesCount}</Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default FeedCard;