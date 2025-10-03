export const users = [
  { id: 'u1', username: 'coder_alex', email: 'alex@example.com', hashedPassword: 'pass123' },
  { id: 'u2', username: 'dev_maya', email: 'maya@example.com', hashedPassword: 'pass123' },
  { id: 'u3', username: 'tech_sam', email: 'sam@example.com', hashedPassword: 'pass123' },
  { id: 'u4', username: 'build_jordan', email: 'jordan@example.com', hashedPassword: 'pass123' },
];

export const profiles = [
  {
    id: 'p1',
    userId: 'u1',
    username: 'coder_alex',
    fullName: 'Alex Johnson',
    headline: 'Full-stack dev • TS & Node',
    bio: 'I build infrastructure and developer tools. Loves readable code and tiny CLIs.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    website: 'https://github.com/codecoder',
    skills: ['Node.js', 'TypeScript', 'Docker', 'GraphQL'],
    stats: { postsCount: 5, followersCount: 120, followingCount: 42 },
  },
  {
    id: 'p2',
    userId: 'u2',
    username: 'dev_maya',
    fullName: 'Maya Chen',
    headline: 'Frontend Engineer • React & Design Systems',
    bio: 'Building beautiful, accessible UIs. Design system enthusiast.',
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
    website: 'https://mayachen.dev',
    skills: ['React', 'CSS', 'Figma', 'Accessibility'],
    stats: { postsCount: 12, followersCount: 340, followingCount: 85 },
  },
  {
    id: 'p3',
    userId: 'u3',
    username: 'tech_sam',
    fullName: 'Sam Rivera',
    headline: 'DevOps Engineer • K8s & Cloud',
    bio: 'Automating all the things. Cloud native advocate.',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    website: 'https://samrivera.io',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    stats: { postsCount: 8, followersCount: 215, followingCount: 64 },
  },
  {
    id: 'p4',
    userId: 'u4',
    username: 'build_jordan',
    fullName: 'Jordan Lee',
    headline: 'Backend Engineer • Python & Go',
    bio: 'Microservices architect. Performance optimization nerd.',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    website: 'https://jordanlee.codes',
    skills: ['Python', 'Go', 'PostgreSQL', 'Redis'],
    stats: { postsCount: 6, followersCount: 178, followingCount: 53 },
  },
];

export const posts = [
  {
    id: 'post1',
    userId: 'u1',
    type: 'image',
    caption: 'Refactored the auth flow—reduced complexity by 40% 🎉 #auth #nestjs',
    mediaUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    hashtags: ['auth', 'nestjs'],
    mentions: ['dev_maya'],
    likesCount: 42,
    commentsCount: 8,
    sharesCount: 3,
    createdAt: '2025-09-30T12:00:00Z'
  },
  {
    id: 'post2',
    userId: 'u2',
    type: 'video',
    caption: '30s tip: how to reduce cold-start time on lambda ⚡',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4',
    hashtags: ['aws', 'serverless'],
    mentions: [],
    likesCount: 87,
    commentsCount: 15,
    sharesCount: 12,
    createdAt: '2025-10-01T09:30:00Z'
  },
  {
    id: 'post3',
    userId: 'u3',
    type: 'text',
    caption: 'Just deployed our microservices to K8s with zero downtime. Here\'s the helm chart config:\n\n```yaml\napiVersion: v2\nname: myapp\nversion: 1.0.0\n```\n\n#kubernetes #devops',
    mediaUrl: null,
    hashtags: ['kubernetes', 'devops'],
    mentions: [],
    likesCount: 56,
    commentsCount: 12,
    sharesCount: 8,
    createdAt: '2025-10-02T14:15:00Z'
  },
  {
    id: 'post4',
    userId: 'u4',
    type: 'image',
    caption: 'Database query optimization reduced latency from 2s to 80ms. Indexes matter! 🚀 #postgresql #performance',
    mediaUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    hashtags: ['postgresql', 'performance'],
    mentions: [],
    likesCount: 134,
    commentsCount: 24,
    sharesCount: 18,
    createdAt: '2025-10-02T16:45:00Z'
  },
  {
    id: 'post5',
    userId: 'u2',
    type: 'image',
    caption: 'New design system component library is live! Check out these button variants ✨ #designsystems #react',
    mediaUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    hashtags: ['designsystems', 'react'],
    mentions: [],
    likesCount: 98,
    commentsCount: 19,
    sharesCount: 14,
    createdAt: '2025-10-03T08:20:00Z'
  },
  {
    id: 'post6',
    userId: 'u1',
    type: 'text',
    caption: 'Quick TypeScript tip: Use template literal types for better type safety\n\n```ts\ntype Route = `/api/${"users" | "posts"}/${string}`;\nconst validRoute: Route = "/api/users/123";\n```\n\n#typescript #tips',
    mediaUrl: null,
    hashtags: ['typescript', 'tips'],
    mentions: [],
    likesCount: 72,
    commentsCount: 11,
    sharesCount: 9,
    createdAt: '2025-10-03T11:00:00Z'
  },
];

