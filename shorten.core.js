let element = (id) => { return document.getElementById(id) };

let createHash = () => {
	let result = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for(let i = 0; i < 6; i++) {
		result += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return result;
}

let createLink = () => {
    if (!element('customHash') || element('customHash').value == '') {
		window.location.hash = createHash();
        checkIsUnique();
    } else {
        window.location.hash = element('customHash').value;
    }
};

let checkIsUnique = () => {
	let thisURL = window.location.hash.substr(1);
	let response = JSON.parse(fetchJSON(endpoint + '/' + thisURL));
	let thisData = response.result;

	if(thisData != null) { createLink() }
};

let checkIsUniqueCustom = () => {
	element('statusBox').innerHTML = '';

	let customVal = element('customHash').value;
	let response = JSON.parse(fetchJSON(endpoint + '/' + customVal));
	let results = response.result;

	if(results != null) { return false }
	else if(results == null) { return true }
}

let sendRequest = (thatURL) => {
	let thisURL = thatURL; // Stored for later...
	let address = endpoint + '/' + window.location.hash.substr(1);

	pushJSON(address, thisURL);

	element('shortURL').value = window.location.origin + '/' + window.location.hash;
	element('statusBox').innerHTML = '<span class="text-success">Short URL Created!</span>';
};

let shortURL = () => {
	let currentURL = element('longURL').value;
	let uRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
	let cRegExp = /^([a-zA-Z0-9 _-]+)$/;
	let isAValidURL = uRegExp.test(currentURL);

	if(!isAValidURL) {
		element('statusBox').innerHTML = '<span class="text-danger">Not a valid URL!</span>';
	} else {
		element('statusBox').innerHTML = '';
		if(!element('customHash') || element('customHash').value == '') {
			createLink();
			sendRequest(currentURL);
		} else {
			if(cRegExp.test(element('customHash').value)) {
				if(checkIsUniqueCustom()) {
					element('statusBox').innerHTML = '<span class="text-primary">URL is available!</span>';
					createLink();
					sendRequest(currentURL);
				} else {
					element('statusBox').innerHTML = '<span class="text-danger">URL is already used!</span>';
					element('customHash').value = '';
				}
			} else {
				element('statusBox').innerHTML = '<span class="text-danger">Invalid custom URL! Only Numbers and Letters allowed!</span>';
				element('customHash').value = '';
			}
		}
	}
}let createShort = () => {
    if (!document.getElementById('customHash') || document.getElementById('customHash').value == '') {
        window.location.hash = createHash();
        checkIsUnique();
    } else {
        window.location.hash = document.getElementById('customHash').value;
    }
};
