// const cart=[];
let cart = localStorage.getItem('cart-items')
  ? JSON.parse(localStorage.getItem('cart-items'))
  : []

const cartBtn = document.querySelectorAll('.cart')

cartBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const product = e.target.parentElement.parentElement.parentElement
    const product_img = product.querySelector('.img-fluid').src
    const product_name = product.querySelector('h4').innerText
    const product_price = parseFloat(product.querySelector('h5').innerText)
    const product_quantity = 1
    // console.log(product_img,product_name,product_price);
    const existingItem = cart.find((item) => {
      return item.product_name === product_name
    })
    if (existingItem) {
      existingItem.product_quantity += 1
    } else {
      cart.push({ product_name, product_price, product_quantity, product_img })
    }
    localStorage.setItem('cart-items', JSON.stringify(cart))
    // console.log(cart);
    updatCartList(product_name, product_price, product_quantity, product_img)
  })
})

//adding from local storage
const getTotol = () => {
  let total = 0
  cart.forEach((item) => {
    total += item.product_price * item.product_quantity
    console.log(total)
  })
  // console.log("total price:",total);
  return total.toFixed(2)
}

const updatCartList = (
  product_name,
  product_price,
  product_quantity,
  product_img
) => {
  const cartList = document.querySelector('.cart-list')

  const liElement = document.createElement('li')
  if (cart == null) {
    liElement.innerHTML = `<p>No items</p>`
  } else {
    liElement.innerHTML = `
        <a href="#" class="photo"><img src="${product_img}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${product_name}</a></h6>
        <p style="font-size:1.5rem;"><span style="color:red;cursor:pointer" id="minus">-</span> 1 <span style="color:red;cursor:pointer" id="plus">+</span></p>
        <div style="display:flex;justify-content:space-around;align-items:center;">
        
        <p>${product_quantity} - <span class="price">${product_price}</span></p>
          <button class="btn btn-default hvr-hover btn-cart" style="color:white;">Remove</button>
        
        </div>
        
        
        
        `
    cartList.appendChild(liElement)
    // console.log(getTotol());
    const totalPrice = document.querySelector('#total-price')
    totalPrice.innerText = getTotol()
  }
}
cart.forEach((item) => {
  updatCartList(
    item.product_name,
    item.product_price,
    item.product_quantity,
    item.product_img
  )
})
