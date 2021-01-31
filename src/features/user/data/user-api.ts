import User, {UserCreation} from "../types/user";
import {injectable} from "inversify";

export interface IUserApi {
  getCurrentUser(): Promise<User>;

  createUser(creation: UserCreation): Promise<User>;
}

@injectable()
export class FakeUserApi implements IUserApi {
  async getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {

      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '1063557684670-rfkmbsckud2puhj9iac1g5ttdbph5jtt.apps.googleusercontent.com',
          scope: 'profile',
        }).then(async (ga) => {
          const user = ga.currentUser.get();
          console.log('user: ', user);
          const profile = user.getBasicProfile();
          const firstName = profile.getGivenName();
          const lastName = profile.getFamilyName();
          const x = {
            id: user.getId(),
            username: `${firstName[0]}_${lastName}`,
            name: `${firstName} ${lastName}`,
            photoUrl: profile.getImageUrl(),
          };
          resolve(x);
        }).catch(reject);
      });
    });
  }

  async createUser(creation: UserCreation): Promise<User> {
    const defaultUser = await this.getCurrentUser();
    return {
      id: defaultUser.id,
      username: creation.username,
      name: creation.name ?? defaultUser.name,
      photoUrl: defaultUser.photoUrl,
    };
  }

}