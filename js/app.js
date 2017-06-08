$('document').ready( function () {
	$('#name').focus(); //focuses on name input upon loading page
});


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
function revealPunColors () {
	$('option[value="cornflowerblue"]').show();
	$('option[value="darkslategrey"]').show();
	$('option[value="gold"]').show();
}

function hidePunColors () {
	$('option[value="cornflowerblue"]').hide();
	$('option[value="darkslategrey"]').hide();
	$('option[value="gold"]').hide();
}

function revealHeartColors () {
	$('option[value="tomato"]').show();
	$('option[value="steelblue"]').show();
	$('option[value="dimgrey"]').show();
}

function hideHeartColors () {
	$('option[value="tomato"]').hide();
	$('option[value="steelblue"]').hide();
	$('option[value="dimgrey"]').hide();
}

function addPickAColor () {
	$("#color").prepend('<option value="pickAColor" selected> Pick a Color </option>');
}

function addPickADesign () {
	$("#color").prepend('<option value="pickADesign" selected> <-- Pick a Design </option>');
}

function removePickAColor () {
	$('option[value="pickAColor"]').remove();
}

function removePickADesign () {
	$('option[value="pickADesign"]').remove();
}


function tShirtColors () {
	$("#color").children().hide();
	addPickADesign();
	$('#design').on('change', function () {
		removePickADesign();
		switch ( $(this).val() )  {
			case 'js puns': 
				removePickAColor();
				addPickAColor();
				revealPunColors();
				hideHeartColors();
				break;
			case 'heart js':
				removePickAColor();
				addPickAColor();
				hidePunColors();
				revealHeartColors();
				break;
			default :
				removePickAColor();
				addPickADesign();
				hidePunColors();
				hideHeartColors();


		}
});
}

otherJobRole();
tShirtColors();