export const comments = [
  { id: 'c1', postId: 'post1', userId: 'u2', content: 'Nice! Could you share perf numbers?', createdAt: '2025-10-01T10:00:00Z' },
  { id: 'c2', postId: 'post1', userId: 'u3', content: 'This is awesome! Planning to implement something similar.', createdAt: '2025-10-01T11:30:00Z' },
  { id: 'c3', postId: 'post2', userId: 'u1', content: 'Great tip! We saw similar improvements.', createdAt: '2025-10-01T10:15:00Z' },
  { id: 'c4', postId: 'post2', userId: 'u4', content: 'What about memory optimization?', createdAt: '2025-10-01T12:00:00Z' },
  { id: 'c5', postId: 'post3', userId: 'u2', content: 'Love this! How did you handle state management?', createdAt: '2025-10-02T15:00:00Z' },
  { id: 'c6', postId: 'post4', userId: 'u1', content: 'Impressive results! What indexes did you add?', createdAt: '2025-10-02T17:00:00Z' },
  { id: 'c7', postId: 'post4', userId: 'u3', content: 'This is exactly what we needed. Thanks!', createdAt: '2025-10-02T18:30:00Z' },
];

export const projects = [
  {
    id: 'proj1',
    userId: 'u1',
    title: 'DevFlow CLI',
    description: 'A small CLI for scaffolding microservices with best practices built-in.',
    technologies: ['Node.js', 'oclif', 'TypeScript'],
    status: 'Live',
    demoUrl: 'https://devflow.example.com',
    sourceCodeUrl: 'https://github.com/coder_alex/devflow',
    images: ['https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'],
    likesCount: 45
  },
  {
    id: 'proj2',
    userId: 'u2',
    title: 'React Components Library',
    description: 'Production-ready component library with accessibility and theming support.',
    technologies: ['React', 'Storybook', 'CSS-in-JS'],
    status: 'Live',
    demoUrl: 'https://components.mayachen.dev',
    sourceCodeUrl: 'https://github.com/dev_maya/react-components',
    images: ['https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'],
    likesCount: 89
  },
  {
    id: 'proj3',
    userId: 'u3',
    title: 'K8s Dashboard',
    description: 'Real-time Kubernetes cluster monitoring and management dashboard.',
    technologies: ['React', 'Go', 'Kubernetes'],
    status: 'Beta',
    demoUrl: null,
    sourceCodeUrl: 'https://github.com/tech_sam/k8s-dashboard',
    images: ['https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800'],
    likesCount: 67
  },
];

export const education = [
  {
    id: 'edu1',
    userId: 'u1',
    degree: 'B.Tech Computer Science',
    university: 'NIT Trichy',
    location: 'India',
    startYear: 2014,
    endYear: 2018,
    achievements: ['Dean\'s list', 'Best project award']
  },
  {
    id: 'edu2',
    userId: 'u2',
    degree: 'M.S. Computer Science',
    university: 'Stanford University',
    location: 'California, USA',
    startYear: 2018,
    endYear: 2020,
    achievements: ['Research fellowship', 'Published 2 papers']
  },
];

export const experience = [
  {
    id: 'exp1',
    userId: 'u1',
    title: 'Senior Software Engineer',
    company: 'Acme Labs',
    type: 'Full-time',
    location: 'Remote',
    startDate: '2022-01-01',
    endDate: null,
    companyImage: 'https://via.placeholder.com/48',
    responsibilities: ['Built auth service', 'Led API redesign', 'Mentored junior devs'],
    technologies: ['Node.js', 'TypeScript', 'GraphQL']
  },
  {
    id: 'exp2',
    userId: 'u1',
    title: 'Software Engineer',
    company: 'TechCorp',
    type: 'Full-time',
    location: 'San Francisco, CA',
    startDate: '2018-06-01',
    endDate: '2021-12-31',
    companyImage: 'https://via.placeholder.com/48',
    responsibilities: ['Developed payment gateway', 'Optimized database queries'],
    technologies: ['Python', 'Django', 'PostgreSQL']
  },
  {
    id: 'exp3',
    userId: 'u2',
    title: 'Frontend Engineer',
    company: 'Design Systems Inc',
    type: 'Full-time',
    location: 'New York, NY',
    startDate: '2020-08-01',
    endDate: null,
    companyImage: 'https://via.placeholder.com/48',
    responsibilities: ['Built component library', 'Improved accessibility', 'Conducted design reviews'],
    technologies: ['React', 'CSS', 'Figma']
  },
];

export const currentUser = users[0];
export const currentProfile = profiles[0];
