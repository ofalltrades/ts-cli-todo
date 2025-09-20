export class TodoItem {
    constructor(id, task, completed = false) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
    print_item() {
        console.log(`\t${this.completed ? '[✓]' : '[ ]'}\t${this.task}`);
    }
    complete(completed = true) {
        this.completed = completed;
        return this;
    }
}
