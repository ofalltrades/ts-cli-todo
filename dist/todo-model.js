import { TodoItem } from './todo-item.js';
import { TodoItems } from './todo-items.js';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
export class TodoModel extends TodoItems {
    constructor(user_name, todo_items = []) {
        super(user_name, []);
        this.user_name = user_name;
        this.db = new LowSync(new JSONFileSync('Todos.json'));
        this.db.read();
        if (this.db.data === null) {
            this.db.data = { tasks: todo_items };
            this.db.write();
            todo_items.forEach(item => this.todo_items.push(item));
        }
        else {
            this.db.data.tasks.forEach(item => this.todo_items.push(new TodoItem(item.id, item.task, item.completed)));
        }
    }
    add_item(task) {
        let result = super.add_item(task);
        this.store();
        return result;
    }
    complete(id, mark_complete) {
        super.complete(id, mark_complete);
        this.store();
    }
    remove_completed() {
        super.remove_completed();
        this.store();
    }
    store() {
        this.db.data.tasks = [...this.todo_items];
        this.db.write();
    }
}
