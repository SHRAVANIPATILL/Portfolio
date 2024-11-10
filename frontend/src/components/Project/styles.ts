import styled from "styled-components";

export const Container = styled.section`
  margin-top: 15rem;
  
  h2 {
    text-align: center;
    font-size: 4rem;
    margin-bottom: 3rem;
  }
  
  .projects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
    padding: 1rem;
    overflow: hidden;

    .project {
      padding: 2rem 1.8rem;
      background-color: #2b2b2b;
      border-radius: 1.2rem;
      transition: 0.25s;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: #FFF;
      &:hover {
        transform: translateY(-5px);
        background-color: var(--pink);
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--blue);
        margin-bottom: 3.6rem;
        .project-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        a > img {
          width: 5.0rem;
        }
      }
      
      h3 {
        margin-bottom: 2rem;
      }

      p {
        letter-spacing: 0.12rem;
        margin-bottom: 2rem;
        max-height: 100px;  /* Default height of the description */
        overflow: hidden;   /* Hide the extra content */
        text-overflow: ellipsis; /* Add ellipsis when content overflows */
        transition: max-height 0.3s ease; /* Smooth transition for expanding */

        &.expanded {
          max-height: none; /* Remove max-height restriction when expanded */
        }
        
        a {
          color: #FFFF;
          border-bottom: 1px solid var(--green);
          transition: color 0.25s;
          &:hover {
            color: var(--green);
          }
        }
      }

      .read-more {
        color: white;
        cursor: pointer;
        text-decoration: underline;
        font-size: 14px;
        margin-top: 8px;
        margin-bottom:10px;
      }

      footer {
        margin-top: auto;
        .tech-list {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 1.3rem;
          opacity: 1;
          margin-top:10px;
          color:#23ce6b;
          font-weight:400
        }
      }
    }
  }

  @media (max-width: 960px) {
    .projects {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 740px) {
    .projects {
      grid-template-columns: 1fr;
    }
  }
`;
