export class Song {
    constructor(
        public mkid: Number, 
        public type: string,
        public title: string,
        public cover: string,
        public date: Date,
        public genres: String[],
        public label: Object
        ){}
}
