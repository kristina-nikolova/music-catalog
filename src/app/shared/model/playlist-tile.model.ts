export class PlaylistTile {
    id: string;
    name: string;
    images: Object[];
    owner: Object;

    constructor(playlist: any){
        this.id = playlist.id;
        this.name = playlist.name;
        this.images = playlist.images;
        this.owner = playlist.owner;
    }
}
