interface UserResponse {
  id: number;
  documentId: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  firstname: string;
  lastname: string;
  username: string;
  role: {
    id: number;
    documentId: string;
    name: string;
  };
  profileimage: {
    id: number;
    documentId: string;
    formats: {
      thumbnail: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      large: {
        url: string;
      };
    };
  };
}

export interface MappedUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  profileImageUrl: string;
}

export const mapUserResponse = (user: UserResponse): MappedUser => {
  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    role: user.role.name,
    profileImageUrl: user.profileimage.formats.medium.url,
  };
};