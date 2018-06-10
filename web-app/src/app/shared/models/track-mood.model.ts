export class TrackMood {
    trackId: string;
    plays: number;
    mood: string;
    
    constructor(data: any){
        this.trackId = data.trackId;
        this.plays = data.plays;
        this.mood = data.mood;
    }
}