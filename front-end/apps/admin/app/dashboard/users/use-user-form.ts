import * as React from "react";

import {
  DA_NANG_DISTRICTS,
  districtFromStylistAddress,
  type Role,
  type UserRow,
} from "./user-model";

export type UserFormMode = "create" | "edit";

export function useUserForm(
  users: UserRow[],
  setUsers: React.Dispatch<React.SetStateAction<UserRow[]>>,
) {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<UserFormMode>("create");
  const [id, setId] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [role, setRole] = React.useState<Role>("Khách hàng");
  const [baselineRole, setBaselineRole] = React.useState<Role | null>(null);
  const [active, setActive] = React.useState(true);

  const openCreate = React.useCallback(() => {
    setMode("create");
    setId(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDistrict("");
    setRole("Khách hàng");
    setBaselineRole(null);
    setActive(true);
    setOpen(true);
  }, []);

  const openEdit = React.useCallback((u: UserRow) => {
    setMode("edit");
    setBaselineRole(u.role);
    setId(u.id);
    setName(u.name);
    setEmail(u.email);
    setPhone(u.phone);
    setRole(u.role);
    setActive(u.active);
    if (u.role === "Thợ makeup") {
      const d = districtFromStylistAddress(u.address);
      setDistrict(d);
      setAddress(d ? "" : u.address);
    } else {
      setDistrict("");
      setAddress(u.address);
    }
    setOpen(true);
  }, []);

  const resolvedAddress = React.useCallback(() => {
    if (role === "Thợ makeup") {
      const d = district.trim();
      return d ? `${d}, Đà Nẵng` : "Đà Nẵng";
    }
    return address.trim();
  }, [role, district, address]);

  const canSave =
    Boolean(name.trim() && email.trim()) &&
    (role === "Khách hàng" || Boolean(district.trim()));

  const submit = React.useCallback(() => {
    const n = name.trim();
    const em = email.trim();
    if (!n || !em) return;
    const stylistNeedsDistrict =
      role === "Thợ makeup" &&
      !(mode === "edit" && baselineRole === "Khách hàng");
    if (stylistNeedsDistrict && !district.trim()) return;

    const addr = resolvedAddress();

    if (mode === "create") {
      const nextId = String(
        Math.max(0, ...users.map((u) => Number(u.id) || 0)) + 1,
      );
      const row: UserRow = {
        id: nextId,
        name: n,
        email: em,
        phone: phone.trim(),
        address: addr,
        role,
        active: true,
        banned: false,
      };
      setUsers((prev) => [row, ...prev]);
    } else if (id) {
      const roleLockedCustomer =
        baselineRole === "Khách hàng" ? "Khách hàng" : role;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                name: n,
                email: em,
                phone: phone.trim(),
                address:
                  baselineRole === "Khách hàng" ? address.trim() : addr,
                role: roleLockedCustomer,
                active,
              }
            : u,
        ),
      );
    }

    setOpen(false);
  }, [
    name,
    email,
    phone,
    role,
    mode,
    baselineRole,
    district,
    address,
    active,
    id,
    users,
    resolvedAddress,
    setUsers,
  ]);

  return {
    open,
    setOpen,
    mode,
    id,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    district,
    setDistrict,
    role,
    setRole,
    baselineRole,
    active,
    setActive,
    openCreate,
    openEdit,
    submit,
    canSave,
    districts: DA_NANG_DISTRICTS,
  };
}

export type UserForm = ReturnType<typeof useUserForm>;
