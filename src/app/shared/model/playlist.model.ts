export class Playlist {
    id: string;
    name: string;
    images: Object[];
    owner: Object;
    tracks: Object;
    followers: Object;
    
    constructor(playlistTile: any) {
        this.id = playlistTile.id;
        this.name = playlistTile.name;
        this.images = playlistTile.images;
        this.owner = playlistTile.owner;
        this.tracks = playlistTile.tracks;
        this.followers = playlistTile.followers;
    }
}
