export const createSlugForType = (type: string) => {
  switch (type) {
    case 'article':
      return '/article';
    case 'tag':
      return '/tag';
    case 'service':
      return '/service';
    default:
      return '';
  }
};
