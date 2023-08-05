export default class Common {
  constructor() {
    this.init();
  }

  DOMReady() {
    this.teste();

    /**
  Toggles the necessary aria- attributes' values on the accordion panels
  and handles to show or hide them.
  @param {HTMLElement} element The tab that acts as the handles.
  @param {Boolean} show Whether to show or hide the accordion panel.
*/
    function toggleExpanded(element, show) {
      var target = document.getElementById(
        element.getAttribute("aria-controls")
      );

      if (target) {
        element.setAttribute("aria-expanded", show);
        target.setAttribute("aria-hidden", !show);
      }
    }

    /**
    Attaches event listeners for the accordion open and close click events.
    @param {HTMLElement} accordionContainer The accordion container element.
  */
    function setupAccordion(accordionContainer) {
      // Finds any open panels within the container and closes them.
      function closeAllPanels() {
        var openPanels = accordionContainer.querySelectorAll(
          "[aria-expanded=true]"
        );

        for (var i = 0, l = openPanels.length; i < l; i++) {
          toggleExpanded(openPanels[i], false);
        }
      }

      // Set up an event listener on the container so that panels can be added
      // and removed and events do not need to be managed separately.
      accordionContainer.addEventListener("click", function (event) {
        var target = event.target;

        if (target.closest) {
          target = target.closest('[class*="p-accordion__tab"]');
        }

        if (target) {
          var isTargetOpen = target.getAttribute("aria-expanded") === "true";
          closeAllPanels();

          // Toggle visibility of the target panel.
          toggleExpanded(target, !isTargetOpen);
        }
      });
    }

    // Setup all accordions on the page.
    var accordions = document.querySelectorAll(".p-accordion");

    for (var i = 0, l = accordions.length; i < l; i++) {
      setupAccordion(accordions[i]);
    }
  }

  teste() {

(function () {

    var currentDialog = null;
    var lastFocus = null;
    var ignoreFocusChanges = false;
    var focusAfterClose = null;
  

    function trapFocus(event) {
      if (ignoreFocusChanges) return;
  
      if (currentDialog.contains(event.target)) {
        lastFocus = event.target;
      } else {
        focusFirstDescendant(currentDialog);
        if (lastFocus == document.activeElement) {
          focusLastDescendant(currentDialog);
        }
        lastFocus = document.activeElement;
      }
    }
  

    function attemptFocus(child) {
      if (child.focus) {
        ignoreFocusChanges = true;
        child.focus();
        ignoreFocusChanges = false;
        return document.activeElement === child;
      }
  
      return false;
    }
  
   
    function focusFirstDescendant(element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    }
  
  
    function focusLastDescendant(element) {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    }
  

    function toggleModal(modal, sourceEl, open) {
      if (modal && modal.classList.contains('p-modal')) {
        if (typeof open === 'undefined') {
          open = modal.style.display === 'none';
        }
  
        if (open) {
          currentDialog = modal;
          modal.style.display = 'flex';
          focusFirstDescendant(modal);
          focusAfterClose = sourceEl;
          document.addEventListener('focus', trapFocus, true);
        } else {
          modal.style.display = 'none';
          if (focusAfterClose && focusAfterClose.focus) {
            focusAfterClose.focus();
          }
          document.removeEventListener('focus', trapFocus, true);
          currentDialog = null;
        }
      }
    }
  
    
    function closeModals() {
      var modals = [].slice.apply(document.querySelectorAll('.p-modal'));
      modals.forEach(function (modal) {
        toggleModal(modal, false, false);
      });
    }
  
    
    document.addEventListener('click', function (event) {
      var targetControls = event.target.getAttribute('aria-controls');
      if (targetControls) {
        toggleModal(document.getElementById(targetControls), event.target);
      }
    });
  
   
    document.addEventListener('keydown', function (e) {
      e = e || window.event;
  
      if (e.code === 'Escape') {
        closeModals();
      } else if (e.keyCode === 27) {
        closeModals();
      }
    });
  
    
    toggleModal(document.querySelector('#modal'), document.querySelector('[aria-controls=modal]'), false);
  })();
  }

  init() {
    this.DOMReady();
  }
}
