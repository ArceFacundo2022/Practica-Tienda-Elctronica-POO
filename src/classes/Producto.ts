
//! ------------------------------( Tienda Electronica )--------------------------------

//!-------------------------------( PRODUCTOS )--------------------------------
export interface productInfo {
  nameProduct: string, 
  description: string, 
  precio: number,
  color: string
}

export type editProduct = {name:"nameProduct",value:string} | {name:"description",value:string} | {name:"precio",value:number} | {name:"color",value:string}
export class Producto {


  constructor(
    private nameProduct: string, 
    private description: string, 
    private precio: number,
    private color: string){

  }

  getProduct(): productInfo{
    return {
      nameProduct:this.nameProduct, 
      description: this.description, 
      precio: this.precio,
      color: this.color
    }
  }

  editProduct(edit:editProduct){
    switch(edit.name){
      case "nameProduct":
        this.nameProduct = edit.value
        break
      case "description":
        this.description = edit.value
        break
      case "precio":
        this.precio = edit.value
        break
      case "color":
        this.color = edit.value
        break
      }
  }
}

//!-------------------------------( Stock )--------------------------------

import { listProduct } from "../main"

export interface infoStock {
  cantProduct : string [],
  limit: number
}
export class Stock{

  private cantProduct: string []
  private limit: number
  constructor(){
      this.cantProduct = []
      this.limit = 50
  }

  almacenarProductos(cant:number, producto : string): boolean{
    const existProduct = listProduct.filter((prod)=> prod.getProduct().nameProduct == producto)

    if(!existProduct){
      alert("No existe un producto con ese nombre")
    }
    if (this.cantProduct.length >= this.limit){
      alert("🚚 Almacenamiento lleno 🚚")
      return false
    }else{
      if(this.cantProduct.length + cant >= this.limit){
        alert("Solo hay " + (this.limit - this.cantProduct.length) + "espacios en el almacen, reduzca la cantidad")
        return false
      }
    }
    for(let i = 0; i < cant; i++){
      this.cantProduct.push(producto)
    }
    return true
  }

  quitarProducto(cant:number, nameProduct:string){

    let cont: number = 0
    this.cantProduct.forEach((prod)=> {
      if(prod == nameProduct){
        cont ++
      }
    })
    if (cont >= cant){
      const newCant: string [] = this.cantProduct.filter((prod)=> prod != nameProduct)
      this.cantProduct = newCant
    }else{
      alert("No hay suficientes " + nameProduct + " para quitar del stock")
      return false
    }

  }

  getStock(): infoStock {
    return {
      cantProduct : this.cantProduct,
      limit: this.limit
    }
  }
}

// import { MostrarTareas } from "../main";

// export type State = "PENDIENTE" | "EN PROCESO" | "TESTEO" | "TERMINADO"

// export interface taskInfo {
//   title : string,
//   description :  string,
//   expiredDate : string,
//   state : State,
//   isActive : boolean
// }

// export class Task {
//   private title: string;
//   private description: string;
//   private expiredDate: Date;
//   private state: State;
//   private isActive: boolean;

//   constructor(param_title: string, param_description: string, param_expiredDate: Date){
//     this.title = param_title;
//     this.description = param_description
//     this.expiredDate = param_expiredDate
//     this.state = "PENDIENTE"
//     this.isActive = true
//   }

//   edit (newTitle:string, newDescription:string): object{
//     this.title = newTitle;
//     this.description = newDescription;
//     console.log(this)
//     return this
//   }

//   avance (): string{
//     switch(this.state){
//       case "PENDIENTE":
//         this.state = "EN PROCESO"
//         MostrarTareas()
//         return `la tarea (${this.title}) cambio su estado a EN PROCESO`
//       case "EN PROCESO":
//         this.state = "TESTEO"
//         MostrarTareas()
//         return `la tarea (${this.title}) cambio su estado a TESTEO`
//       case "TESTEO":
//         this.state = "TERMINADO"
//         MostrarTareas()
//         return `la tarea (${this.title}) cambio su estado a TERMINADO`
//       case "TERMINADO":
//         MostrarTareas()
//         return `la tarea (${this.title}) NO puede mejorar su estado`
//       default:
//         return "Error en el metodo"
//     }

//   }
  
//   retroceso (): string{
//     switch(this.state){
//       case "PENDIENTE":
//         MostrarTareas()
//         return `la tarea (${this.title}) NO puede retroceder en su estado`
//         case "EN PROCESO":
//           this.state = "PENDIENTE"
//           MostrarTareas()
//         return `la tarea (${this.title}) cambio su estado a PENDIENTE`
//       case "TESTEO":
//         this.state = "EN PROCESO"
//         MostrarTareas()
//         return `la tarea (${this.title}) cambio su estado a EN PROCESO`
//         case "TERMINADO":
//           this.state = "TESTEO"
//           MostrarTareas()
//           return `la tarea (${this.title}) cambio su estado a TESTEO`
//           default:
//             return "Error en el metodo"
//           }
//         }
        
//         delete ():Boolean {
//           if (this.isActive == true){
//             this.isActive = false
//             MostrarTareas()
//             return true
//           }
//           return false
//         }

//         getInfo ():taskInfo {
//           return {
//             title : this.title,
//             description : this.description ,
//             expiredDate : this.expiredDate.toJSON().slice(0,10),
//             state : this.state,
//             isActive : this.isActive
//           }
//         }
        
//       }