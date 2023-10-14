import { menuArray  } from "./data.js"

const foodList = document.getElementById('foodList')

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
                    <button class="add-btn"></button>
                </div>
            </div>
        `
    })

    return foodList;
}

function render() {
    document.getElementById('foodList').innerHTML = createHtml(menuArray)
}

render()