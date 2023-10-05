function openModal(text) {
	var modal = document.getElementById("myModal");
	var modal_content = modal.getElementsByClassName("modal-content");
	var p = modal_content[0].getElementsByTagName("p")[0];
	console.log(p);
	p.innerHTML = text;
	modal.style.display = "block";
}

function closeModal(id) {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}


function openButtonHint(hint) {
	var button_hint_parent = document.getElementById("button_hint_parent");
	button_hint_parent.style.display = "block";
	var button_hint_p = document.getElementById('button_hint_p');
	button_hint_p.innerHTML = hint;
}


function closeButtonHint() {
	var button_hint_parent = document.getElementById("button_hint_parent");
	button_hint_parent.style.display = "none"
}
