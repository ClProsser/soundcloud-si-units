function applyFilter(event) {
	if (event.relatedNode.classList.contains("SIvalid")) return;

	const patterns = {
		"en": [/([0-9]+) year(s?)/g, /([0-9]+) month(s?)/g, /([0-9]+) day(s?)/g, /([0-9]+) hour(s?)/g, /([0-9]+) minute(s?)/g],
		"de": [/([0-9]+) Jahr(e?n?)/g, /([0-9]+) Monat(e?n?)/g, /([0-9]+) Tag(e?n?)/g, /([0-9]+) Stunde(n?)/g, /([0-9]+) Minute(n?)/g]
	};
	const lang = patterns[document.documentElement.lang];

	let commentBoxes = document.getElementsByClassName("relativeTime");
	for (let i = 0; i < commentBoxes.length; i++) {
		let elem = commentBoxes[i];
		if (elem.classList.contains("SIvalid")) continue; //already processed

		elem.classList.add("SIvalid"); //add flag

		const date = new Date(elem.getAttribute("datetime"));
		const currentDate = new Date();
		const diffSeconds = (currentDate.getTime() - date.getTime()) / 1000;

		let result = diffSeconds.toFixed(2) + "s";
		if (diffSeconds > 300) result = (diffSeconds / 1000).toFixed(2) + "ks";
		if (diffSeconds >= 100000) result = (diffSeconds / 1000000).toFixed(2) + "Ms"; //>= 0.1Ms should have Ms

		lang.forEach(pattern => {
			elem.innerHTML = elem.innerHTML.replace(pattern, result);
		});
	};
}

//Start our watcher
document.addEventListener('DOMNodeInserted', applyFilter);