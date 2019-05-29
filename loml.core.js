var endpoint = 'https://www.jsonstore.io/c066b77f80c0cd4234630af51ba7242ad2067348e305bd53e94bb52f48268e17';

let fetchJSON = (thatURL) => {
	var request = new XMLHttpRequest();
	request.open('GET', thatURL, false);
	request.send(null);

	return request.responseText;
};

let pushJSON = (thatURL, data) => {
	let request = new XMLHttpRequest();
	request.open('POST', thatURL);
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.send(JSON.stringify(data));
}

let isValidURL = (thatURL) => {
    var aRegExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if(aRegExp.test(thatURL)) {
    	return true
    } else {
    	return false
    }
}

var thisHash = window.location.hash.substr(1);
if(window.location.hash != '') {
	var response = JSON.parse(fetchJSON(endpoint + "/" + thisHash));
	var thisURL = response.result;
	if(thisURL != null) {
		if(isValidURL(thisURL)) {
			window.location.href = thisURL;
		}
	}
}
