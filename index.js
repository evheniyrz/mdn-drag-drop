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
    let currentItemList = Array.from(sourceContainer.children);

    const currentOverlappedElement = ev.target;

    if (currentOverlappedElement.parentElement === sourceContainer) {
      /**
       * ==================================================================
       * CHANGE THE POSITION OF A DRAGGED ELEMENT AT RUN TIME
       *
       * если индекс эл-та меньше индекса оверлапа и индекс оверлапа больше чем индекса драга +1, тогда:
       * - перетаскиваемы индексим в индекс оверлапа, а из сплайсеного массива элементов увеличиваем индекс на 1
       */
      const currentDraggableElementIndex = currentItemList.findIndex(
        (item) => item.id === currentDraggableElement.id
      );
      const overlappedElementIndex = currentItemList.findIndex(
        (item) => item.id === currentOverlappedElement.id
      );

      if (
        currentDraggableElementIndex - 1 === overlappedElementIndex ||
        currentDraggableElementIndex + 1 === overlappedElementIndex
      ) {
        /**============================================================================= */
        currentItemList[overlappedElementIndex] = currentDraggableElement;
        currentItemList[currentDraggableElementIndex] =
          currentOverlappedElement;
        /**=========================================================================== */
      } else if (currentDraggableElementIndex + 1 < overlappedElementIndex) {
        /**============================================================================= */
        for (
          let index = currentDraggableElementIndex;
          index <= overlappedElementIndex;
          index++
        ) {
          if (index !== overlappedElementIndex) {
            currentItemList[index] = currentItemList[index + 1];
          } else {
            currentItemList[index] = currentDraggableElement;
          }
        }
        /**============================================================================== */
      } else {
        /**============================================================================== */
        for (
          let index = currentDraggableElementIndex;
          index >= overlappedElementIndex;
          index--
        ) {
          if (index !== overlappedElementIndex) {
            currentItemList[index] = currentItemList[index - 1];
          } else {
            currentItemList[index] = currentDraggableElement;
          }
        }
        /**=============================================================================== */
      }

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
