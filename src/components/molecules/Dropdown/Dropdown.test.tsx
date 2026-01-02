import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

const optionsMock = [
  {
    label: "Opzione 1",
    key: "Opzione1",
    onClick: vi.fn(),
  },
  {
    label: "Opzione 2",
    key: "Opzione2",
    onClick: vi.fn(),
  },
];

const optionsExtendedMock = [
  {
    label: "Opzione 1",
    key: "Opzione1",
    value: "Opzione1",
    onClick: vi.fn(),
  },
  {
    label: "Opzione 2",
    key: "Opzione2",
    value: "Opzione2",
    onClick: vi.fn(),
  },
];

type DropDownVoid = {
  key: string,
  label: string,
  onClick?: () => void,
}

type DropDownExtended = {
  key: string,
  label: string,
  onClick?: () => void,
  value: string,
}

describe("Dropdown component", () => {  
  it("renders and click with base dropdown type", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown<DropDownVoid> label="Menu" options={optionsMock}>
        {x => <div key={x.key}>{x.label}</div>}
      </Dropdown>
    );

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();

    const trigger = screen.getByRole("button");

    expect(screen.queryByText("Opzione 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Opzione 2")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Opzione 1")).toBeInTheDocument();
    expect(screen.getByText("Opzione 2")).toBeInTheDocument();

    await user.click(screen.getByText("Opzione 1"));
    expect(optionsMock[0].onClick).toHaveBeenCalledTimes(1);

  });

  it("renders and click with extended dropdown type", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown<DropDownExtended> label="Menu" options={optionsExtendedMock}>
        {x => <div key={x.key}>{x.label} ({x.value})</div>}
      </Dropdown>
    );

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();

    const trigger = screen.getByRole("button");

    expect(screen.queryByText("Opzione 1 (Opzione1)")).not.toBeInTheDocument();
    expect(screen.queryByText("Opzione 2 (Opzione2)")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Opzione 1 (Opzione1)")).toBeInTheDocument();
    expect(screen.getByText("Opzione 2 (Opzione2)")).toBeInTheDocument();

    await user.click(screen.getByText("Opzione 1 (Opzione1)"));
    expect(optionsMock[0].onClick).toHaveBeenCalledTimes(1);
  });
});
