export interface AppConfig {
  mainUrl: string;
  apiMainUrl: string;
  apiOAuthUrl: string;
  clientId: string;
  apiPermissions: string;
}

export const APP_CONFIG: AppConfig = {
  mainUrl: 'http://localhost:4200',
  apiMainUrl: 'https://api.spotify.com/v1',
  apiOAuthUrl: 'https://accounts.spotify.com/authorize',
  clientId: 'd34fb6af5266455a891cc341fde2b4d0',
  apiPermissions:
    'user-read-private user-top-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative'
};
