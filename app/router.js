import controller from "./controller.js";
import tasks from "./taskmodel.js";
import getRequestData from "./utils.js";
const router = async (req, res) => {
  console.log(req.method)
  if (req.url === '/api/tasks' && req.method == "GET") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(controller.GET()))
  }
  else if (req.method == "GET" && req.url.match(/\/api\/tasks\/([0-9]+)/)) {
    let getID = req.url.split('/')[req.url.split('/').length - 1]
    console.log(getID);
    if (controller.GET(getID) !== undefined) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 200, task: controller.GET(getID) }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 404, message: `task with id ${getID} not found` }))
    }

  }

  else if (req.url === '/api/tasks' && req.method == "POST") {
    console.log('gucio');
    let data = await getRequestData(req);
    console.log(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 201, task: controller.POST() }))
  }

  else if (req.method == "PATCH" && req.url.match(/\/api\/tasks\/([0-9]+)/)) {
    let patchID = req.url.split('/')[req.url.split('/').length - 1]
    console.log(patchID);
    if (controller.PATCH(patchID) !== undefined) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 200, task: controller.PATCH(patchID) }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 404, message: `task with id ${patchID} not found` }))
    }
  }
  else if (req.method == "DELETE" && req.url.match(/\/api\/tasks\/([0-9]+)/)) {
    let deleteID = req.url.split('/')[req.url.split('/').length - 1]
    console.log(deleteID);
    if (controller.DELETE(deleteID) !== undefined) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 202, message: `Task with id ${deleteID} deleted successfully` }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 404, message: `task with id ${deleteID} not found` }))
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `route not exists` }))
  }



}


export default router