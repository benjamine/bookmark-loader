var elements = document.getElementsByTagName('input');
var count = 0;
for (var i=0; i<elements.length; i++) {
	var element = elements[i];
	if (element.getAttribute('type') === 'password') {
		var name = element.getAttribute('name') || element.getAttribute('id');
		alert(name + ' value is ' + element.value);
		count++;
	}
}
if (!count) {
	alert('no passwords found on the page');
}
