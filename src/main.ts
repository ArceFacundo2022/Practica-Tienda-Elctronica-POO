//! ------------------------------( Tienda Electronica )--------------------------------

//! ------------------------------( Listar, Agregar, Editar y Eliminar Productos )--------------------------------

import { Producto, Stock } from "./classes/Producto"

export let listProduct: Producto [] = [new Producto("Pepas TRIO", "Galletitas de vainilla con dulce de membrillo", 650)]
const almacen = new Stock()

const addProduct = () => {

      const inputName = document.getElementById('nameProduct') as HTMLInputElement
      const inputDescription = document.getElementById('descriptionProduct') as HTMLInputElement
      const inputPrecio = document.getElementById('precioProduct') as HTMLInputElement

      const newProduct = new Producto(inputName.value, inputDescription.value, parseInt(inputPrecio.value))
      listProduct.push(newProduct)
      console.log(listProduct)
      showProduct()
}

const showProduct = () => {

      const DivProduct = document.getElementById('divProduct') as HTMLInputElement
      let htmlProduct = `
      <h2>Catalogo de Productos</h2>
      <hr>
      `
      
      if (listProduct.length == 0){
            DivProduct.innerHTML = htmlProduct
            return false
      }

      htmlProduct = `
      <h2>Catalogo de Productos</h2>
      <hr>
      <table>
            <tr>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Delete</th>
            </tr>
      `
      listProduct.forEach((prod)=> {
            htmlProduct += `
                  <tr>
                    <td>${prod.getProduct().nameProduct}</td>
                    <td class="descrip">${prod.getProduct().description}</td>
                    <td>${prod.getProduct().precio}</td>
                    <td class="buttons"><input type="button" id="deleteProduct" value="❎" onclick="hola()"></td>
                  </tr>
            `
      })
      htmlProduct += `
      </table>
      `
      DivProduct.innerHTML = htmlProduct
}

document.querySelector<HTMLButtonElement>('#addProduct')!.addEventListener('click', () => {
  addProduct();
});

showProduct()


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