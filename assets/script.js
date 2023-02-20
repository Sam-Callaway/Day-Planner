var scheduleGrid = $("#scheduleGrid")
// Set the current day text at the top of the page
$("#currentDay").text(moment().format("Do MMMM YYYY"))


// This function highlights the hour rows depending on if they are in the past, present or future
function hourHighlight(){
    for (i=0;i<15;i++){
        var hourRow = scheduleGrid.children().eq(i)
        var hourRowHour = moment(hourRow.children().first().text(),'hh:mm A').format('kk')
        var nowHour = moment().format('kk')
        if(hourRowHour < nowHour){
            hourRow.children().eq(1).addClass('past')
        }
        else
        if (hourRowHour === nowHour){
            hourRow.children().eq(1).addClass('present')
        }
        else
        {
            hourRow.children().eq(1).addClass('future')
        }
    
    }
}

// Function to run hourHighlight every ten seconds so it updates as time goes on

function displayMessage() {
  
    var interval = setInterval(function () {
        hourHighlight();
    }, 10000);
  }
displayMessage();

// This function runs through the hour rows and checks if there is anything saved for them. If there is then render it to page. If not then clear the box of text
function planRender(){
    for (i=0;i<15;i++){
        var current = scheduleGrid.children().eq(i)
        var currentHour = current.children().first().text();
        var currentInput = current.children().eq(1)
        if (localStorage.getItem(currentHour) === null){
            currentInput.val("")
        }
        else 
        {
            currentInput.val(localStorage.getItem(currentHour))
        }
    }    
}

// Button to clear localStorage
$("#resetButton").on('click',function (){
    clearAll();
})

// Clearing function
function clearAll(){
    localStorage.clear();
    localStorage.setItem("day",moment().format("Do MMMM YYYY"))
    planRender();
}


// Button to save input
$(scheduleGrid.children().children('button')).on('click', function () {
    // Find out what the input text and the hour it's in are

    var currentBtn = $(this);
    var current = currentBtn.parent();
    var currentHour = current.children().first().text();
    var currentInput = current.children().eq(1).val();

    // Write that to local storage
    localStorage.setItem(currentHour,currentInput);

    // Run the saved plans renderer again
    planRender();
    
})

// This function clears localStorage if the user opens the planner on a new day
function newDay(){
    if(localStorage.getItem("day") === null){
        localStorage.setItem("day",moment().format("Do MMMM YYYY"))
    }
    else
    if (localStorage.getItem("day") < moment().format("Do MMMM YYYY")){
        clearAll();
    }
}

newDay();
hourHighlight();
planRender();
