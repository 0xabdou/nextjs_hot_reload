type User = {
  id: string,
  username: string,
  name?: string,
  photoUrl?: string,
}

export type UserCreation = {
  username: string,
  name?: string,
  photo?: File,
};

export default User;