$(document).ready(function() {

	$('.warning').hide();
	function focus() {
		$('input').focus();
	}
	focus();
	$(document).click(function() {
		focus();
	});

	function insert(param) {
		$('.onScreen').append('<p>&gt; ' + param + '</p>');
	}
	function padding() {
		$('.onScreen').append('<br/>');
	}
	function getVal() {
		var value = $('input').val();
		return value;
	}
	function removeTags(text) {
		text = text.replace(/<+/, "");
		text = text.replace(/>+/, "");
		return text;
	}

	var command;
	var string;
	var stringBasic;
	var currDir;
	var helpCount = 0;

	$(document).keydown(function(event) {
		if (event.which == 13) {
			var value = getVal();
			var value = removeTags(value);
			$('input').val(null);
			var current = value.split(" ");
			command = current[0].toLowerCase();
			string = current.slice(1, current.length).toString();
			string = string.replace(/,/g , " ");
			
			stringBasic = string.replace(/\s+/g, "").toLowerCase();
			commands(command);
			padding();
		}
	});

	function commands(currentCommand) {
		switch (currentCommand) {
// CLS
			case "clear":
				$('.onScreen').empty();
				break;
// HELP
			case "help":
				switch (string.toLowerCase()) {
	// HELP CD					
					case "cd":
						pageList();
						insert("Current directories are: " + allDir.toString().replace(/,/g , ", "));
						console.log(allDir);
						break;
	// HELP CLS
					case "clear":
						insert("Clears all of the current information on the screen. Any current variables or information is saved.");
						break;
	// HELP HELP
					case "help":
						helpCount++;
							if (helpCount === 1) {
								insert("...Really?");
							}
							else if (helpCount === 2) {
								insert("You're really going to keep trying this?");
							}
							else if (helpCount >= 3) {
								insert("Fuck You");
							}
						break;
	// HELP ECHO
						case "echo":
							insert("Prints current string to screen minus the echo command");
							break;
	// HELP DEFAULT
					case "":
						for (var key in commandList) {
							insert(key + ": " + commandList[key]);
						}
						break;
					default:
						insert("\"" + string + "\"" + " is not a recognised command.")
				}
// ECHO
			case "echo":
				insert(string);
				break;
// CD
			case "cd":
				if (pages[stringBasic] == undefined) {
					insert("\"" + string + "\"" + " is not a recognised directory.")
				}
				else {
					insert(pages[stringBasic]);
				}
				break;
// WHAT IS LOVE?
			case "what":
				if (stringBasic == "islove" || stringBasic == "islove?") {
					insert("Baby don't hurt me, don't hurt me, no more.")
				};
				break;
// DEFAULT
			default:
				insert("\"" + command + "\"" + " is not a recognised command.");
		}
	}

	var allDir = [];

	function pageList() {
		for (var key in pages) {
			allDir.push(key);
		}
	}

	pages = {
		about: "This site was made by Jack Hillman",
		emailme: "Email me at <a href=mailto:email@jackhillman.com.au>email@jack.hillman.com.au</a>"
	}

	commandList = {
		"clear": "Clears the screen", 
		"echo (text)": "Prints text to the screen",
		"cd (dir)": "Change current directory", 
		"help": "Shows help menu",
		"help (command)": "Shows command specific help"
	}

});