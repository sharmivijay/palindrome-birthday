
var tempDate = document.querySelector("#input-date");
var btnCheck = document.querySelector("#btn-check");
var output = document.querySelector("#output");

btnCheck.addEventListener("click", checkString);

function checkString(){
    if(tempDate.value){
        var flag = false;
        var charArray = tempDate.value.split("-");
        var inputDate = {day: charArray[2], month:charArray[1],year:charArray[0]};
        var resultList = checkPanlindromeForAllFormats(inputDate);
        for (var i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
              flag =true;
            }
          }
        if(flag){
            output.innerText = "its palindrome"
        }
        else{
            var nextDate= nextPalindromeDate (inputDate);
            output.innerText="Next palindrome date is away by: " + nextDate[0]+",and the date would be :"+ 
            nextDate[1].day+"-"+nextDate[1].month+"-"+nextDate[1].year;
        }
    }
    else{
        output.innerText ="Please select the date";
    }
}


function reverseString(str){
    var charArray =  str.split("");
    var reversedCharArray = charArray.reverse();
    var reversedStringString =  reversedCharArray.join("");
    return reversedStringString;
}

function isPalindrome(stringone){
   return stringone === reverseString(stringone) ;
}


function convertDateToString(input){
    var output={};
    var keylist= Object.keys(input);
    for(var i =0;  i< keylist.length;i++){
        var temp= input[keylist[i]];
        if(temp < 10){
            output[keylist[i]] = '0'+temp;   
        }else{
            output[keylist[i]] = temp.toString();
        }   
    }
    return output;
}

function getDateInAllFormats(date){
    var date = convertDateToString(date);
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  
  

  function checkPanlindromeForAllFormats(date){
    var listofpalindrome = getDateInAllFormats(date);
    var palindromeList = [];
    for(var i=0; i<listofpalindrome.length; i++){
            var result=isPalindrome(listofpalindrome[i]);
            palindromeList.push(result)
    }
    return palindromeList;
  }

  function checkLeapyear(year){
      var flag = false;
        if(year % 400 ===0 ){
           flag= true;
        }
        if(year% 4 ===0 && !year%100 ===0){
            flag=true;
        }
        return flag
  }

  function getNextDate(date){
      var day = date.day +1;
      var month = date.month;
      var year = date.year;

      daysInMonth =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if(month === 2){
          if(checkLeapyear(year)){
            if(day>29){
                day=1;
                month++;
            }
          }else{
              if(day > 28){
                  day=1;
                  month++;
              }
          }
      }else{
          if(day > daysInMonth[month-1]){
              day=1;
              month++;
          }

          if(month>12){
              month=1;
              year++;
          }
      }

      return {day:day, month:month, year:year};
  }

  function nextPalindromeDate(existingdate){
        var newDate =  getNextDate(existingdate);
        var day = 0;
        while(1){
            day ++;
            var temp =  convertDateToString(newDate);
            var resultList= checkPanlindromeForAllFormats(temp);
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i]) {
                  return [day, temp];
                }
              }
            newDate = getNextDate(newDate);
        }
  }


//console.log("Check next date: "+ nextPalindromeDate(date));
