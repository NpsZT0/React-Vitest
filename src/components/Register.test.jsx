import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, waitFor, fireEvent } from "@testing-library/react";

import axios from "axios";
import RegisterForm from "./Register";

// Mocking axios
vi.mock("axios");

describe("RegisterForm component", () => {
  beforeAll(() => {
    // global live in test-setup.js
    global.window.alert = vi.fn();
  });

  it("renders the form successfully", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    //? /text/i i = case insensitive
    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  it("shows validation errors", () => {
    const { getByText } = render(<RegisterForm />);

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(getByText(/email is required/i)).toBeInTheDocument();
    expect(getByText(/phone number is required/i)).toBeInTheDocument();
  });

  it("shows validation name null errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: "" } });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/name is required/i)).toBeInTheDocument();
  });

  it("shows validation email format errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/email is invalid/i)).toBeInTheDocument();
  });

  it("shows validation phone format errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "123456" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(
      getByText(/invalid phone number, should be 10 digits/i)
    ).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    const mockResponse = {
      data: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
      },
    };
    axios.post.mockResolvedValue(mockResponse);
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users",
        {
          name: "John Doe",
          email: "johndoe@example.com",
          phoneNumber: "1234567890",
        }
      );
    });
  });
});
