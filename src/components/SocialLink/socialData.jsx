import { Instagram, Twitter, Facebook, Linkedin } from '../Icons';

const socialData = [
  {
    type: 'Instagram',
    url: 'https://www.instagram.com/nft_community/',
    icon(color) { return <Instagram color={color} />; }
  },
  {
    type: 'Twitter',
    url: 'https://twitter.com/nft__community',
    icon(color) { return <Twitter color={color} />; }
  },
  {
    type: 'Facebook',
    url: 'https://www.facebook.com/NFTCommunity',
    icon(color) { return <Facebook color={color} />; }
  },
  {
    type: 'Linkedin',
    url: 'https://www.linkedin.com/groups/13992662/',
    icon(color) { return <Linkedin color={color} />; }
  },
];

export default socialData;