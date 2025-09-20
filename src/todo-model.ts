import { TodoItem } from './todo-item.js'
import { TodoItems } from './todo-items.js'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

type Schema = {
  tasks: { id: number; task: string; completed: boolean }[]
}

export class TodoModel extends TodoItems {
  private db: LowSync<Schema>

  constructor(public user_name: string, todo_items: TodoItem[] = []) {
    super(user_name, [])
    this.db = new LowSync(new JSONFileSync('Todos.json'))
    this.db.read()

    if (this.db.data === null) {
      this.db.data = { tasks: todo_items }
      this.db.write()
      todo_items.forEach(item => this.todo_items.push(item))
    } else {
      this.db.data.tasks.forEach(item =>
        this.todo_items.push(new TodoItem(item.id, item.task, item.completed))
      )
    }
  }

  add_item(task: string): number {
    let result = super.add_item(task)
    this.store()
    return result
  }

  complete(id: number, mark_complete?: boolean): void {
    super.complete(id, mark_complete)
    this.store()
  }

  remove_completed(): void {
    super.remove_completed()
    this.store()
  }

  private store() {
    this.db.data.tasks = [...this.todo_items]
    this.db.write()
  }
}
