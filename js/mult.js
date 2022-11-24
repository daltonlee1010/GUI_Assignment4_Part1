/*
Author: Dalton Lee
Created: November 13, at 11:00 AM
Description: This webpage creates a multiplication table completely dynamically based on 
parameters entered in an HTML form, validated using jquery.validate.js plugin.

File: mult.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table PART 1: Validation Plugin
Dalton Lee, UMass Lowell Computer Science Student, dalton_lee@student.uml.edu
Copyright (c) 2021 by Dalton. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Dalton Lee on November 13, at 7:00 PM
*/

$().ready(function() {
    $("#mult_form").validate({  // validate method can be found in jquery.validate.js
        // Rules for column and row input boxes
        rules: {
            crange1: {
                required: true, // The form cannot be submitted without this input field being entered.
                number: true,   // Don't allow inputs that contain anything other than #s 0-9
                min: -50,       // Number entered is at least -50
                max: 50         // Number entered is at most 50
            },
            crange2: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            rrange1: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            rrange2: {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
        },
        // Helpful messages that notify webpage user how to change inputs to make them valid
        messages: {
            crange1: {
                required: "Please enter a value for the column range",
                number: "Please enter an integer",
                min: "Enter a number greater than or equal to -50",
                max: "Enter a number less than or equal to 50"
            },
            crange2: {
                required: "Please enter a value for the column range",
                number: "Please enter an integer",
                min: "Enter a number greater than or equal to -50",
                max: "Enter a number less than or equal to 50"
            },
            rrange1: {
                required: "Please enter a value for the row range",
                number: "Please enter an integer",
                min: "Enter a number greater than or equal to -50",
                max: "Enter a number less than or equal to 50"
            },
            rrange2: {
                required: "Please enter a value for the row range",
                number: "Please enter an integer",
                min: "Enter a number greater than or equal to -50",
                max: "Enter a number less than or equal to 50"
            }
        }
    });
});

function submissionCheck() {

    // Check variable, set to false if there are any errors with text inputs
    var check = $("#mult_form").valid(); // valid method can be found in jquery.validate.js
    
    if(check == false) {
        return;
    }
    else {
        // Extract values from input fields, store in variables..
        var cmin = document.getElementById('crange1').value;
        var cmax = document.getElementById('crange2').value;
        var rmin = document.getElementById('rrange1').value;
        var rmax = document.getElementById('rrange2').value;

        // Convert values into integers to use in min/max checks & comparison checks
        var cmin_int = parseInt(cmin, 10);
        var cmax_int = parseInt(cmax, 10);
        var rmin_int = parseInt(rmin, 10);
        var rmax_int = parseInt(rmax, 10);

        // Swap column min value to column max value if it is larger
        var temp = cmin_int;
        if(temp > cmax_int) {
            cmin_int = cmax_int;
            cmax_int = temp;
        }
        // Swap row min value to row max value if it is larger
        temp = rmin_int;
        if(temp > rmax_int) {
            rmin_int = rmax_int;
            rmax_int = temp;
        }

        // If contents created by this js file upon clicking submit exist, delete them..
        var container_exists = document.getElementById("mult_container");
        if(container_exists != null)
            container_exists.parentNode.removeChild(container_exists);
        var table_exists = document.getElementById("mult_table");
        if(table_exists != null)
            table_exists.parentNode.removeChild(table_exists);

        generateTable(cmin_int, cmax_int, rmin_int, rmax_int);
    }
}

    


function generateTable(cmin, cmax, rmin, rmax) {
    // Declare variables that will be used to display the multiplication table
    let container = document.createElement('div');
    container.setAttribute('id', 'mult_container');
    let table = document.createElement('table');
    table.setAttribute('id', 'mult_table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Append proper html elements as children to other elements
    container.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('body').appendChild(container);

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "#";
    row_1.appendChild(heading_1);

    // Add values on head row (contains column values) from min to max value
    for(let i = cmin; i <= cmax; i++)
    {
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = i.toString();
        row_1.appendChild(heading_2);
    }
    thead.appendChild(row_1);


    // Creating and adding data to second row of the table
    // Add values on tbody th column (contains row numbers) from min to max value
    for(let i = rmin; i <= rmax; i++)
    {
        let row_next = document.createElement('tr');
        let row_next_head = document.createElement('th');
        row_next_head.innerHTML = i.toString();
        row_next.appendChild(row_next_head);

        // Calculate and fill in all td of the table (products of the column's and row's values)
        for(let j = cmin; j <= cmax; j++)
        {
            let row_next_data = document.createElement('td');
            let product = i * j;
            row_next_data.innerHTML = product.toString();
            row_next.appendChild(row_next_data);
        }
        tbody.appendChild(row_next);
    }
}