import formidable from 'formidable'
import { readFile, writeFile, appendFile, readdir, rename, existsSync, mkdir } from 'fs';
import { photos } from './model.js';
import path from "path";
import jsonController from './jsonController.js';
import { timeStamp } from 'console';
import { request } from 'http';
const __dirname = path.resolve();
let form = formidable({});
form.keepExtensions = true
const fileController = {
    add: (request, response) => {
        form.uploadDir = 'uploads'
        form.parse(request, function (err, fields, files) {

            console.log("----- przesłane pola z formularza ------");

            console.log(fields);

            console.log("----- przesłane formularzem pliki ------");

            console.log(files)
            console.log(files.file.path)
            let newFile = {
                id: new Date().getTime(),
                album: fields.album,
                originalName: files.file.path.split('\\')[files.file.path.split('\\').length - 1],
                url: request.url,
                lastChange: "original",
                history: [
                    {
                        status: "original",
                        lastModifiedDate: new Date().getDate()
                    }
                ]
            }
            photos.push(newFile)
            const mypath = path.join(__dirname, `uploads/${fields.album}`, `${files.file.path.split('\\')[files.file.path.split('\\').length - 1]}`)
            // console.log(files.file.path.split('\\')[files.file.path.split('\\').length - 1]);
            // console.log(mypath);
            let new_path = path.join(__dirname, `uploads/${fields.album}`, `${files.file.path.split('\\')[files.file.path.split('\\').length - 1]}`)
            let old_path = path.join(__dirname, `uploads/`, `${files.file.path.split('\\')[files.file.path.split('\\').length - 1]}`)

            console.log('To jest old path ====', old_path);

            jsonController.add(newFile)
            if (fields.album !== undefined) {
                if (!existsSync(`${form.uploadDir}/${fields.album}`)) {
                    mkdir(`${form.uploadDir}/${fields.album}`, (err) => {
                        if (err) throw err
                        if (!existsSync(`${new_path}`)) {
                            console.log('ok');
                            rename(old_path, new_path, (err) => {
                                if (err) console.log(err)
                            })
                        }
                        else {
                        }
                    })

                }
            }
        });
    },
    delete: (id) => {
        // usuwanie po id z animalsArray
    },
    update: (id) => {
        // update po id elementu animalsArray
    },
    getall: () => {
        return photos
    }

}
export default fileController
