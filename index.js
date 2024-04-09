window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOMContentLoaded");
  const sourceContainer = document.getElementById("sourceContainer");
  const targetContainer = document.getElementById("targetContainer");

  const itemCollection = sourceContainer.children;

  let currentDraggableElement = null;

  for (const key in itemCollection) {
    if (Object.hasOwnProperty.call(itemCollection, key)) {
      const element = itemCollection[key];

      element.id = `${element.className}-${key}`;
    }
  }
  sourceContainer.addEventListener("dragstart", function (ev) {
    currentDraggableElement = null;
    // ev.dataTransfer.clearData();
    // ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
    currentDraggableElement = ev.target;
    const timeId = setTimeout(() => {
      ev.target.classList.add("placeholder");
      clearTimeout(timeId);
    }, 0);
  });

  sourceContainer.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    const currentItemList = Array.from(sourceContainer.children);

    const currentOverlappedElement = ev.target;

    if (currentOverlappedElement.parentElement === sourceContainer) {
      console.log(
        "%c DRAG OVER==> ",
        "color:red;font-weight:bold;background:white",
        {
          currentOverlappedElement,
          currentDraggableElement,
        }
      );
      /**
       * itemList
       * replace elements by index
       * {
       * 0: currentTarget,
       * 1: sibling1,
       * 2: sibling2,
       * 3: sibling3,
       * 4: sibling4,
       * }
       * replace current element index with currentOverlapedElementIndex
       *
       */
      const draggableIndexForOverlapped = currentItemList.findIndex(
        (item) => item.id === currentDraggableElement.id
      );
      const overlappedIndexForDraggable = currentItemList.findIndex(
        (item) => item.id === currentOverlappedElement.id
      );
      currentItemList[overlappedIndexForDraggable] = currentDraggableElement;
      currentItemList[draggableIndexForOverlapped] = currentOverlappedElement;

      sourceContainer.replaceChildren(...currentItemList);
    }
  });

  sourceContainer.addEventListener("dragend", function (ev) {
    ev.preventDefault();
    currentDraggableElement?.classList.remove("placeholder");
  });

  sourceContainer.addEventListener("drop", function (ev) {
    ev.preventDefault();
  });

  //   targetContainer.addEventListener("dragover", function (ev) {
  //     ev.preventDefault();
  //     ev.dataTransfer.dropEffect = "move";
  //     console.log("DragOver==>", { ev });
  //   });

  //   targetContainer.addEventListener("drop", function (ev) {
  //     ev.preventDefault();
  //     // ev.dataTransfer.clearData();
  //     // ev.dataTransfer.setData('application/x-moz-node', ev.target)
  //     const data = ev.dataTransfer.getData("application/my-app");
  //     ev.target.appendChild(document.getElementById(data));
  //     console.log("Drop", { ev, data });
  //     // ev.target.appendChild(data);
  //   });
});
//   sourceContainer.insertBefore(
//     currentDraggableElement,
//     currentOverlapElement
//   );
