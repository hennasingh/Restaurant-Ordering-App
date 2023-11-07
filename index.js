import { menuArray  } from "./data.js"
let orderFoodList = []

const payForm = document.getElementById('pay-form')

payForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const payFormData = new FormData(payForm)
    const username = payFormData.get('userName')

    const thankYouMsg = `
        <div class="thank-you">
            <h3>Thanks, ${username}! Your order is on its way!</h3>
        </div>
    `
    document.getElementById('confirmOrder').innerHTML = ''
    document.getElementById('payOrder').innerHTML = thankYouMsg
    document.getElementById('modal').style.display = 'none'
    orderFoodList = []
    payForm.reset()
})

function createHtml(menuArray) {
    let foodList = ``

    menuArray.forEach((item) => {
        foodList += `
            <div class="foodItem">
                <div class="food-emoji">
                    <h1>${item.emoji}</h1>
                </div>
                <div class="food-details">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients}</p>
                    <h4> $${item.price}</h4>
                </div>
                <div class="add">
                    <button class="add-btn" data-add="${item.id}"></button>
                </div>
            </div>
        `
    })

    return foodList;
}

document.addEventListener('click', function(event) {
   
    if(event.target.dataset.add) {
        handleAddClick(event.target.dataset.add)
    } else if(event.target.dataset.remove) {
        handleRemoveClick(event.target.dataset.remove)
    } else if(event.target.id === 'complete-btn') {
        handleCompleteBtnClick()
    }
})

function handleAddClick(addId) {
    document.getElementById('payOrder').innerHTML = ''
    const foodItem = menuArray.filter(item => item.id == addId)[0]
    orderFoodList.push(foodItem)
    displayOrder(orderFoodList)    

}

function handleRemoveClick(removeId) {
    if(orderFoodList.length == 1) {
        orderFoodList.pop()
        document.getElementById('confirmOrder').innerHTML = ''
    } else {
        const foodItemIndex = orderFoodList.findIndex(item => item.id == removeId)
        orderFoodList.splice(foodItemIndex, 1)
        displayOrder(orderFoodList)
    }
}

function handleCompleteBtnClick() {
    document.getElementById('modal').style.display = 'inline'
}

function displayOrder(orderFoodList) {

    let orderList = ``
    let foodTotal = 0
    let foodList = ``

        orderFoodList.forEach(foodItem => {
            foodTotal += foodItem.price
            foodList += `                
                    <div class="order-inner">
                        <h3>${foodItem.name}</h3>
                        <p data-remove="${foodItem.id}">remove</p>
                        <h3 class="order-price">$${foodItem.price}</h3>
                    </div>
                `
        })
        orderList = `
            <div class="order-details">
                <h2>Your order</h2>
                ${foodList}
                <div class="order-total">
                    <h3>Total Price:</h3>
                    <h3 class="total">$${foodTotal}</h3>
                </div>
                <button id="complete-btn">Complete order</button>
            </div>
        `
        document.getElementById('confirmOrder').innerHTML = orderList
}

function render() {
    document.getElementById('foodList').innerHTML = createHtml(menuArray)
}

render()