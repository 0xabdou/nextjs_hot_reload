//export type GoogleAuth = Omit<gapi.auth2.GoogleAuth, 'then'>;

import {injectable} from "inversify";

@injectable()
export class GoogleAuth {
  async signIn() {
    return new Promise<string>((resolve, reject) => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '1063557684670-rfkmbsckud2puhj9iac1g5ttdbph5jtt.apps.googleusercontent.com',
          scope: 'profile',
        }).then(async (ga) => {
          const x = await ga.signIn();
          resolve(x.getAuthResponse().access_token);
        }).catch(reject);
      });
    });
  }
}


