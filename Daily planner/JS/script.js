//Global variables
//Save button
var saveBtn = $(".saveBtn");
//Current date
var today = $("#today");
//New day
var now = new Date(Date.now());
//Current hour
var currentTime = now.getHours();
//Event listener

//Daily planner logic
$(document).ready(() => {

  //For loop to change time block color based on time of day
  for (var hour = 9; hour < 18; hour++) {
    var time = "present";
    if (hour > currentTime) {
      time = "future";
    } else if (hour < currentTime) {
      time = "past";
    }
    const $timeBlock = $("#hour-" + hour);
    if ($timeBlock && $timeBlock.length) {
      $timeBlock.children().eq(1).addClass(time);
    }
  }

  //Pulls from local storage if stored value exists
  $.each($('.time-block'), (index, item) => {
    const $item = $(item);
    const storedValue = localStorage[$item.attr('id')];
    if (!storedValue || !storedValue.length) {
      return;
    }
    const $textArea = $item.find('textArea.description');
    if (!$textArea.length) {
      return;
    }
    
    //Adds text to time block from local storage
    $textArea.val(storedValue);
  });

  //Save button sends current text value of time block to local storage
  saveBtn.on("click", (event) => {
    const $saveBtn = $(event.currentTarget);
    var value = $saveBtn.siblings("textArea.description").val().trim();
    var hour = $saveBtn.parent().attr("id");
    localStorage.setItem(hour, value);
  });

  //Changes "Today" placeholder to current date
  setInterval(() => {
    var today = $("#today");
    const currentTime = moment().format("MMM Do, YYYY hh:mm:ss");
    today.text(currentTime);
  }, 1000);
});