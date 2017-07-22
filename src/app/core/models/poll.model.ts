export class PollModel {
  constructor(
    public title: string,
    public options: string[],
    public owner: string,
    public voters?: string[],
    public _id?: string
  ) {}
}
