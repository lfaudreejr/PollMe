export class PollModel {
  constructor(
    public title: string,
    public options: [{ title: string; count: number }],
    public owner: string,
    public voters?: string[],
    public _id?: string
  ) {}
}
