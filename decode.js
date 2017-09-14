function decrypt(base64text, password) {
	return sjcl.decrypt(password, atob(base64text.replace(/\n/g, '')), {}, {})
}
function gibberish(base64text) {
	return JSON.parse(atob(encodedMessage.value.replace(/\n/g, '')))
		.ct
		.replace(/(.{80})/g, '$1\n');
}
var plaintext;
window.onload = function() {
	var decode = document.getElementById('decode');
	var password = document.getElementById('password');
	var encodedMessage = document.getElementById('encodedMessage');
	var message = document.getElementById('message');
	var errorMessage = document.getElementById('errorMessage');
	encodedMessage.focus();
	document.execCommand('paste');
	decode.onclick = function() {
		try {
			plaintext = decrypt(encodedMessage.value, password.value);
			message.innerHTML = plaintext
				.replace(/\n/g, '<br>')
				.replace(/ {2}/g, '&nbsp&nbsp');
			password.classList.remove('error');
			errorMessage.classList.add('hidden');
		} catch (e) {
			message.innerHTML = gibberish(encodedMessage.value);
			password.classList.add('error');
			errorMessage.classList.remove('hidden');
		}
	};
};