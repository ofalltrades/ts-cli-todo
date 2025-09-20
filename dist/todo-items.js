import { TodoItem } from './todo-item.js';
export class TodoItems {
    constructor(user_name, todo_items = []) {
        this.user_name = user_name;
        this.todo_items = todo_items;
        this.next_id = 0;
        this.completed_items = [];
    }
    add_item(task) {
        this.todo_items.push(new TodoItem(this.next_id, task));
        return this.next_id++;
    }
    get_item(id) {
        return this.todo_items.find(item => item.id === id);
    }
    get_items(include_completed = true) {
        return this.todo_items.filter(i => include_completed || !i.completed);
    }
    remove_item(id) {
        this.todo_items = this.todo_items.filter(i => i.id !== id);
    }
    remove_completed() {
        this.todo_items
            .filter(i => i.completed)
            .forEach(i => this.remove_item(i.id));
    }
    complete(id, mark_complete = true) {
        this.completed_items.push(this.todo_items.find(i => i.id === id).complete(mark_complete));
    }
    count() {
        return {
            total: this.todo_items.length,
            alltime_total: this.completed_items.length + this.todo_items.length,
            incomplete: this.get_items(false).length
        };
    }
    print_items(include_completed = true) {
        console.log(`\n\t${this.user_name.toUpperCase()}\'S TO-DOS`);
        this.get_items(include_completed).map(i => i.print_item());
        console.log('\n');
    }
    print_completed() {
        console.log(`\n\t${this.user_name.toUpperCase()}\'S COMPLETED TO-DOS`);
        this.completed_items.map(i => i.print_item());
        console.log('\n');
    }
}
