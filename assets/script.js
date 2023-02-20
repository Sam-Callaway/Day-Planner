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
            console.log(localStorage.getItem(currentHour))
            currentInput.val(localStorage.getItem(currentHour))
        }
    }    
}

// Button to clear localStorage
$("#resetButton").on('click',function (){
    localStorage.clear();
    planRender();
})


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

hourHighlight();
planRender();