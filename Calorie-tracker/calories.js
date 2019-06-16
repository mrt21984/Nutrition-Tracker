class Food {
    constructor(fat, protein, carbs, serving) {
        this.fat = fat;
        this.protein = protein;
        this.carbs = carbs;
        this.serving = serving;
        this.fatCal = ((fat * 9) * this.serving);
        this.proCal = ((protein * 4) * this.serving);
        this.carbCal = ((carbs * 4) * this.serving);
        this.totalCal = (this.fatCal + this.proCal + this.carbCal);
    }
}

class UI {

    static displayTotals() {

        // const egg = new Food(5, 6, 0, 4);
        // const whey = new Food(2, 25, 2, 2);
        // const beef = new Food(8, 25, 0, 2);
        // const butter = new Food(12, 0, 0, 2);
        // const coconutOil = new Food(14, 0, 0, 2);
        // const potatoes = new Food(0, 10, 60, 1);

        // let nutrition = new Array(egg, whey, beef, butter, coconutOil, potatoes);

        // localStorage.setItem('nutrition', JSON.stringify(nutrition));
        const foodArr = JSON.parse(localStorage.getItem('nutrition'));

        let total = 0;
        let totalFat = 0;
        let totalPro = 0;
        let totalCarb = 0;



        for (let i = 0; i < foodArr.length; i++) {
            totalFat += foodArr[i].fatCal;
            totalPro += foodArr[i].proCal;
            totalCarb += foodArr[i].carbCal
            total += foodArr[i].totalCal;
        }

        let fatPercent = (totalFat / total) * 100;
        let protPercent = (totalPro / total) * 100;
        let carbPercent = (totalCarb / total) * 100;

        let calTable = document.querySelector("#calTable");
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${totalFat}</td><td>${totalPro}</td><td>${totalCarb}</td><td>${total}</td>`
        calTable.appendChild(tr);


        let percentTable = document.querySelector("#percentTable");
        tr = document.createElement('tr');
        tr.innerHTML = `<td>${fatPercent.toPrecision(2)}</td><td>${protPercent.toPrecision(2)}</td><td>${carbPercent.toPrecision(2)}</td></td>`
        percentTable.appendChild(tr);


    }


}


class Store {
    static getFoods() {

        let foods;
        if (localStorage.getItem('nutrition') === null) {
            foods = [];
        } else {
            foods = JSON.parse(localStorage.getItem('nutrition'));
        }
        return foods;
    }

    static addFood(food) {
        const foods = Store.getFoods();
        foods.push(food);
        localStorage.setItem('nutrition', JSON.stringify(foods));
    }
    // static removeFood(isbn) {
    //     const books = Store.getBooks();
    //     books.forEach((book, index) => {
    //         if (book.isbn === isbn) {
    //             books.splice(index, 1);
    //         }
    //     });
    //     localStorage.setItem('books', JSON.stringify(books));
    // }
}


document.addEventListener('DOMContentLoaded', UI.displayTotals);

document.querySelector('#subBtn').addEventListener('click', () => {
    // e.preventDefault();

    let fat = document.querySelector("#fatGrams").value;
    let protein = document.querySelector("#proteinGrams").value;
    let carb = document.querySelector("#carbGrams").value;
    let serving = document.querySelector("#servings").value;

    const newFood = new Food(fat, protein, carb, serving);
    Store.addFood(newFood);

});

