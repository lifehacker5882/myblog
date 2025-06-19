type Badge = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  earned: (params: {
    postCount: number;
    level: number;
    lastPostDate?: Date;
  }) => boolean;
};

export const allBadges: Badge[] = [
  {
    id: "first-post",
    name: "First post!",
    description: "You've made your first post!",
    earned: ({ postCount }) => postCount === 1,
  },
  {
    id: "level-2",
    name: "Level 2",
    description: "You've reached level 2!",
    earned: ({ level }) => level === 2,
  },
  {
    id: "level-3",
    name: "Level 3",
    description: "You've reached level 3!",
    earned: ({ level }) => level === 3,
  },
  {
    id: "level-4",
    name: "Level 4",
    description: "You've reached level 4!",
    earned: ({ level }) => level === 4,
  },
  {
    id: "level-5",
    name: "Level 5",
    description: "You've reached level 5!",
    earned: ({ level }) => level === 5,
  },
];
