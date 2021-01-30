const TYPES = {
  ILocalStorage: Symbol('ILocalStorage'),
  // Auth
  IAuthRepository: Symbol('IAuthRepository'),
  IAuthApi: Symbol('IAuthApi'),
  GoogleAuth: Symbol('GoogleAuth'),
  // User
  IUserApi: Symbol('IUserApi'),
  IUserRepository: Symbol('IUserRepository'),
  // Other
  AppStore: Symbol('AppStore'),
};

export default TYPES;