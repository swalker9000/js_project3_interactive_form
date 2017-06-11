$('document').ready( function () {
	$('#name').focus(); //focuses on name input upon loading page
});

//Global Variables
var total;

//JOB ROLES

//reveals/hides custom input for Job Role
function otherJobRole () {
	//sets-up default view of 'other-title' hidden
	//'other-title' input was added to HTML directly so that if javascript was disabled the input field 
	//would should by default
	$("#other-title").hide();
	//shows text field when 'other' job option is chosen
	$('#title').on('change', function () {
		if( $(this).val() == 'other') {
			$('#other-title').show();
		} else {
			//if 'other' choice is chosen and later changed - hides text input field
			$("#other-title").hide();
		}
	});
}

//TSHIRT INFO

// Show/Hide Color Option functions 

function revealColors (color1, color2, color3) {
	$('option[value="' + color1 + '"]').show();
	$('option[value="' + color2 + '"]').show();
	$('option[value="' + color3 + '"]').show();
}

function hideColors (color1, color2, color3) {
	$('option[value="' + color1 + '"]').hide();
	$('option[value="' + color2 + '"]').hide();
	$('option[value="' + color3 + '"]').hide();
}

// Add/Remove prompt for user to make a choice

function pickPrompt (value, prompt) {
	$("#color").prepend('<option value="' + value +  '" selected> Pick a ' + prompt + ' </option>');
}

function removePrompt (value) {
	$('option[value="'+ value +'"]').remove();
}


//reveals/hides color selections depending on design chosen
function tShirtColors () {
	//hides all color options until user choses a design
	$("#color").hide();
	// When design is chosen then display cooresponding t-shirt color options					
	$('#design').on('change', function () {
		switch ( $(this).val() )  {
			case 'js puns': 
				removePrompt("pickAColor"); //prevents duplicate pick a color options from being created
				pickPrompt("pickAColor", "Color");	//prompts user to pick a specified color
				$("#color").show();
				revealColors("cornflowerblue", "darkslategrey", "gold");
				hideColors("tomato", "steelblue", "dimgrey");
				break;
			case 'heart js':
				removePrompt("pickAColor");//prevents duplicate pick a color options from being created
				pickPrompt("pickAColor", "Color");	//prompts user to pick a specified color
				$("#color").show();
				hideColors("cornflowerblue", "darkslategrey", "gold");
				revealColors("tomato", "steelblue", "dimgrey");
				break;
			default :
				removePrompt("pickAColor"); //prevents duplicate pick a color options from being created
				$("#color").hide();
		}
	});
}

//REGISTER FOR ACTIVITIES

//enables/disables checkboxes for activities with conflicting times

function conflictingTime (conflict1, conflict2, keyPhrase) {
	if ($('input[name="' + conflict1 + '"]').prop("checked") || $('input[name="' + conflict2+ '"]').prop("checked")) {
		$('label:contains("' + keyPhrase + '")').children().not('input:checked').prop({disabled: true});
		$('input:disabled').parent().css("color", "grey");	
	} else {
		$('label:contains("' + keyPhrase + '")').children().prop({disabled: false});
		$('input:enabled').parent().css("color", "");
	}
}

//disables conflicting activity when checked

function activitySelection () {
	$('input[type="checkbox"]').on('change', function() {
		conflictingTime( "js-frameworks", "express", "Tuesday 9am-12pm");
		conflictingTime( "js-libs", "node", "Tuesday 1pm-4pm");
	});
}

//Registration fee

//var total = 0;
function calculate() {
//sets all the checkbox in the variable activities
var activities = document.querySelectorAll('input[type="checkbox"]'); 
total = 0;
//iterates through the activities and adds the value of the checkboxs to the total
for( let i = 0; i < activities.length; i++ ) {
 	if( activities[i].checked) {
 		total += +parseInt(activities[i].value);
 	}
 }
}


function registrationFee () {
	//sets the value of the the activities
	$(':checkbox').not("label:first-of-type").val(100);
	$(':checkbox').first().val(200);
	//when a checkbox is changed...
	$(':checkbox').on('change', function() {
		//remove appended div containing total message
		$('#registrationFee').remove();
		calculate();
		//appends total message div when at least one check box is checked
		if ( $(":checkbox:checked").length > 0 ) {
			$('.activities').append("<div id='registrationFee'><h3>Total: $" + total + "</h3></div>");
		}
		
		
	});
}



//PAYMENT OPTIONS

