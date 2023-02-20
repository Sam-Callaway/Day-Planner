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

hourHighlight();