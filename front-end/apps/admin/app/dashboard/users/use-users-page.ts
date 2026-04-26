import * as React from "react";

import { usePaginatedSlice } from "@/hooks/use-paginated-slice";

import { useUserForm } from "./use-user-form";
import { MOCK_USERS, type Role, type UserRow } from "./user-model";

export function useUsersPage() {
  const [roleFilter, setRoleFilter] = React.useState<Role | "all">("all");
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState<UserRow[]>(MOCK_USERS);
  const [deleteTarget, setDeleteTarget] = React.useState<UserRow | null>(
    null,
  );
  const [banTarget, setBanTarget] = React.useState<UserRow | null>(null);
  const [banReasonInput, setBanReasonInput] = React.useState("");
  const [viewTarget, setViewTarget] = React.useState<UserRow | null>(null);
  const [query, setQuery] = React.useState("");

  const form = useUserForm(users, setUsers);

  const filtered = React.useMemo(() => {
    const byRole =
      roleFilter === "all"
        ? users
        : users.filter((u) => u.role === roleFilter);
    const q = query.trim().toLowerCase();
    if (!q) return byRole;
    return byRole.filter((u) =>
      [u.name, u.email, u.phone, u.address].some((x) =>
        String(x).toLowerCase().includes(q),
      ),
    );
  }, [roleFilter, users, query]);

  const { totalPages, safePage, start, pageRows } = usePaginatedSlice(
    filtered,
    page,
  );

  const setQueryAndResetPage = React.useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const setRoleFilterAndResetPage = React.useCallback(
    (value: Role | "all") => {
      setRoleFilter(value);
      setPage(1);
    },
    [],
  );

  const confirmDelete = React.useCallback(() => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    setDeleteTarget(null);
  }, [deleteTarget, setUsers]);

  const closeBan = React.useCallback(() => {
    setBanTarget(null);
    setBanReasonInput("");
  }, []);

  const confirmBan = React.useCallback(() => {
    if (!banTarget || !banReasonInput.trim()) return;
    const reason = banReasonInput.trim();
    setUsers((prev) =>
      prev.map((x) =>
        x.id === banTarget.id
          ? { ...x, banned: true, banReason: reason, active: false }
          : x,
      ),
    );
    closeBan();
  }, [banTarget, banReasonInput, closeBan, setUsers]);

  const unbanUser = React.useCallback(
    (u: UserRow) => {
      setUsers((prev) =>
        prev.map((x) =>
          x.id === u.id
            ? { ...x, banned: false, banReason: undefined }
            : x,
        ),
      );
    },
    [setUsers],
  );

  const openBan = React.useCallback((u: UserRow) => {
    setBanTarget(u);
    setBanReasonInput("");
  }, []);

  return {
    list: {
      roleFilter,
      setRoleFilter: setRoleFilterAndResetPage,
      query,
      setQuery: setQueryAndResetPage,
      page,
      setPage,
      totalPages,
      safePage,
      start,
      pageRows,
    },
    delete: {
      target: deleteTarget,
      setTarget: setDeleteTarget,
      confirm: confirmDelete,
    },
    ban: {
      target: banTarget,
      reason: banReasonInput,
      setReason: setBanReasonInput,
      open: openBan,
      close: closeBan,
      confirm: confirmBan,
    },
    view: {
      target: viewTarget,
      setTarget: setViewTarget,
    },
    form,
    unbanUser,
  };
}
