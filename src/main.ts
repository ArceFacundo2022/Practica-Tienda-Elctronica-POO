
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
      showOferta()
      updateSelect()
}

const updateSelect = () => {
      const SelectProduct = document.getElementById('selectProduct') as HTMLSelectElement
      const SelectProduct2 = document.getElementById('selectProduct2') as HTMLSelectElement
      const SelectProduct3 = document.getElementById('selectProduct3') as HTMLSelectElement
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
      SelectProduct3.innerHTML = htmlProduct
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
                  showOferta()
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
      if (!almacen.quitarProducto(parseInt(inputCant.value), inputType.value)){
            return false
      }
      carrito.addNewProduct(product[0], parseInt(inputCant.value))
      showStock() 
      showCarrito()
}

const sacarCarro = () => {
      const inputType = document.getElementById('selectProduct2') as HTMLInputElement
      const inputCant = document.getElementById('CarritoCant') as HTMLInputElement
      const product = listProduct.filter((prod)=> prod.getProduct().nameProduct == inputType.value)
      carrito.deleteProduct(product[0], parseInt(inputCant.value))
      almacen.almacenarProductos(parseInt(inputCant.value),product[0].getProduct().nameProduct)
      showStock()
      showCarrito()
}

const showCarrito = () => {
      const infoCarrito = carrito.getPrecioTotal()
      const DivCarrito = document.getElementById('divCarrito') as HTMLDivElement
      const divH01 = document.getElementById('divHidden') as HTMLDivElement

      if(!infoCarrito.carList[0]){
            divH01.hidden = true
      }else{
            divH01.hidden = false
      }

      let htmlCarrito = `
      <fieldset>
      `
      infoCarrito.carList.forEach( precio => {
            htmlCarrito += `
            <h3>${precio.nameProduct}</h3>
            <p><b>Cantidad: </b>${precio.cant}  | <b>Oferta: </b> ${precio.oferta} | <span class="Estado"><b>Precio: </b>${precio.precioTotal}</span></p>
            <hr>
            `
      })

      htmlCarrito += `
            <h2 class="Estado">TOTAL: ${infoCarrito.total}</h2>
      </fieldset>
      `
      DivCarrito.innerHTML = htmlCarrito
      return true
}

document.querySelector<HTMLButtonElement>('#addCarrito')!.addEventListener('click', () => {
      cargarCarro();
});

document.querySelector<HTMLButtonElement>('#sacarCarro')!.addEventListener('click', () => {
      sacarCarro();
});
//! -------------------------------------( Ofertas )------------------------------------------------------
import { tiposOferta } from "./classes/Producto"
const addOferta = () => {
      const selectProduct = document.querySelector<HTMLSelectElement>('#selectProduct3')!;
      const selectOfertas = document.querySelector<HTMLSelectElement>('#selectOferta')!;
      const inputDescuento = document.getElementById('descuento') as HTMLInputElement
      const type: tiposOferta = selectOfertas.value as tiposOferta

      if(parseFloat(inputDescuento.value) > 1){
            alert("DESCUENTO INVALIDO: (ingrese un numero en decimal menor a 1)")
            return false
      }

      const product = listProduct.filter((prod)=> prod.getProduct().nameProduct == selectProduct.value)
      product[0].editOferta(type, parseFloat(inputDescuento.value))
      showOferta()
}

const hiddenInputs = () => {
      const selectOfertas = document.querySelector<HTMLSelectElement>('#selectOferta')!;
      const labelDescuento = document.getElementById('labelDescuento') as HTMLLabelElement
      const inputDescuento = document.getElementById('descuento') as HTMLInputElement
      switch(selectOfertas.value){
            case "individual":
                  labelDescuento.hidden = true
                  inputDescuento.hidden = true
                  break
            case "Descuento":
                  labelDescuento.hidden = false
                  inputDescuento.hidden = false
                  break
            case "2x1":
                  labelDescuento.hidden = true
                  inputDescuento.hidden = true
                  break

      }
}

const showOferta = () => {
      const DivOferta = document.getElementById('divOfertas') as HTMLDivElement
      let htmlOferta = `
      `
      
      if (listProduct.length == 0){
            DivOferta.innerHTML = htmlOferta
            return false
      }
      listProduct.forEach((prod)=> {
            const info = prod.getOferta()
            if(info.type == "Descuento"){
                  htmlOferta += `
                  <div class="subComponent comp02">
                        <h3>${prod.getProduct().nameProduct}</h3>
                        <p><b class="Ingresos">Oferta: </b>${info.type}</p>
                        <p><b class="Ingresos">Descuento: </b>${info.descuento*100}%</p>
                  </div>  
                  `
            }else{
                  htmlOferta += `
                  <div class="subComponent comp02">
                        <h3>${prod.getProduct().nameProduct}</h3>
                        <p><b class="Ingresos">Oferta: </b>${info.type}</p>
                  </div>  
                  `
            }
      })
      DivOferta.innerHTML = htmlOferta
}

document.querySelector<HTMLButtonElement>('#addOferta')!.addEventListener('click', () => {
      addOferta();
});

document.querySelector<HTMLSelectElement>('#selectOferta')!.addEventListener('change', () => {
      hiddenInputs()
});

showOferta()
//! -------------------------------------( Carrito de Compras )------------------------------------------------------
import { Ventas } from "./classes/Producto"

const listVentas = new Ventas()

const newVenta = () => {

      if(!carrito.getCarrito()[0]){
            alert('Agrege algo al carrito para poder realizar la venta 💰')
            return false
      }
      listVentas.addVenta(carrito.getPrecioTotal())
      carrito.emptyCarrito()
      showVentas()
      showCarrito()
}

const showVentas = () => {

      const infoVenta = listVentas.getList()
      const DivVenta = document.getElementById('divVenta') as HTMLDivElement
      const divH02 = document.getElementById('divHidden2') as HTMLDivElement

      if(!infoVenta[0]){
            divH02.hidden = true
      }else{
            divH02.hidden = false
      }

      let htmlVenta = ``
      let ingresos = 0

      infoVenta.forEach( ticket => {
            htmlVenta += `
            <fieldset>
            `
            ticket.carList.forEach((precio)=>{
                  htmlVenta += `
                  <h3>${precio.nameProduct}</h3>
                  <p><b>Cantidad: </b>${precio.cant}  | <b>Oferta: </b> ${precio.oferta} | <span class="Estado"><b>Precio: </b>${precio.precioTotal}</span></p>
                  <hr>
                  `
            })
            htmlVenta += `
                  <h2 class="Estado">TOTAL: ${ticket.total}</h2>
            </fieldset>
            <br>
            `

            ingresos +=ticket.total
      })
      htmlVenta += `
            <h2 class="Ingresos">INGRESOS: ${ingresos}</h2>
      `
      DivVenta.innerHTML = htmlVenta
      return true
}

document.querySelector<HTMLButtonElement>('#addVenta')!.addEventListener('click', () => {
      newVenta();
});
export {}