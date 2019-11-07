'use strict';
let strt = document.getElementById('start');
//console.log(strt);

let butIncome = document.getElementsByTagName('button');
console.log(butIncome);
let butExpenses = document.getElementsByTagName('button');
console.log(butExpenses);
let depositCheck = document.querySelector('#deposit-check');

let addIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetDayValue = document.getElementsByClassName('.budget_day-value');
let expensesMonthValue = document.getElementsByClassName('.expenses_month-value');
let additionalIncomeValue = document.getElementsByClassName('.additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('.income_period-value');
let targetMonthValue = document.getElementsByClassName('.target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let additionalIncomeItem = document.querySelector('.additional_income-item');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let periodSelect = document.querySelector('.period-select');

let money = 0,
    start = function() {
    do{ 
         money = prompt('Ваш месячный доход?', 50000);
     }
     while(isNaN(money) || money === '' || money === null){
         money = prompt('Ваш месячный доход?', 50000);
     }
 };    

 start();

let appData = {
    income: {},    // дополнительные доходы
    addIncome: [],  //перечислять
    expenses: {},
    addExpenses: [],       // дополнительные возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetMonth: 0,
    expensesMonth: 0,
    budgetDay: 0,
    asking: function(){
        if(confirm('Есть ли у вас дополнительный источник зароботка?')){
            
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный зароботок?', 'taxi');
            }
            while(!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null || itemIncome === '');

            do {
                cashIncome = prompt('Сколько в месяц вы на етом зарабатываете?', 1000);
            } 
            while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null || cashIncome === 0);
       
        appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses.map((item) => addExpenses.chatAt(0).toUpperCase() + addExpenses.slice(1).toLowerCase());
        console.log(appData.addExpenses); // каждое слово с большой буквы слова разделены запятой и пробелом

        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

       
          
           
            
   
        let itemCount,
            itemSum;
        
        for(let i = 0; i < 2; i++){
            do{
                itemCount = prompt('Введите обязательную статью расходов?', 'Квартплата'); 
            }
            while(!isNaN(itemCount) || itemCount.trim() === '' || itemCount === null || itemCount === '');
            do{
                itemSum = prompt('Во сколько это обойдется?', 50);
            }
            while(isNaN(itemSum) || itemSum === '' || itemSum === null || itemSum === 0);
            
            appData.expenses[itemCount] = itemSum;
            
        } 
    },
    
    getExpensesMonth: function() {
           
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function getBudget() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    
    getTargetMonth: function() {
        return appData.mission / appData.budgetMonth;
    },

    getStatusIncome: function() {
        if(appData.budgetDay < 300){
            return('Низкий уровень дохода');
        }else if(appData.budgetDay <= 800 && appData.budgetDay >= 300) {
            return('Средний уровень дохода');
        }else if(appData.budgetDay > 800) {
            return('Высокий уровень дохода');
        }else {
            return('Что-то пошло не так');
          }
    },
    getInfoDeposit: function() {
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } 
            while(isNaN(percentDeposit) || percentDeposit === '' || percentDeposit === null || percentDeposit === 0);
            do{
                appData.moneyDeposit = prompt('Какая сумма заложенна?', '1000');
            } 
            while(isNaN(moneyDeposit) || moneyDeposit === '' || moneyDeposit === null || moneyDeposit === 0);
              
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }


}

       

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' +  appData.expensesMonth);

if( appData.getTargetMonth > 0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + 'месяца'); 
} else {
    console.log('Цель не будет достигнута');
};


console.log(appData.getStatusIncome());


/*
for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);

};*/