import styled, { DefaultTheme } from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  > table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${({ theme }) => theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${({ theme }) => theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

interface StatusProps {
  statusColor: "yellow" | "red" | "green";
}

const STATUS_COLORS: Record<StatusProps["statusColor"], keyof DefaultTheme> = {
  yellow: "yellow-500",
  red: "red-500",
  green: "green-500",
};

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    aspect-ratio: 1 / 1;
    width: 0.5rem;
    border-radius: 50%;
    background-color: ${({ theme, statusColor }) => {
      return theme[STATUS_COLORS[statusColor]];
    }};
  }
`;
