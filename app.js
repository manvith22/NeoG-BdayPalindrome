const dob = document.querySelector("#date-of-birth");

const btn = document.querySelector("#btn");

const result = document.querySelector("#result");

function reverseStr(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
    
}

function convertDateToString(date) {
    var dateStr = { day:'', month:'', year:''};

    if(date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function dateFormats(date){

    var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllFormats(date){
    var listOfPalindromes = dateFormats(date);
    var check = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])){
            check = true;
            break;
        }
    }
    return check;
}


function leapYearCheck(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}


function incDate(date){
   var day = date.day + 1;
   var month = date.month;
   var year = date.year;

   var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
   
   if(month === 2){
       if(leapYearCheck(year)){
           if(day>29){
               day = 1;
               month++;
           }
        }
        else
        {
              if(day>28) {
              day = 1;
              month++;
                         }
        }
   }
   else{
           if(day > daysInMonth[month-1]){
               day = 1;
               month++;
           }
       }
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    };

}


function nextPalindromeDate(date){
      var counter = 0;
      var nextDate = incDate(date);
      
      while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
          if(isPalindrome){
              break;
          }
          nextDate = incDate(nextDate);
      }
      return [counter,nextDate];
}


function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (leapYearCheck(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function getPreviousPalindromeDate(date) {
    var previousDays = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var resultList = checkPalindromeForAllFormats(previousDays);
      if(resultList){
        break;
    }
        previousDays = getPreviousDate(previousDays);
    }
       return [ctr,previousDays];
}





function clickHandler(e){
var dobToStr = dob.value;
if(dobToStr != ""){
    var splitting = dobToStr.split("-")
    var date = {
        day: Number(splitting[2]),
        month: Number(splitting[1]),
        year: Number(splitting[0])
    }
}

var palindromeChecker = checkPalindromeForAllFormats(date)
if(palindromeChecker){
    result.innerText = "Lucky Palindrome"
}
else{
    var[counter1,displayDate1] = nextPalindromeDate(date);
    var[counter2,displayDate2] = getPreviousPalindromeDate(date);
    if (counter1 > counter2) {
        result.innerText = `The nearest palindrome date is ${displayDate2.day}-${displayDate2.month}-${displayDate2.year}, you missed by ${counter2} days.`;
      } else {
        result.innerText = `The nearest palindrome date is ${displayDate1.day}-${displayDate1.month}-${displayDate1.year}, you missed by ${counter1} days.`;
      }
}
}

btn.addEventListener('click', clickHandler);


// console.log(nextPalindromeDate(date));
// console.log(getPreviousPalindromeDate(date));
// console.log(getPreviousDate(date));


