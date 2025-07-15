import { css, html, LitElement } from "lit";

class PaginationElement extends LitElement {
  static styles = css`
    .flex-centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pagination-container {
      padding-block: 1rem;
      width: 100%;
      gap: 0.75rem;
    }

    .pagination-container .page-numbers {
      gap: 0.5rem;
    }

    .pagination-container .page-numbers span {
      cursor: pointer;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.25rem;
      border-radius: 50%;
    }

    .pagination-container .page-numbers span.active {
      background-color: var(--color-primary);
      color: var(--color-white);
      font-weight: bold;
      font-size: 1.125rem;
    }

    .pagination-container .icon {
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--color-primary);
    }

    .pagination-container iconify-icon[aria-disabled="true"] {
      cursor: not-allowed;
      color: var(--color-font-muted);
    }
  `;

  static get properties() {
    return {
      /**
       * This defines how many page there will be
       */
      pageCount: { type: Number },
      /**
       * This is used to hold which page is currently active
       */
      currentPage: { type: Number },
      /**
       * This is used to create and hold page numbers
       */
      pageNumbers: { type: Array },
    };
  }

  handlePrevClick() {
    if (this.currentPage === 1) return;
    this.handlePageClick(this.currentPage - 1);
  }
  handleNextClick() {
    if (this.currentPage === this.pageCount) return;
    this.handlePageClick(this.currentPage + 1);
  }
  handlePageClick(pageNumber) {
    if (pageNumber === this.currentPage) return;

    this.currentPage = pageNumber;
    this.dispatchEvent(
      new CustomEvent("pagination-page-change", { detail: { value: this.currentPage }, bubbles: true, composed: true })
    );
  }

  // pageNumber < -1 means its an ellipsis item
  renderPageItem(pageNumber) {
    return pageNumber > 0
      ? html`
          <span
            class=${"flex-centered".concat(this.currentPage === pageNumber ? " active" : "")}
            @click=${() => this.handlePageClick(pageNumber)}
          >
            ${pageNumber}
          </span>
        `
      : html`<span>...</span>`;
  }

  getPageNumbers() {
    const pages = [this.renderPageItem(1)];
    const totalCount = this.pageCount ?? 1;
    const current = this.currentPage;
    const visiblePageNumbers = 5;
    const surroundingCount = 2;

    let startItem = 2;
    let endItem = Math.min(totalCount - 1, visiblePageNumbers);

    if (current > surroundingCount + 1) {
      startItem = Math.max(2, current - surroundingCount);
      endItem = Math.min(totalCount - 1, current + surroundingCount);
    }

    // adding an ellipsis to the right of currentPageItem conditionally
    if (startItem > surroundingCount && totalCount > visiblePageNumbers) {
      pages.push(this.renderPageItem(-1));
    }

    for (let i = startItem; i <= endItem; i++) {
      pages.push(this.renderPageItem(i));
    }

    // adding an ellipsis to the left of currentPageItem conditionally
    if (endItem < totalCount - 1) {
      pages.push(this.renderPageItem(-1));
    }

    // last item always will be visible if there are multiple pages
    if (totalCount > 1) {
      pages.push(this.renderPageItem(totalCount));
    }

    return pages;
  }

  render() {
    return html`
      <div class="flex-centered pagination-container">
        <iconify-icon
          aria-disabled=${this.currentPage === 1}
          class="icon"
          icon="ph:caret-left-bold"
          @click=${this.handlePrevClick}
        ></iconify-icon>
        <div class="flex-centered page-numbers">${this.getPageNumbers()}</div>
        <iconify-icon
          aria-disabled=${this.currentPage === this.pageCount}
          class="icon"
          icon="ph:caret-right-bold"
          @click=${this.handleNextClick}
        ></iconify-icon>
      </div>
    `;
  }
}

customElements.define("pagination-element", PaginationElement);
