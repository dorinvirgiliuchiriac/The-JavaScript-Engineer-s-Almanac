(function addAccessibilityKeyboardNavigation() {
  const ELEMENT_TYPES = {
    Headers: "Headers",
    Links: "Links",
    Landmarks: "Landmarks",
  };

  const ELEMENTS_OF_TYPE = {
    Header: ["H1", "H2", "H3", "H4", "H5", "H6"],
    Link: ["A"],
    Input: ["INPUT", "TEXTAREA", "SELECT"],
    SkipSomeLandmarkChecksForChildrenOf: [
      "ARTICLE",
      "ASIDE",
      "MAIN",
      "NAV",
      "SECTION",
    ],
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
    elementType: null,
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
        const headers = getListOfAllElementsOfTypes(
          ELEMENTS_OF_TYPE.Header,
          document.body
        );
        moveToNextElement(headers, ELEMENT_TYPES.Headers);
        break;
      case KEY_CODES.L:
        const links = getListOfAllElementsOfTypes(
          ELEMENTS_OF_TYPE.Link,
          document.body
        );
        moveToNextElement(links, ELEMENT_TYPES.Links);
        break;
      case KEY_CODES.M:
        const landmarks = getListOfAllLandmarks(document.body);
        moveToNextElement(landmarks, ELEMENT_TYPES.Landmarks);
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

  function getListOfAllElementsOfTypes(types, node) {
    if (isElementHidden(node)) {
      return [];
    }

    const isNodeTypeInTypes = types.includes(node.tagName);
    const result = isNodeTypeInTypes ? [node] : [];

    if (!node?.children?.length) {
      return result;
    }

    const children = Array.from(node.children).reduce((acc, child) => {
      const children = getListOfAllElementsOfTypes(types, child);
      return [...acc, ...children];
    }, []);

    return [...result, ...children];
  }

  function getListOfAllLandmarks(node, skipSomeLandmarkChecks = false) {
    if (isElementHidden(node)) {
      return [];
    }

    const isLandmark = isNodeLandmark(node, skipSomeLandmarkChecks);
    const result = isLandmark ? [node] : [];

    if (!node?.children?.length) {
      return result;
    }

    const skipSomeLandmarkChecksForChildren =
      ELEMENTS_OF_TYPE.SkipSomeLandmarkChecksForChildrenOf.includes(
        node.tagName
      );

    const children = Array.from(node.children).reduce((acc, child) => {
      const children = getListOfAllLandmarks(
        child,
        skipSomeLandmarkChecks || skipSomeLandmarkChecksForChildren
      );
      return [...acc, ...children];
    }, []);

    return [...result, ...children];
  }

  function isNodeLandmark(node, skipSomeChecks) {
    let result =
      isFormLandmark(node) ||
      isNavigationLandmark(node) ||
      isRegionLandmark(node) ||
      isSearchLandmark(node);

    if (!result && !skipSomeChecks) {
      result =
        isBannerLandmark(node) ||
        isComplementaryLandmark(node) ||
        isContentinfoLandmark(node) ||
        isMainLandmark(node);
    }

    return result;
  }

  function isFormLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "FORM" || node.getAttribute("role") === "form") &&
      hasAriaLabel(node)
    );
  }

  function isNavigationLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "NAV" || node.getAttribute("role") === "navigation")
    );
  }

  function isRegionLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "SECTION" || node.getAttribute("role") === "region") &&
      hasAriaLabel(node)
    );
  }

  function isSearchLandmark(node) {
    return Boolean(node) && node.getAttribute("role") === "search";
  }

  function isBannerLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "HEADER" || node.getAttribute("role") === "banner")
    );
  }

  function isComplementaryLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "ASIDE" ||
        node.getAttribute("role") === "complementary")
    );
  }

  function isContentinfoLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "FOOTER" || node.getAttribute("role") === "contentinfo")
    );
  }

  function isMainLandmark(node) {
    return (
      Boolean(node) &&
      (node.tagName === "MAIN" || node.getAttribute("role") === "main")
    );
  }

  function hasAriaLabel(node) {
    return (
      Boolean(node.getAttribute("aria-labelledby")) ||
      Boolean(node.getAttribute("aria-label")) ||
      Boolean(node.getAttribute("title"))
    );
  }

  function moveToNextElement(elements, elementType) {
    updateDirection(elementType);

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

  function updateDirection(elementType) {
    if (state.elementType !== elementType) {
      state.elementType = elementType;
      state.direction = DIRECTION.Down;
    }
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

    element.setAttribute(
      "style",
      ` border: 4px solid black !important; 
        background-color: #fece6d !important; 
        color: black !important;
        box-sizing: border-box !important;`
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    element.focus();
  }
})();
