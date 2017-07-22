export class PollModel {
  constructor(
    public title: string,
    public options: any[],
    public owner: string,
    public voters?: string[],
    public _id?: string
  ) {}
}
