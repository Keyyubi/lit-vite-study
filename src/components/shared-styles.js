import { css } from "lit";

export const sharedStyles = css`
  h1,
  h2 {
    color: var(--color-primary);
  }

  .container {
    max-width: 1280px;
    width: 92vw;
    height: auto;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .container .row {
    display: flex;
    flex-wrap: wrap;
  }

  .container .row .col {
    flex: 0 0 33.33%;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .container .row .col {
      flex: 0 0 100%;
      padding: 0.5rem 0;
    }

    .hide-on-mobile {
      display: none !important;
    }
  }
`;
