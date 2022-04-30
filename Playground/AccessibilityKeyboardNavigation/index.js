(function addAccessibilityKeyboardNavigation() {
  const ELEMENTS_OF_TYPE = {
    Header: ["H1", "H2", "H3", "H4", "H5", "H6"],
    Link: ["A"],
    Input: ["INPUT", "TEXTAREA", "SELECT"],
  };

  const KEY_CODES = {
    H: 72,
    L: 76,
    M: 77,
    ArrowUp: 38,
    ArrowDown: 40,
  };

  const DIRECTION = {
    Up: -1,
    Down: 1,
  };

  let state = {
    direction: DIRECTION.Down,
    selectedElement: {
      element: null,
      initialStyling: null,
    },
  };

  return subscribeToKeyboardEvents();

  function subscribeToKeyboardEvents() {
    document.addEventListener("keydown", onKeyDown);
    return unsubscribeFromKeyboardEvents;
  }

  function unsubscribeFromKeyboardEvents() {
    document.removeEventListener("keydown", onKeyDown);
  }

  function onKeyDown(event) {
    if (isActiveElementInput()) {
      return;
    }

    switch (event.keyCode) {
      case KEY_CODES.H:
        moveToNextElementOfTypes(ELEMENTS_OF_TYPE.Header);
        break;
      case KEY_CODES.L:
        moveToNextElementOfTypes(ELEMENTS_OF_TYPE.Link);
        break;
      case KEY_CODES.M:
        console.log("M");
        break;
      case KEY_CODES.ArrowUp:
        state.direction = DIRECTION.Up;
        break;
      case KEY_CODES.ArrowDown:
        state.direction = DIRECTION.Down;
        break;
    }
  }

  function isActiveElementInput() {
    return ELEMENTS_OF_TYPE.Input.includes(document.activeElement?.tagName);
  }

  function moveToNextElementOfTypes(types) {
    const elements = getListOfAllElementsOfTypes(types, document.body);
    if (!elements.length) {
      resetSelectedElement();
      return;
    }

    const indexOfActiveElement = elements.indexOf(
      state.selectedElement.element
    );
    let indexOfNextActiveElement = indexOfActiveElement + state.direction;

    if (indexOfNextActiveElement < 0) {
      indexOfNextActiveElement = 0;
    }
    if (indexOfNextActiveElement >= elements.length) {
      indexOfNextActiveElement = elements.length - 1;
    }

    resetSelectedElement();
    setSelectedElement(elements[indexOfNextActiveElement]);
  }

  function getListOfAllElementsOfTypes(types, parentNode) {
    if (isElementHidden(parentNode)) {
      return [];
    }

    const isParentTypeInTypes = types.includes(parentNode.tagName);
    const result = isParentTypeInTypes ? [parentNode] : [];

    if (!parentNode?.children?.length) {
      return result;
    }

    const children = Array.from(parentNode.children).reduce((acc, child) => {
      const children = getListOfAllElementsOfTypes(types, child);
      return [...acc, ...children];
    }, []);

    return [...result, ...children];
  }

  function isElementHidden(element) {
    if (!element) {
      return true;
    }

    const styles = getComputedStyle(element);
    return (
      styles.display === "none" ||
      styles.visibility === "hidden" ||
      element.hidden
    );
  }

  function resetSelectedElement() {
    if (state.selectedElement.element) {
      state.selectedElement.element.style =
        state.selectedElement.initialStyling;
    }

    state.selectedElement = {
      element: null,
      initialStyling: null,
    };
  }

  function setSelectedElement(element) {
    if (!element) {
      return;
    }

    state.selectedElement = {
      element,
      initialStyling: element.style,
    };

    element.setAttribute("style", "border: 3px solid black !important");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    element.focus();
  }
})();
