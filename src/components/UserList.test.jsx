import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import axios from "axios";
import UserList from "./UserList";

// Mocking axios
vi.mock("axios");

describe("UserList component", () => {
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@examplse.com",
      phoneNumber: "09876543212",
    },
  ];

  it("renders the table successfully when API call succeeds", async () => {
    axios.get.mockResolvedValue({ data: mockUsers });
    render(<UserList />);

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });
  });

  it("filters users based on search term", async () => {
    axios.get.mockResolvedValue({ data: mockUsers });
    render(<UserList />);

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("Search by name or email"), {
        target: { value: "John" },
      });
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane")).not.toBeInTheDocument();
    });
  });

  it("handles API call failure without problems and still renders", async () => {
    axios.get.mockRejectedValue(new Error('API call failed'))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<UserList />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching users:",
        expect.any(Error)
      );
      expect(
        screen.getByPlaceholderText("Search by name or email")
      ).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });
});
