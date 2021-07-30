// 關鍵字 new 來產生實例 alphaPos
const alphaPos = new AlphaPos()

// 建構式函式 新增飲料選項
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

// 價格透過prototype生成
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}



// 新增訂單 監聽add按鈕
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')

// click add
addDrinkButton.addEventListener('click', (event) => {
  // step1. 選取的飲料項目冰塊甜度
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  // console.log(`${drinkName}, ${ice}, ${sugar}`)

  // step2. 沒選飲料防呆
  if (!drinkName) {
    return alert('no drink selected')
  }

  // step3. 建立飲料物件
  const drink = new Drink(drinkName, sugar, ice)
  // console.log(drink)
  // console.log(drink.price())

  // step4. render order to the left side
  alphaPos.addDrink(drink)
})




// 監聽清單 delete order

const orderLists = document.querySelector('[data-order-lists]')
orderLists.addEventListener('click', (event) => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  if (event.target.matches('[data-alpha-pos="delete-drink"]')) {
    alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)

  }
})

// 監聽結帳 checkout
const checkout = document.querySelector('[data-alpha-pos="checkout"]')
checkout.addEventListener('click', ()=>{
  alphaPos.checkout()
  alert(`Total amount of drinks：$${alphaPos.checkout()}`)

  // 清空購物車
  alphaPos.orderClean(orderLists)

})

function AlphaPos() {

  AlphaPos.prototype.getCheckedValue = function (inputName) {
    let selectedOption = ''
    document.querySelectorAll(`[name=${inputName}]`).forEach((option) => {
      // 利用勾選type="radio"會出現checked = true
      if (option.checked) {
        selectedOption = option.value
      }
    })
    return selectedOption
  },

    AlphaPos.prototype.addDrink = function (item) {
      const orderLists = document.querySelector('[data-order-lists]')
      let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
      <span data-alpha-pos="delete-drink">×</span>
    </div>
      <h6 class="card-title mb-1">${item.name}</h6>
      <div class="card-text">${item.ice}</div>
      <div class="card-text">${item.sugar}</div>
      </div>
      <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ 
      <span data-drink-price>${item.price()}</span></div>
      </div>
      </div>
    `
      orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
    },

    AlphaPos.prototype.deleteDrink = function (target) {
      target.remove()
    },

    AlphaPos.prototype.checkout = function () {
      let totalAmount = 0
      document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
        totalAmount += Number(drink.textContent)
      })
      return totalAmount
    },

    AlphaPos.prototype.orderClean = function (target) {
    target.querySelectorAll('.card').forEach((card) => {
        card.remove()
      })


    }

}



// checkout

