import { css } from "lit";

export const sharedStyles = css`
  h1,
  h2 {
    color: var(--color-primary);
    font-weight: 600;
  }

  .container {
    max-width: 1280px;
    width: 92vw;
    height: auto;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .row:has(.col) {
    gap: 5%;
  }

  .row .col {
    padding-inline: 0.5rem;
    flex: 0 0 30%;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  .card {
    background-color: var(--color-white);
    padding: 1rem;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  }

  .icon {
    font-size: 1rem;
    color: var(--color-primary);
  }

  .icon.passive {
    color: var(--color-primary-light);
  }

  iconify-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .row .col {
      flex: 0 0 100%;
      padding: 0.5rem 0;
    }

    .hide-on-mobile {
      display: none !important;
    }
  }
`;
