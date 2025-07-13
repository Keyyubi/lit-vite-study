import { css } from "lit";

export const sharedStyles = css`
  h1,
  h2 {
    color: var(--color-primary);
  }

  .container {
    width: 92vw;
    height: auto;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .container .row {
    width: 100%;
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
  }
`;
