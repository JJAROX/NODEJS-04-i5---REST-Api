import tasks from '../app/taskmodel.js'
const controller = {
  GET: (id) => {
    if (id === undefined) {
      return tasks
    } else {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
          return tasks[i]
        }
      }
    }
  },
  POST: () => {
    let newObject = {
      id: Math.floor(Math.random() * 100),
      title: `zadanie ${tasks.length + 1}`,
      description: "bardzo trudne",
      completed: false,
    }
    tasks.push(newObject)
    return newObject
  },
  PATCH: (id) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(id)) {
        tasks[i].completed = true
        return tasks[i]
      }
    }
  },
  DELETE: (id) => {
    const indexToRemove = tasks.findIndex(element => element.id === parseInt(id));
    console.log(indexToRemove);
    if (indexToRemove !== -1) {
      tasks.splice(indexToRemove, 1);
      return true
    } else {
      return undefined
    }

  },
}
export default controller