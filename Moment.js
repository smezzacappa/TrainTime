

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB7LrmBd6pMC1nQuHgqQf4eEFzzr_wWMa8",
    authDomain: "trainscheduler-9d9d9.firebaseapp.com",
    databaseURL: "https://trainscheduler-9d9d9.firebaseio.com",
    projectId: "trainscheduler-9d9d9",
    storageBucket: "",
    messagingSenderId: "562397875848"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  var empName = $("#train-name-input").val().trim();
  var empRole = $("#destination-input").val().trim();
  var empStart = moment($("#firstTrain-input").val().trim(), "DD/MM/YY").format("X");
  var empRate = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainNAme,
    destination: trainDest,
    start: firstTrain,
    rate: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the employee start
  var trainStartPretty = moment.unix(firstTrain).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainFreq = moment().diff(moment.unix(firstTrain, "X"), "months");
  console.log(trainFreq);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainStartPretty + "</td><td>" + trainFreq + "</td><td>" + frequency + "</td><td>" + empBilled + "</td></tr>");
});