"use client";

import {
  DashboardListCard,
  DashboardPageHeader,
  TablePaginationControls,
} from "@/components/dashboard";

import {
  BanUserDialog,
  DeleteUserDialog,
  UserFormDialog,
  ViewUserDialog,
} from "./user-dialogs";
import { useUsersPage } from "./use-users-page";
import { UsersTable } from "./users-table";
import { UsersToolbar } from "./users-toolbar";

export default function UsersPage() {
  const { list, delete: del, ban, view, form, unbanUser } = useUsersPage();

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Danh sách người dùng"
        currentLabel="Người dùng"
      />

      <DashboardListCard>
        <UsersToolbar
          query={list.query}
          onQueryChange={list.setQuery}
          roleFilter={list.roleFilter}
          onRoleFilterChange={list.setRoleFilter}
          onAddUser={form.openCreate}
        />

        <UsersTable
          pageRows={list.pageRows}
          startIndex={list.start}
          onView={view.setTarget}
          onEdit={form.openEdit}
          onDelete={del.setTarget}
          onBan={ban.open}
          onUnban={unbanUser}
        />

        <TablePaginationControls
          className="mt-4"
          safePage={list.safePage}
          totalPages={list.totalPages}
          onPageChange={list.setPage}
        />
      </DashboardListCard>

      <DeleteUserDialog
        user={del.target}
        onOpenChange={(open) => {
          if (!open) del.setTarget(null);
        }}
        onCancel={() => del.setTarget(null)}
        onConfirm={del.confirm}
      />

      <BanUserDialog
        user={ban.target}
        reason={ban.reason}
        onReasonChange={ban.setReason}
        onOpenChange={(open) => {
          if (!open) ban.close();
        }}
        onCancel={ban.close}
        onConfirm={ban.confirm}
      />

      <ViewUserDialog
        user={view.target}
        onOpenChange={(open) => {
          if (!open) view.setTarget(null);
        }}
      />

      <UserFormDialog form={form} />
    </main>
  );
}
