//! ------------------------------( TO-DO LIST )--------------------------------

// import { Task, taskInfo } from "./classes/Producto"
// export const taskArray: Task [] = []
      

//       export const addTask = (): boolean => {

//         const inputTitle = document.getElementById('title') as HTMLInputElement
//         const inputDescription = document.getElementById('description') as HTMLInputElement
//         const inputDate = document.getElementById('expiredDate') as HTMLInputElement
        
//         const newTask = new Task(inputTitle.value, inputDescription.value, new Date(inputDate.value))

//         taskArray.push(newTask)
//         MostrarTareas()

//         return true
//       }

//       export const MostrarTareas = ():boolean => {

//         if (taskArray.length == 0){
//           return false
//         }

//         const divTasks = document.getElementById('divTask') as HTMLDivElement
//         let htmlTask: string = `
//         <h1>Tareas</h1>
//         `
//         taskArray.forEach( (tarea, indice) => {
//           const info: taskInfo = tarea.getInfo()
//           if (info.isActive == true){
//             htmlTask += `
//             <hr>
//             <section>
//                   <h2 class="Estado">${info.title}</h2>
//                   <p><b>DESCRIPCION:</b>\n ${info.description}</p>
//                   <h3 class="Estado">${info.state}</h3>
//                   <p><b>FECHA DE VENCIMIENTO: </b>\n ${info.expiredDate}</p>
//                   <input type="button" id="retroceso${indice}" value="◀️" onclick="">  |  <input type="button" id="delete${indice}" value="❌" onclick="">  |  <input type="button" id="avance${indice}" value="▶️" onclick="">
//                   <hr>
//                 </section>
//             `
//           }
//         })

//         divTasks.innerHTML = htmlTask
//         taskArray.forEach((tarea,indice) => {
//           const info: taskInfo = tarea.getInfo()
//           if (info.isActive == true){
//             document.querySelector<HTMLButtonElement>(`#retroceso${indice}`)!.addEventListener('click', () => {
//               taskArray[indice].retroceso()
//             });
//             document.querySelector<HTMLButtonElement>(`#delete${indice}`)!.addEventListener('click', () => {
//               taskArray[indice].delete()
//             });
//             document.querySelector<HTMLButtonElement>(`#avance${indice}`)!.addEventListener('click', () => {
//               taskArray[indice].avance()
//             });
//           }
//         })
//         return true
//       }

//       document.querySelector<HTMLButtonElement>('#addTask')!.addEventListener('click', () => {
//         addTask();
//       });
      export {}