function paymentOption () {
	//hides Paypal and Bitcoin text information as default
	$('fieldset p').hide();
	//sets credit card as default payment option
	$('option[value="credit card"]').prop({selected: true});
	// When payment is chosen then display cooresponding payment instructions					
	$('#payment').on('change', function () {
		switch ( $(this).val() )  {
			case 'paypal': 
				$('p:contains("Paypal")').show().text();
				$('p:contains("Bitcoin")').hide().text();
				$('#credit-card').hide().text();
				break;
			case 'bitcoin':
				$('p:contains("Paypal")').hide().text();
				$('p:contains("Bitcoin")').show().text();
				$('#credit-card').hide().text();
				break;
			default :
				$('p:contains("Paypal")').hide().text();
				$('p:contains("Bitcoin")').hide().text();
				$('#credit-card').show().text();
		}
	});
}

//FORM VALIDATIONS

//NAME VALIDATION

//checks that text has been inputed into name field
function validateName () {
	$('button[type="submit"').click( function (e) {
		//if a name has not been entered prevent form from submitting and create alert message
		if( $('#name').val() == "" || $('#name').val() == " " )  {
			e.preventDefault();
			$('p:contains("name")').remove();
			$('#name').prev().append('<p>Please enter a name</p>');
			$('p:contains("name")').css("color", "red");
		} 
		//otherwise remove alert message and allow submit
		else {
			$('p:contains("name")').remove();
		}
	});
}

//VALIDATES EMAIL

//checks email format is valid
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function checkEmailInput () {
	//if email is invalid create error message
	if( $('#mail').val() == "" || isEmail( $('#mail').val()) === false ) {
			$('p:contains("email")').remove();
			$('#mail').prev().append('<p>Please enter a valid email</p>');
			$('p:contains("email")').css("color", "red");
		} 
		//otherwise remove alert message 
		else {
			$('p:contains("email")').remove();
		}
}

function validateEmail () {
	//validate on click of submit
	$('button[type="submit"').click( function (e) {
		e.preventDefault;
		checkEmailInput();
	});
	//validate while user is typing
	$('input[type="email"').keypress( function () {
		checkEmailInput();
	});
}

//ACTIVITY SELECTION VALIDATION

//checks for at least one activity selection

function validateActivitySelection () {
	$('button[type="submit"').click( function (e) {
		//if no activity selections have been made prevent form from submitting and create alert message
		if ($(':checkbox:checked').length === 0 ) {
			e.preventDefault();
			$('p:contains("at least")').remove();
			$(':checkbox').parent().first().prepend('<p>Please select <strong>at least</strong> one activity</p>');
			$('p:contains("at least")').css("color", "red");
		} 
		//otherwise remove alert message and allow submit 
		else {
			$('p:contains("at least")').remove();
		}
	});
}

//CC VALIDATION

//validates credit card information
function validateCreditcard () {
	$('button[type="submit"').click( function (e) {
		$('#payment').on('change', function () {
			//if a payment method other than credit card is selected remove any error messages
			if ( $("#payment").val() !== 'credit card') {
				e.preventDefault();
				$('p:contains("credit card")').remove();
				$('p:contains("zip")').remove();
				$('p:contains("CVV")').remove();
			}
		});
		//if credit card is selected as payment check for these errors
		if ( $("#payment").val() == 'credit card') {

			//CHECK CREDIT CARD NUMBER
			//if CC number is left blank send error and prevent submit
			if ($('#cc-num').val().length === 0 ) {
				$('p:contains("credit card")').remove();
				$('#payment').parent().prepend('<p>Please enter a credit card number</p>');
				$('p:contains("credit card")').css("color", "red");
			} 
			// if CC number is not between 13-16 digits send error
			else if ($('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
				e.preventDefault();
				$('p:contains("credit card")').remove();
				$('#payment').parent().prepend('<p>Please enter a credit card number that is between 13 - 16 digits</p>');
				$('p:contains("credit card")').css("color", "red");
			} 
			// otherwise remove error messages and allow submit
			else {
				$('p:contains("credit card")').remove();
			}
			//CHECK ZIP CODE
			//if zip code is less than 5 digits send error and prevent submit
			if ($('#zip').val().length !== 5) {
				e.preventDefault();
				$('p:contains("zip")').remove();
				$('#payment').parent().prepend('<p>Please enter a valid zip code</p>');
				$('p:contains("zip")').css("color", "red");
			} 
			//otherwise remove error messages and allow submit
			else {
				$('p:contains("zip")').remove();
			}

			//CHECK CVV CODE
			//if CVV code is less than 3 digits send error and prevent submit
			if ($('#cvv').val().length !== 3) {
				e.preventDefault();
				$('p:contains("CVV")').remove();
				$('#payment').parent().prepend('<p>Please enter a valid 3 digit CVV code</p>');
				$('p:contains("CVV")').css("color", "red");
			} 
			//otherwise remove error messages and allow submit
			else {
				$('p:contains("CVV")').remove();
			}
		}

	});
}


//CALL FUNCTIONS

otherJobRole();
tShirtColors();
activitySelection();
registrationFee();
paymentOption();
validateName();
validateEmail();
validateActivitySelection();
validateCreditcard();