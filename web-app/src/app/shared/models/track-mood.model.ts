export class TrackMood {
    trackId: String;
    plays: number;
    mood: String;
    
    constructor(data: any){
        this.trackId = data.trackId;
        this.plays = data.plays;
        this.mood = data.mood;
    }
}