let startButton = document.getElementById('start'),
   budgetValue = document.getElementsByClassName('budget-value')[0],
   dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
   lavelValue = document.getElementsByClassName('level-value')[0],
   expensesValue = document.getElementsByClassName('expenses-value')[0],
   optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
   incomeValue = document.getElementsByClassName('income-value')[0],
   monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
   yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
   expensesItem = document.getElementsByClassName('expenses-item'),
   expensesItemButton = document.getElementsByTagName('button')[0],
   optionalexpensesButton = document.getElementsByTagName('button')[1],
   countBudgetButton = document.getElementsByTagName('button')[2],
   optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
   chooseIncome = document.querySelector('.choose-income'),
   savings = document.querySelector('#savings'),
   chooseSum = document.querySelector('#sum'),
   choosePercent = document.querySelector('#percent'),
   yearValue = document.querySelector('.year-value'),
   monthValue = document.querySelector('.month-value'),
   dayValue = document.querySelector('.day-value');
   
let money, time;

const appData = {
   budget: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: false
};

startButton.addEventListener('click', function() {

   expensesItemButton.classList.remove('no-active');
   optionalexpensesButton.classList.remove('no-active');
   countBudgetButton.classList.remove('no-active');

   time = prompt("Введите дату в формате YYYY-MM-DD", "");
   while (isNaN(money) || money == '' || money == null) {
      money = +prompt("Ваш бюджет на месяц?", "");
   };
   appData.budget = money;
   appData.timeData = time;
   budgetValue.textContent = money.toFixed();
   yearValue.value = new Date(Date.parse(time)).getFullYear();
   monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
   dayValue.value = new Date(Date.parse(time)).getDate();


   expensesItemButton.addEventListener('click', function() {
   
      sum = 0;
      for (let i = 0; i < expensesItem.length; i++) {

         let a = expensesItem[i].value,
            b = expensesItem[++i].value;

            sum += +b;

         if ((typeof (a)) === 'string' && !isNaN(b) && (typeof (a)) != null && (typeof (b)) !== null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
         } else {
            i = i - 1;

         }

      };
      expensesValue.textContent = sum;
      appData.expensesValue = sum;

   });

   optionalexpensesButton.addEventListener('click', function() {
     for (let i = 0; i < optionalexpensesItem.length; i++) {
       let exp = optionalexpensesItem[i].value;
       if (isNaN(exp) && exp != null && typeof(exp) != '' && exp.length < 50) {
         appData.optionalExpenses[i] = exp;
         optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';

       } else {
         i = i - 1;
       }
     }
   });

   countBudgetButton.addEventListener('click', function() {

     if (appData.budget != undefined) {
       appData.moneyPerDay = ((appData.budget - appData.expensesValue) / 30).toFixed();
       dayBudgetValue.textContent = appData.moneyPerDay;

       if (appData.moneyPerDay < 100) {
         lavelValue.textContent = "Минимальный уровень достатка";
       } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
         lavelValue.textContent = "Средний уровень достатка";
       } else if (appData.moneyPerDay > 2000) {
         lavelValue.textContent = "Высокий уровень достатка";
       } else {
         lavelValue.textContent = "Что то пошло не так!";
       };

     } else {
       dayBudgetValue.textContent = "Что то пошло не так!";
     }

   });

});


chooseIncome.addEventListener('input', function(){

   let items = chooseIncome.value;
   appData.income = items.split(', ');
   incomeValue.textContent = appData.income;
});

savings.addEventListener('click', function() {
   if ( appData.savings == true ) {
      appData.savings = false;
   } else {
      appData.savings = true;
   }
});

chooseSum.addEventListener('input', function() {
   if ( appData.savings == true ) {
      let sum = +chooseSum.value,
          percent = +choosePercent.value;
        
      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

   }

});

choosePercent.addEventListener('input', function() {
   if ( appData.savings == true ) {
      let sum = +chooseSum.value,
        percent = +choosePercent.value;

      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

   }

});
