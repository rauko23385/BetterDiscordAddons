/**
 * @name Hide Nitro Upsell from chat boxes
 * @description Hides all upsell of Nitro in common used UI across the Discord.
 * @version 1.1
*/

module.exports = () => ({
  observer: null,

  start() {
    function hideElements() {
      // Store button link in Direct Messages
      const storeLinks = document.querySelectorAll('a[href="/store"]');
      storeLinks.forEach(link => {
        link.style.display = 'none';
      });

      // Gift button in message input box
      const giftButton = document.querySelector('button[aria-label="Send a gift"]');
      if (giftButton) {
        giftButton.style.display = 'none';
      }};
    }

    // Function to observe DOM mutations and reapply the hiding logic
    function observeDOM() {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };
      const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            hideElements();
          }
        }
      };

      this.observer = new MutationObserver(callback);
      this.observer.observe(targetNode, config);
    }

    hideElements();
    observeDOM();
  },

  stop() {
    // Disconnect the observer when the plugin is stopped
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});
