import { Ban, Eye, Pencil, Trash2, Unlock } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

import { TableIconButton } from "@/components/dashboard";

import { AccountStatusCell, RoleBadge } from "./user-badges";
import type { UserRow } from "./user-model";

type UsersTableProps = {
  pageRows: UserRow[];
  startIndex: number;
  onView: (user: UserRow) => void;
  onEdit: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
  onBan: (user: UserRow) => void;
  onUnban: (user: UserRow) => void;
};

export function UsersTable({
  pageRows,
  startIndex,
  onView,
  onEdit,
  onDelete,
  onBan,
  onUnban,
}: UsersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-14 min-w-14 text-center">STT</TableHead>
            <TableHead>Họ tên</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageRows.map((u, i) => (
            <TableRow key={u.id}>
              <TableCell className="text-center text-slate-700 tabular-nums">
                {startIndex + i + 1}
              </TableCell>
              <TableCell className="font-medium text-slate-900">{u.name}</TableCell>
              <TableCell className="text-slate-600">{u.address}</TableCell>
              <TableCell className="text-slate-600">{u.email}</TableCell>
              <TableCell className="text-slate-600">{u.phone}</TableCell>
              <TableCell>
                <RoleBadge role={u.role} />
              </TableCell>
              <TableCell>
                <AccountStatusCell user={u} />
              </TableCell>
              <TableCell className="text-right">
                <div className="inline-flex items-center gap-1.5">
                  <TableIconButton
                    aria-label="View"
                    onClick={() => onView(u)}
                  >
                    <Eye className="size-4 text-slate-700" />
                  </TableIconButton>
                  <TableIconButton aria-label="Edit" onClick={() => onEdit(u)}>
                    <Pencil className="size-4 text-slate-700" />
                  </TableIconButton>
                  {u.banned ? (
                    <TableIconButton
                      aria-label="Gỡ chặn"
                      className="text-emerald-700"
                      onClick={() => onUnban(u)}
                    >
                      <Unlock className="size-4" />
                    </TableIconButton>
                  ) : (
                    <TableIconButton
                      aria-label="Chặn tài khoản"
                      onClick={() => onBan(u)}
                    >
                      <Ban className="size-4 text-amber-700" />
                    </TableIconButton>
                  )}
                  <TableIconButton
                    aria-label="Delete"
                    onClick={() => onDelete(u)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </TableIconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
