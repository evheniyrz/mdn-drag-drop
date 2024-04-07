window.addEventListener('DOMContentLoaded', function (event) {
	console.log('DOMContentLoaded');
	const sourceContainer = document.getElementById('sourceContainer');
	const targetContainer = document.getElementById('targetContainer');

	const itemCollection = sourceContainer.children;

	for (const key in itemCollection) {
		if (Object.hasOwnProperty.call(itemCollection, key)) {
			const element = itemCollection[key];

			element.id = `${element.className}-${key}`;
			element.addEventListener('dragstart', function (ev) {
				// ev.preventDefault();
				console.log('Drag Start', { ev, trg: ev.target, itemCollection });
				ev.dataTransfer.setData("application/my-app", ev.target.id);
				ev.dataTransfer.effectAllowed = "move";

			})
		}
	}
	// sourceContainer

	targetContainer.addEventListener('dragover', function (ev) {
		ev.preventDefault();
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
		console.log('DragOver==>', { ev });

	})

	targetContainer.addEventListener('drop', function (ev) {
		ev.preventDefault();
		// ev.dataTransfer.clearData();
		// ev.dataTransfer.setData('application/x-moz-node', ev.target)
		const data = ev.dataTransfer.getData("application/my-app");
		ev.target.appendChild(document.getElementById(data));
		console.log('Drop', { ev, data });
		// ev.target.appendChild(data);

	})
})