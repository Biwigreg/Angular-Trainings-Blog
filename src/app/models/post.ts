export class Post {
    Id : number;
    Title : string;
    CreatedAt : Date;
    Content : string;
    Score : number;

    constructor(public id:number, public title:string, public content:string, public score:number, public createdAt: Date = new Date()){
        this.Id = id;
        this.Title = title;
        this.Content = content;
        this.Score = score;
        this.CreatedAt = createdAt;
    }
}

