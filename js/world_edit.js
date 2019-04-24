worldW = 30;
worldH = 15;
var world = []
selectedTool = "0";

for (h = 0; h<worldH; h++) {
	for (w=0; w<worldW; w++) {
		var unit = document.createElement("input");
		unit.setAttribute("type", "image");
		unit.setAttribute("src", "images/world_edit/0.png");
		unit.setAttribute("name", "0");
		unit.setAttribute("id", w+" "+h);
		unit.setAttribute("class", "filler");
		document.body.appendChild(unit);
		
	}
	var br = document.createElement("br");
	document.body.appendChild(br);

}



document.body.onclick = function(e) {  
    if (window.event) {
        e = event.srcElement;           
    }
    else {
        e = e.target;                 
    }

    if (e.className && e.className.indexOf('filler') != -1) {
        e.setAttribute("src", "images/world_edit/" + selectedTool + ".png");
    	e.setAttribute("name", selectedTool);
    }

    if (e.className && e.className.indexOf('tool') != -1) { 
    	selectedTool = e.getAttribute("id");
    }
}

for (e = 1; e<23; e++) {
	var unit = document.createElement("input");
		unit.setAttribute("type", "image");
		unit.setAttribute("src", "images/world_edit/" + e + ",png");
		unit.setAttribute("class", "tool");
		// document.getElementsByClassName("toolBox")
}

window.onload = init;

  function init(){
  	for (e = 1; e<23; e++) {
		var unit = document.createElement("input");
		unit.setAttribute("type", "image");
		unit.setAttribute("src", "images/world_edit/" + e + ".png");
		unit.setAttribute("class", "tool");
		unit.setAttribute("id", e);
		document.getElementById("toolBox").appendChild(unit);
	}

	document.getElementById("export").onclick = function() {
		var out = document.getElementById("outputField")
		out.innerHTML = "background = ["
		for (h = 0; h<worldH; h++) {
			row = []
			for (w=0; w<worldW; w++) {
				row.push(document.getElementById(w+" "+h).getAttribute("name"))
			}
			out.innerHTML += "\n ["+row+"],"

		}
		out.innerHTML += "\n]"
	}
  }

