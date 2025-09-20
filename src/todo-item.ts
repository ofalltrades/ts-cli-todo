export class TodoItem {
  public constructor(
    public id: number,
    public task: string,
    public completed: boolean = false
  ) {}

  public print_item(): void {
    console.log(`\t${this.completed ? '[✓]' : '[ ]'}\t${this.task}`)
  }

  public complete(completed: boolean = true): TodoItem {
    this.completed = completed
    return this
  }
}
