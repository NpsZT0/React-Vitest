import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import Counter from "./Counter"

describe("Counter component", () => {
    beforeEach(() => {
        render(<Counter />)
    })

    it("should render counter text", () => {
        expect(screen.getByText(/Counter:/)).toBeInTheDocument();
    })
    
    it("should render increment button", () => {
        fireEvent.click(screen.getByText(/Increment/));
        expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
    })

    it("should render decrement button", () => {
        fireEvent.click(screen.getByText(/Decrement/));
        expect(screen.getByText(/Counter: -1/)).toBeInTheDocument();
    })
})