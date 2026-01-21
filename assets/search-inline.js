import { Component } from '@theme/component';

/**
 * Search inline component that provides a visible search input in the header
 * @extends {Component}
 */
export class SearchInline extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  /**
   * Setup event listeners for the search input
   */
  setupEventListeners() {
    const input = /** @type {HTMLInputElement} */ (this.querySelector('[data-search-input]'));
    const button = this.querySelector('[type="submit"]');

    if (!input) return;

    // Handle button click
    button?.addEventListener('click', (e) => {
      e.preventDefault();
      this.performSearch(input.value);
    });

    // Handle Enter key
    input.addEventListener('keydown', (e) => {
      const keyboardEvent = /** @type {KeyboardEvent} */ (e);
      if (keyboardEvent.key === 'Enter') {
        e.preventDefault();
        this.performSearch(input.value);
      }
    });
  }

  /**
   * Perform search action
   * @param {string} query - The search query
   */
  performSearch(query) {
    if (!query.trim()) return;

    // Navigate to search page with query
    const searchUrl = window.Theme?.routes?.search_url || '/search';
    window.location.href = `${searchUrl}?q=${encodeURIComponent(query)}`;
  }
}

// Register the component
customElements.define('search-inline', SearchInline);
