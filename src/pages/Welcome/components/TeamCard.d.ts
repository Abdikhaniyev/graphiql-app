interface SocialNetwork {
  link: string;
  icon: string;
  name: string;
}

export interface User {
  avatar: string;
  fullName: string;
  location: string;
  position: string;
  socialNetworks: SocialNetwork[];
  username: string;
}
