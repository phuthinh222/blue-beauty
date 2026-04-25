"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { cn } from "@repo/ui/lib/utils";

type Role = "Thợ makeup" | "Khách hàng";

type UserRow = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  role: Role;
  active: boolean;
};

const USERS: UserRow[] = Array.from({ length: 21 }).map((_, i) => {
  const idx = i + 1;
  const role: Role = idx % 3 === 0 ? "Thợ makeup" : "Khách hàng";
  return {
    id: String(idx),
    name: idx % 2 === 0 ? "Nguyễn Thị Tuyết" : "Trần Nam Anh",
    address: "Đà Nẵng, Việt Nam",
    email: idx % 2 === 0 ? "stanley.j@hotmail.com" : "jone.blake@hotmail.com",
    phone: "0123456789",
    role,
    active: true,
  };
});

function RoleBadge({ role }: { role: Role }) {
  const cls =
    role === "Thợ makeup"
      ? "bg-[#EAF4FF] text-[#257CBA]"
      : "bg-[#EFFFF7] text-[#16A34A]";
  return (
    <Badge variant="secondary" className={cn("font-medium", cls)}>
      {role}
    </Badge>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 font-medium",
        active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
      )}
    >
      <span className="text-[10px] leading-none">●</span>
      {active ? "Đang hoạt động" : "Không hoạt động"}
    </Badge>
  );
}

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = React.useState<Role | "all">("all");
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState<UserRow[]>(USERS);
  const [deleteTarget, setDeleteTarget] = React.useState<UserRow | null>(null);
  const [viewTarget, setViewTarget] = React.useState<UserRow | null>(null);
  const [query, setQuery] = React.useState("");
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formId, setFormId] = React.useState<string | null>(null);
  const [formName, setFormName] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formAddress, setFormAddress] = React.useState("");
  const [formRole, setFormRole] = React.useState<Role>("Khách hàng");
  const [formActive, setFormActive] = React.useState(true);

  const pageSize = 6;
  const filtered = React.useMemo(() => {
    const source = users;
    const byRole =
      roleFilter === "all" ? source : source.filter((u) => u.role === roleFilter);
    const q = query.trim().toLowerCase();
    if (!q) return byRole;
    return byRole.filter((u) =>
      [u.name, u.email, u.phone, u.address].some((x) =>
        String(x).toLowerCase().includes(q),
      ),
    );
  }, [roleFilter, users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [roleFilter, query]);

  const openCreate = () => {
    setFormMode("create");
    setFormId(null);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
    setFormRole("Khách hàng");
    setFormActive(true);
    setFormOpen(true);
  };

  const openEdit = (u: UserRow) => {
    setFormMode("edit");
    setFormId(u.id);
    setFormName(u.name);
    setFormEmail(u.email);
    setFormPhone(u.phone);
    setFormAddress(u.address);
    setFormRole(u.role);
    setFormActive(u.active);
    setFormOpen(true);
  };

  const onSubmitForm = () => {
    const name = formName.trim();
    const email = formEmail.trim();
    if (!name || !email) return;

    if (formMode === "create") {
      const nextId = String(
        Math.max(0, ...users.map((u) => Number(u.id) || 0)) + 1,
      );
      const next: UserRow = {
        id: nextId,
        name,
        email,
        phone: formPhone.trim(),
        address: formAddress.trim(),
        role: formRole,
        active: formActive,
      };
      setUsers((prev) => [next, ...prev]);
    } else if (formId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === formId
            ? {
                ...u,
                name,
                email,
                phone: formPhone.trim(),
                address: formAddress.trim(),
                role: formRole,
                active: formActive,
              }
            : u,
        ),
      );
    }

    setFormOpen(false);
  };

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <div className="mb-5">
        <h1 className="text-[28px] font-semibold tracking-tight text-slate-800">
          Danh sách người dùng
        </h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <Link
            href="/dashboard"
            className="cursor-pointer font-medium text-[#257CBA] hover:underline"
          >
            Trang chủ
          </Link>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">Người dùng</span>
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[280px]">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên, email, SĐT..."
                  className="h-9 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
                />
              </div>

              <div className="w-[220px]">
                <Select
                  value={roleFilter}
                  onValueChange={(v) => setRoleFilter(v as Role | "all")}
                >
                  <SelectTrigger className="h-9 rounded-lg shadow-sm">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Chọn vai trò</SelectItem>
                    <SelectItem value="Thợ makeup">Thợ makeup</SelectItem>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="h-9 rounded-lg bg-[#257CBA] px-4 text-sm font-semibold hover:bg-[#1F6FA1]"
                onClick={openCreate}
              >
                Thêm mới +
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[56px]">STT</TableHead>
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
                {rows.map((u, i) => (
                  <TableRow key={u.id}>
                    <TableCell className="text-slate-700">
                      {start + i + 1}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {u.name}
                    </TableCell>
                    <TableCell className="text-slate-600">{u.address}</TableCell>
                    <TableCell className="text-slate-600">{u.email}</TableCell>
                    <TableCell className="text-slate-600">{u.phone}</TableCell>
                    <TableCell>
                      <RoleBadge role={u.role} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge active={u.active} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-lg hover:bg-slate-100"
                          aria-label="View"
                          onClick={() => setViewTarget(u)}
                        >
                          <Eye className="size-4 text-slate-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-lg hover:bg-slate-100"
                          aria-label="Edit"
                          onClick={() => openEdit(u)}
                        >
                          <Pencil className="size-4 text-slate-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-lg hover:bg-slate-100"
                          aria-label="Delete"
                          onClick={() => setDeleteTarget(u)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    className={cn(
                      safePage <= 1 ? "pointer-events-none opacity-50" : "",
                    )}
                  >
                    <ChevronLeft className="size-4" />
                  </PaginationPrevious>
                </PaginationItem>

                {Array.from({ length: totalPages }).slice(0, 5).map((_, idx) => {
                  const n = idx + 1;
                  return (
                    <PaginationItem key={n}>
                      <PaginationLink
                        href="#"
                        isActive={n === safePage}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(n);
                        }}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={cn(
                      safePage >= totalPages ? "pointer-events-none opacity-50" : "",
                    )}
                  >
                    <ChevronRight className="size-4" />
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xoá</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xoá người dùng{" "}
              <span className="font-medium text-slate-900">
                {deleteTarget?.name}
              </span>{" "}
              không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setDeleteTarget(null)}
            >
              Huỷ
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer rounded-lg"
              onClick={() => {
                if (!deleteTarget) return;
                setUsers((prev) => prev.filter((x) => x.id !== deleteTarget.id));
                setDeleteTarget(null);
              }}
            >
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewTarget)} onOpenChange={() => setViewTarget(null)}>
        <DialogContent className="max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
          </DialogHeader>
          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Họ tên:</Label>
              <p className="text-sm font-semibold text-slate-900">
                {viewTarget?.name}
              </p>
            </div>

            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Vai trò:</Label>
              <div>{viewTarget ? <RoleBadge role={viewTarget.role} /> : null}</div>
            </div>

            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Email:</Label>
              <p className="text-sm text-slate-700">{viewTarget?.email}</p>
            </div>

            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Số điện thoại:</Label>
              <p className="text-sm text-slate-700">{viewTarget?.phone}</p>
            </div>

            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Địa chỉ:</Label>
              <p className="text-sm text-slate-700">{viewTarget?.address}</p>
            </div>

            <div className="flex items-start gap-6 rounded-lg px-1 py-1.5">
              <Label className="w-28 shrink-0 text-slate-600">Trạng thái:</Label>
              <div>
                {viewTarget ? <StatusBadge active={viewTarget.active} /> : null}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer rounded-lg">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>
              {formMode === "create" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">Họ tên:</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nhập họ tên"
                className="h-9 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">Email:</Label>
              <Input
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="Nhập email"
                className="h-9 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">
                Số điện thoại:
              </Label>
              <Input
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="h-9 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">Địa chỉ:</Label>
              <Input
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                className="h-9 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">Vai trò:</Label>
              <div className="w-full">
                <Select value={formRole} onValueChange={(v) => setFormRole(v as Role)}>
                  <SelectTrigger className="h-9 rounded-lg shadow-sm">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thợ makeup">Thợ makeup</SelectItem>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-6 px-1">
              <Label className="w-28 shrink-0 text-slate-600">Trạng thái:</Label>
              <div className="w-full">
                <Select
                  value={formActive ? "active" : "inactive"}
                  onValueChange={(v) => setFormActive(v === "active")}
                >
                  <SelectTrigger className="h-9 rounded-lg shadow-sm">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setFormOpen(false)}
            >
              Huỷ
            </Button>
            <Button
              className="cursor-pointer rounded-lg bg-[#257CBA] hover:bg-[#1F6FA1]"
              onClick={onSubmitForm}
              disabled={!formName.trim() || !formEmail.trim()}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

