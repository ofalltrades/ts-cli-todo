import { TodoItems } from './todo-items.js'
import inquirer from 'inquirer'
import { TodoModel } from './todo-model.js'

enum Commands {
  Add = 'Add Task',
  Complete = 'Mark as Complete',
  Toggle = 'Show/Hide Completed',
  Purge = 'Remove Completed Tasks',
  Quit = 'Quit'
}

const todo_items = new TodoModel('Jake')
let show_completed = true

function prompt_add(): void {
  console.clear()

  inquirer
    .prompt({
      type: 'input',
      name: 'add',
      message: 'Enter task:'
    })
    .then(answers => {
      if (answers.add !== '') {
        todo_items.add_item(answers.add)
      }
      prompt_user()
    })
}

function prompt_complete(): void {
  console.clear()
  inquirer
    .prompt({
      type: 'checkbox',
      name: 'completed',
      message: 'Mark Complete',
      choices: todo_items
        .get_items(show_completed)
        .map(i => ({ name: i.task, value: i.id, checked: i.completed }))
    })
    .then(answers => {
      let completed_tasks = answers.completed as number[]
      todo_items
        .get_items()
        .forEach(item =>
          todo_items.complete(
            item.id,
            completed_tasks.find(id => id === item.id) !== undefined
          )
        )
      prompt_user()
    })
}

function prompt_user(): void {
  console.clear()
  todo_items.print_items(show_completed)

  inquirer
    .prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(Commands)
    })
    .then(answers => {
      switch (answers.command) {
        case Commands.Toggle:
          show_completed = !show_completed
          prompt_user()
          break
        case Commands.Add:
          prompt_add()
          break
        case Commands.Complete:
          if (todo_items.count().incomplete > 0) {
            prompt_complete()
          } else {
            prompt_user()
          }
          break
        case Commands.Purge:
          todo_items.remove_completed()
          prompt_user()
          break
      }
    })
}

prompt_user()
