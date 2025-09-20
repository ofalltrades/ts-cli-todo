import { TodoItem } from './todo-item.js'

type ItemCounts = {
  total: number
  alltime_total: number
  incomplete: number
}

export class TodoItems {
  private next_id: number = 0
  public completed_items: TodoItem[] = []

  constructor(
    public user_name: string,
    protected todo_items: TodoItem[] = []
  ) {}

  add_item(task: string): number {
    this.todo_items.push(new TodoItem(this.next_id, task))
    return this.next_id++
  }

  get_item(id: number): TodoItem {
    return this.todo_items.find(item => item.id === id)
  }

  get_items(include_completed: boolean = true): TodoItem[] {
    return this.todo_items.filter(i => include_completed || !i.completed)
  }

  remove_item(id: number): void {
    this.todo_items = this.todo_items.filter(i => i.id !== id)
  }

  remove_completed(): void {
    this.todo_items
      .filter(i => i.completed)
      .forEach(i => this.remove_item(i.id))
  }

  complete(id: number, mark_complete: boolean = true): void {
    this.completed_items.push(
      this.todo_items.find(i => i.id === id).complete(mark_complete)
    )
  }

  count(): ItemCounts {
    return {
      total: this.todo_items.length,
      alltime_total: this.completed_items.length + this.todo_items.length,
      incomplete: this.get_items(false).length
    }
  }

  print_items(include_completed: boolean = true): void {
    console.log(`\n\t${this.user_name.toUpperCase()}\'S TO-DOS`)
    this.get_items(include_completed).map(i => i.print_item())
    console.log('\n')
  }

  print_completed(): void {
    console.log(`\n\t${this.user_name.toUpperCase()}\'S COMPLETED TO-DOS`)
    this.completed_items.map(i => i.print_item())
    console.log('\n')
  }
}
