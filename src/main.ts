//! ------------------------------( Tienda Electronica )--------------------------------

//! ------------------------------( Listar, Agregar, Editar y Eliminar Productos )--------------------------------

import { Producto, Stock } from "./classes/Producto"

export let listProduct: Producto [] = [new Producto("Mouse Xtrike me", "Mouse inhalambrico gamer con 1200 dpi", 3500, "#150ee3")]
const almacen = new Stock()

const newProduct = () => {

      const inputName = document.getElementById('nameProduct') as HTMLInputElement
      const inputDescription = document.getElementById('descriptionProduct') as HTMLInputElement
      const inputPrecio = document.getElementById('precioProduct') as HTMLInputElement
      const inputColor = document.getElementById('colorProduct') as HTMLInputElement

      const newProduct = new Producto(inputName.value, inputDescription.value, parseInt(inputPrecio.value), inputColor.value)
      listProduct.push(newProduct)
      showProduct()
      updateSelect()
}

const updateSelect = () => {
      const SelectProduct = document.getElementById('selectProduct') as HTMLSelectElement
      let htmlProduct = `
      <option disabled selected>-Elige un tipo de producto-</option>
      `
      if (listProduct.length == 0){
            SelectProduct.innerHTML = htmlProduct
            return false
      }
      listProduct.forEach((prod)=> {
            htmlProduct += `
                  <option value="${prod.getProduct().nameProduct}">${prod.getProduct().nameProduct}</option>
            `
      })
      SelectProduct.innerHTML = htmlProduct
}

const showProduct = () => {

      const DivProduct = document.getElementById('divProduct') as HTMLDivElement
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
                  <th>Color</th>
                  <th>Delete</th>
            </tr>
      `
      listProduct.forEach((prod, indice)=> {
            htmlProduct += `
                  <tr>
                    <td>${prod.getProduct().nameProduct}</td>
                    <td class="descrip">${prod.getProduct().description}</td>
                    <td>${prod.getProduct().precio}</td>
                    <td style="background-color: ${prod.getProduct().color};"></td>
                    <td class="buttons"><input type="button" id="deleteProduct${indice}" value="❎"></td>
                  </tr>
            `
      })
      htmlProduct += `
      </table>
      `
      DivProduct.innerHTML = htmlProduct

      listProduct.forEach((prod, indice) => {
            document.querySelector<HTMLButtonElement>(`#deleteProduct${indice}`)!.addEventListener('click', () => {
                  listProduct.splice(indice,1)
                  showProduct()
            });
      })
      
}

document.querySelector<HTMLButtonElement>('#newProduct')!.addEventListener('click', () => {
  newProduct();
});

showProduct()
updateSelect()

//! -------------------------------------( STOCK )------------------------------------------------------

const addProduct = () => {

      const inputType = document.getElementById('selectProduct') as HTMLInputElement
      const inputCant = document.getElementById('productCant') as HTMLInputElement
      almacen.almacenarProductos(parseInt(inputCant.value), inputType.value)
      const infoStock = almacen.getStock()

      const listStock = infoStock.cantProduct.map((prod)=>{

            const type = listProduct.filter((prod2) => prod2.getProduct().nameProduct == prod)
            if(type){
                  console.log(type)
                  return type[0]
            }
      })

      console.log(listStock)
}

document.querySelector<HTMLButtonElement>('#addProduct')!.addEventListener('click', () => {
      addProduct();
});



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