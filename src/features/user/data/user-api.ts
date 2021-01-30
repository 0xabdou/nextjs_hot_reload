import User, {UserCreation} from "../types/user";
import {injectable} from "inversify";

export interface IUserApi {
  getCurrentUser(): Promise<User>;
  createUser(creation: UserCreation): Promise<User>;
}

@injectable()
export class FakeUserApi implements IUserApi {
  async getCurrentUser(): Promise<User> {
    const user = await gapi.auth2.getAuthInstance().currentUser.get();
    const profile = user.getBasicProfile();
    const firstName = profile.getGivenName();
    const lastName = profile.getFamilyName();
    return {
      id: user.getId(),
      username: `${firstName[0]}_${lastName}`,
      name: `${firstName} ${lastName}`,
      photoUrl: profile.getImageUrl(),
    };
  }

  async createUser(creation: UserCreation): Promise<User> {
    const defaultUser=  await this.getCurrentUser();
    return {
      id: defaultUser.id,
      username: creation.username,
      name: creation.name ?? defaultUser.name,
      photoUrl: defaultUser.photoUrl,
    };
  }

}