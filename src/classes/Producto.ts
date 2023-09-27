
//! ------------------------------( Tienda Electronica )--------------------------------

//!-------------------------------( Ofertas )--------------------------------

interface infoOferta {
  type : tiposOferta
  descuento : number
}
type tiposOferta = "Descuento" | "individual" | "2x1"
class Ofertas {
  private type : tiposOferta
  private descuento : number
  constructor(){
    this.type = "individual"
    this.descuento = 0
  }

  getOferta():infoOferta {
    return {
      type : this.type,
      descuento : this.descuento
    }
  }

  editOferta(tipo:tiposOferta,desc:number){
    this.type = tipo
    this.descuento = desc
    return this.getOferta()
  }

  calcularPrecio(cant:number, precio:number): number{
    switch(this.type){
      case "individual":
        return precio * cant
      case "2x1":
        const div = Math.trunc(precio/cant)
        if(cant == (div*2)){
          return cant * (precio*0.5)
        }else{
          return (cant-1 * (precio*0.5)) + precio
        }
      case "Descuento":
        return cant * (precio * this.descuento)
    }
  }
}

//!-------------------------------( PRODUCTOS )--------------------------------
export interface productInfo {
  nameProduct: string, 
  description: string, 
  precio: number,
  color: string
}

export type editProduct = {name:"nameProduct",value:string} | {name:"description",value:string} | {name:"precio",value:number} | {name:"color",value:string}
export class Producto extends Ofertas{


  constructor(
    private nameProduct: string, 
    private description: string, 
    private precio: number,
    private color: string){
      super()
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
        alert("Solo hay " + (this.limit - this.cantProduct.length) + " espacios en el almacen, reduzca la cantidad")
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
      cont = 1
      const newCant: string [] = this.cantProduct.filter((prod)=> {
        if(prod != nameProduct){
          return prod
        }else{
          if(cont <= cant){
            cont ++
          }else{
            return prod
          }
        }
      })
      this.cantProduct = newCant
      return true
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

  deleteProduct(nameProduct:string){
      const newCant: string [] = this.cantProduct.filter((prod)=> prod != nameProduct)
      this.cantProduct = newCant
  }
}

//!--------------------- ( Carrito de compras ) ------------------------------

export interface datosTicket {
  nameProduct: string,
  cant: number,
  oferta: tiposOferta,
  precioTotal: number
}
export interface ticket {
  carList: datosTicket [],
  total: number
}

export class CarroDeCompras {
  private carro: Producto []
  constructor () {
    this.carro = []
  }

  getCarrito() {
    return this.carro
  }

  addNewProduct(producto : Producto, cant : number){
    for(let i = 0; i < cant; i++){
      this.carro.push(producto)
    }
  }

  deleteProduct(producto: Producto, cant: number){
    let cont: number = 0
    this.carro.forEach((prod)=> {
      if(prod == producto){
        cont ++
      }
    })
    if (cont >= cant){
      cont = 1
      const newCant: Producto [] = this.carro.filter((prod)=> {
        if(prod != producto){
          return prod
        }else{
          if(cont <= cant){
            cont ++
          }else{
            return prod
          }
        }
      })
      this.carro = newCant
    }else{
      alert("No hay suficientes " + producto.getProduct().nameProduct + " para quitar del carrito")
      return false
    }
  }

  getPrecioTotal(): ticket{
    let filterCarro: Producto [] = []
    let carList : datosTicket [] = []
    this.carro.map((prod)=>{
      if(!filterCarro.includes(prod)){
        filterCarro.push(prod)
        
        carList.push({
          nameProduct : prod.getProduct().nameProduct,
          cant : 1,
          oferta : prod.getOferta().type,
          precioTotal: prod.calcularPrecio(1, prod.getProduct().precio)
        })
      }else{
        carList.forEach((prod2)=> {
          if(prod2.nameProduct == prod.getProduct().nameProduct){
            prod2.cant ++
            prod2.precioTotal = prod.calcularPrecio(prod2.cant, prod.getProduct().precio)
          }
        })
      }
    })

    let total = 0
    carList.forEach((list)=>{
      total += list.precioTotal
    })
    
    return {
      carList,
      total
    }
  }

  emptyCarrito(){
    this.carro = []
  }
}

//!--------------------- ( Ventas ) ------------------------------

export class Ventas {
  private listTicket : ticket []
  constructor(){
    this.listTicket = []
  }

  getList(){
    return this.listTicket
  }

  addVenta(tic:ticket){
    this.listTicket.push(tic)
  }
}