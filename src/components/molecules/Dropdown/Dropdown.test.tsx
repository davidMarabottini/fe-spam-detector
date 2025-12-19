import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

const optionsMock = [
  {
    label: "Opzione 1",
    onClick: vi.fn(),
  },
  {
    label: "Opzione 2",
    url: "/test-url",
  },
];

describe("Dropdown component", () => {
  it("renders the trigger button with label", () => {
    render(<Dropdown label="Menu" options={optionsMock} />);

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dropdown label="Menu" options={optionsMock} />
        <div data-testid="outside">outside</div>
      </>
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);
    expect(screen.getByText("Opzione 1")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByText("Opzione 1")).not.toBeInTheDocument();
  });

  it("calls onClick and closes when clicking an option button", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Menu" options={optionsMock} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Opzione 1"));

    expect(optionsMock[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Opzione 1")).not.toBeInTheDocument();
  });

  it("renders link when option has url", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Menu" options={optionsMock} />);

    await user.click(screen.getByRole("button"));

    const link = screen.getByRole("link", { name: "Opzione 2" });
    expect(link).toHaveAttribute("href", "/test-url");
  });
});
