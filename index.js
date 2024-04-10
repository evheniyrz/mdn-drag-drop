window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOMContentLoaded");
  const sourceContainer = document.getElementById("sourceContainer");
  const targetContainer = document.getElementById("targetContainer");

  const itemCollection = sourceContainer.children;



  for (const key in itemCollection) {
    if (Object.hasOwnProperty.call(itemCollection, key)) {
      const element = itemCollection[key];

      element.id = `${element.className}-${key}`;
    }
  }

  sourceContainer.addEventListener("dragstart", dragStartHandler);
  sourceContainer.addEventListener("dragover", dragOverSort);
  sourceContainer.addEventListener("dragend", dragEndHandler);
  sourceContainer.addEventListener("drop", dropHandler);

  targetContainer.addEventListener("dragstart", dragStartHandler);
  targetContainer.addEventListener("dragover", dragOverSort);
  targetContainer.addEventListener("dragend", dragEndHandler);
  targetContainer.addEventListener("drop", dropHandler);
});

function dragStartHandler(ev) {

  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.clearData();
  ev.dataTransfer.setData('text', ev.target.id)

  /**====================== SETUP PLACEHOLDER ======================================= */
  const timeId = setTimeout(() => {
    ev.target.classList.add("dragging");
    clearTimeout(timeId);
  }, 0);
}

function dropHandler(ev) {
  ev.preventDefault();


  if (ev.target === this) {
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    if (!Array.from(this.children).some(item => item === draggedElement)) {
      draggedElement.classList.remove('dragging');
      this.appendChild(draggedElement);
      ev.dataTransfer.clearData();
    }
  }
}

function dragOverSort(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";

  let currentItemList = Array.from(this.children);
  console.log('DRAGOVER THIS', this);
  const currentOverlappedElement = ev.target;

  if (currentOverlappedElement.parentElement === this) {
    const currentDraggableElement = this.querySelector('.dragging');
    const currentDraggableElementIndex = currentItemList.findIndex(
      (item) => item.id === currentDraggableElement.id
    );

    const overlappedElementIndex = currentItemList.findIndex(
      (item) => item.id === currentOverlappedElement.id
    );
    /**============================ CONFIGURING DRAG AND DROP SORTING ================ */
    /**======================  LEFT | RIGHT && TOP | BOTTOM SIBLINGS ================= */
    if (
      currentDraggableElementIndex - 1 === overlappedElementIndex ||
      currentDraggableElementIndex + 1 === overlappedElementIndex
    ) {
      currentItemList[overlappedElementIndex] = currentDraggableElement;
      currentItemList[currentDraggableElementIndex] =
        currentOverlappedElement;
      /**============================== MULTILINE DRAGGING =========================== */
      /**============================== FROM LEFT TO RIGHT || TOP TO BOTTOM ========== */
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
      /**============================== FROM RIGHT TO LEFT || BOTTOM TO TOP ========== */
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

    this.replaceChildren(...currentItemList);
  }
}

function dragEndHandler(ev) {
  ev.preventDefault();
  this.querySelector('.dragging')?.classList.remove("dragging");
  console.log('DRAG END DATA', { d: ev.dataTransfer.getData('text') })
}