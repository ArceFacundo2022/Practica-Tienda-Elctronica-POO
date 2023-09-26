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
      const SelectProduct2 = document.getElementById('selectProduct2') as HTMLSelectElement
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
      SelectProduct2.innerHTML = htmlProduct
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
                  almacen.deleteProduct(listProduct[indice].getProduct().nameProduct)
                  showStock()
                  listProduct.splice(indice,1)
                  showProduct()
                  updateSelect()
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
      showStock() 
}

const showStock = () => {
      
      const infoStock = almacen.getStock()
      const DivStock = document.getElementById('divStock') as HTMLDivElement
      
      const listStock = infoStock.cantProduct.map((prod)=>{
      
            const type = listProduct.filter((prod2) => prod2.getProduct().nameProduct == prod)
            if(type){
                  return type[0]
            }
      })

      let htmlStock = `
      <h2>Stock de productos</h2>
      <hr>
      <table>
            <tr>
                  <th scope="colgroup" colspan="10">Productos</th>
            </tr>
      `
      let x = 0
      for(let i = 0; i< 5; i++){
            htmlStock += `
            <tr>
            `
            for(let j = 0; j<10; j++){
                  if(listStock[x] != undefined){
                        htmlStock += `
                        <td style="background-color: ${listStock[x].getProduct().color};"></td>
                        `
                  }else{
                        htmlStock += `
                        <td>
                        `
                  }
                  x++
            }
            htmlStock += `
            </tr>
            `
      }
      DivStock.innerHTML = htmlStock

}

const deleteProductStock = () => {
      const inputType = document.getElementById('selectProduct') as HTMLInputElement
      const inputCant = document.getElementById('productCant') as HTMLInputElement
      almacen.quitarProducto(parseInt(inputCant.value), inputType.value)
      showStock()
}

document.querySelector<HTMLButtonElement>('#addProduct')!.addEventListener('click', () => {
      addProduct();
});

document.querySelector<HTMLButtonElement>('#deleteProductStock')!.addEventListener('click', () => {
      deleteProductStock();
});

showStock()

//! -------------------------------------( Carrito de Compras )------------------------------------------------------

import { CarroDeCompras } from "./classes/Producto"

const carrito = new CarroDeCompras()

const cargarCarro = () => {

      const inputType = document.getElementById('selectProduct2') as HTMLInputElement
      const inputCant = document.getElementById('CarritoCant') as HTMLInputElement
      const product = listProduct.filter((prod)=> prod.getProduct().nameProduct == inputType.value)
      carrito.addNewProduct(product[0], parseInt(inputCant.value))
      almacen.quitarProducto(parseInt(inputCant.value), inputType.value)
      showStock() 
      console.log(carrito.getPrecioTotal())
}

const sacarCarro = () => {
      const inputType = document.getElementById('selectProduct2') as HTMLInputElement
      const inputCant = document.getElementById('CarritoCant') as HTMLInputElement
      const product = listProduct.filter((prod)=> prod.getProduct().nameProduct == inputType.value)
      carrito.deleteProduct(product[0], parseInt(inputCant.value))
      almacen.almacenarProductos(parseInt(inputCant.value),product[0].getProduct().nameProduct)
      showStock()
      console.log(carrito.getPrecioTotal())
}

const showCarrito = () => {
      const infoCarrito = carrito.getCarrito()
      const DivCarrito = document.getElementById('divCarrito') as HTMLDivElement

      let htmlCarrito = `
      `
        
          const listGeometry = document.getElementById('listGeometry') as HTMLDivElement
          let htmlGeometry: string = `
          `
          geoArray.forEach( geo => {
              htmlGeometry += `
              <div class="subComponent comp01">
                          <h2>${geo.getType()}</h2>
                          <img src="${geo.img}" width="150px" height="150px">
                          <p><b>Perimetro: </b>${geo.getPerimetro()}m</p>
                          <p><b>Area: </b>${geo.getArea()}m</p>
                        </div>
              `
            })
        
          listGeometry.innerHTML = htmlGeometry
          return true
}

document.querySelector<HTMLButtonElement>('#addCarrito')!.addEventListener('click', () => {
      cargarCarro();
});

document.querySelector<HTMLButtonElement>('#sacarCarro')!.addEventListener('click', () => {
      sacarCarro();
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