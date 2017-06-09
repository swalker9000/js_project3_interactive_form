$('document').ready( function () {
	$('#name').focus(); //focuses on name input upon loading page
});

//variables
//var fee = 0; 


//reveals/hides custom input for Job Role
function otherJobRole () {
	//prevents duplicate id = "other-title" tags from appending
	$("#other-title").remove();
	//Adds text field when 'other' job option is chosen
	$('#title').on('change', function () {
		if( $(this).val() == 'other') {
			$('fieldset:first-child').append('<input type="text">');
			$('input:last-child').attr("id", "other-title").attr("placeholder", "Your Job Role");
		} else {
			//if 'other' choice is chosen and then changed - removes text input field
			$("#other-title").remove();
		}
	});
}

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
	$("#color").children().hide();
	//prompts user to pick a design
	pickPrompt("pickADesign", "Design");
	// When design is chosen then display cooresponding t-shirt color options					
	$('#design').on('change', function () {
		removePrompt("pickADesign");
		switch ( $(this).val() )  {
			case 'js puns': 
				removePrompt("pickAColor"); //prevents duplicate pick a color options from being created
				pickPrompt("pickAColor", "Color");	//prompts user to pick a specified color
				revealColors("cornflowerblue", "darkslategrey", "gold");
				hideColors("tomato", "steelblue", "dimgrey");
				break;
			case 'heart js':
				removePrompt("pickAColor");//prevents duplicate pick a color options from being created
				pickPrompt("pickAColor", "Color");	//prompts user to pick a specified color
				hideColors("cornflowerblue", "darkslategrey", "gold");
				revealColors("tomato", "steelblue", "dimgrey");
				break;
			default :
				removePrompt("pickAColor"); //prevents duplicate pick a color options from being created
				pickPrompt("pickADesign", "Design");	//prompts user to pick a design
				hideColors("cornflowerblue", "darkslategrey", "gold");
				hideColors("tomato", "steelblue", "dimgrey");
		}
	});
}

//disables activities with conflicting times

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



function registrationFee () {
	$(':checkbox').parent().not("label:first-of-type").val(100);
	$(':checkbox').parent().first().val(200);
	$(':checkbox').on('change', function() {
		$('#registrationFee').remove();
		if( $(":checkbox:checked")) {
			$('.activities').append("<div id='registrationFee'><h3>Total: $<span id='span'></span> </h3></div>");
		}
		// if ($('input[type="checkbox"]').checked ) {
		// 	$('#span').val( function add () {
		// 		var	sum = 0;
		// 		  $(":checkbox:checked").each(function() {
  //   			  sum += ~~$(this).val();
  // 		});
  // 				$('#span').text(sum);
		// 	})
		// }
		console.log( "checked");
	});
}

//Payment Options

function paymentOption () {
	//hides text information as default
	$('fieldset p').hide();
	// When design is chosen then display cooresponding t-shirt color options					
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




otherJobRole();
tShirtColors();
activitySelection();
registrationFee();
paymentOption();