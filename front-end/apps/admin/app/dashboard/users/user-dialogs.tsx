import * as React from "react";

import { Button } from "@repo/ui/button";
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
import { Textarea } from "@repo/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";

import { DetailField } from "@/components/dashboard";

import { AccountStatusCell, RoleBadge } from "./user-badges";
import type { UserForm } from "./use-user-form";
import type { Role, UserRow } from "./user-model";
import {
  USER_INPUT_CLASS,
  USER_INPUT_READONLY_CLASS,
  USER_SELECT_TRIGGER_CLASS,
  USER_TEXTAREA_CLASS,
} from "./users-ui";

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-6 px-1">
      <Label className="w-28 shrink-0 text-slate-600">{label}</Label>
      {children}
    </div>
  );
}

type DeleteUserDialogProps = {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteUserDialog({
  user,
  onOpenChange,
  onCancel,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xoá</DialogTitle>
          <DialogDescription>
            Bạn có chắc muốn xoá người dùng{" "}
            <span className="font-medium text-slate-900">{user?.name}</span>{" "}
            không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer rounded-lg"
            onClick={onCancel}
          >
            Huỷ
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer rounded-lg"
            onClick={onConfirm}
          >
            Xoá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type BanUserDialogProps = {
  user: UserRow | null;
  reason: string;
  onReasonChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function BanUserDialog({
  user,
  reason,
  onReasonChange,
  onOpenChange,
  onCancel,
  onConfirm,
}: BanUserDialogProps) {
  return (
    <Dialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Chặn tài khoản</DialogTitle>
          <DialogDescription>
            Người dùng{" "}
            <span className="font-medium text-slate-900">{user?.name}</span> sẽ
            bị chặn sử dụng dịch vụ
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 px-1">
          <Label htmlFor="ban-reason" className="text-slate-700">
            Lý do chặn
          </Label>
          <Textarea
            id="ban-reason"
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="Nhập lý do chặn tài khoản..."
            className={USER_TEXTAREA_CLASS}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer rounded-lg"
            onClick={onCancel}
          >
            Huỷ
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer rounded-lg"
            disabled={!reason.trim()}
            onClick={onConfirm}
          >
            Chặn tài khoản
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ViewUserDialogProps = {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
};

export function ViewUserDialog({ user, onOpenChange }: ViewUserDialogProps) {
  return (
    <Dialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
        </DialogHeader>
        <div className="mt-3 space-y-1">
          {user ? (
            <>
              <DetailField label="Họ tên:">
                <span className="font-semibold text-slate-900">{user.name}</span>
              </DetailField>
              <DetailField label="Vai trò:">
                <RoleBadge role={user.role} />
              </DetailField>
              <DetailField label="Email:">{user.email}</DetailField>
              <DetailField label="Số điện thoại:">{user.phone}</DetailField>
              <DetailField label="Địa chỉ:">{user.address}</DetailField>
              <DetailField label="Trạng thái:">
                <AccountStatusCell user={user} />
              </DetailField>
              {user.banned ? (
                <DetailField label="Lý do chặn:">
                  {user.banReason?.trim() || "—"}
                </DetailField>
              ) : null}
            </>
          ) : null}
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
  );
}

type UserFormDialogProps = {
  form: UserForm;
};

export function UserFormDialog({ form }: UserFormDialogProps) {
  const {
    open,
    setOpen,
    mode,
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
    submit,
    canSave,
    districts,
  } = form;

  const onRoleChange = (v: string) => {
    const r = v as Role;
    setRole(r);
    if (r === "Khách hàng") setDistrict("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-3">
          <FormRow label="Họ tên:">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên"
              className={USER_INPUT_CLASS}
            />
          </FormRow>

          <FormRow label="Email:">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className={USER_INPUT_CLASS}
            />
          </FormRow>

          <FormRow label="Số điện thoại:">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className={USER_INPUT_CLASS}
            />
          </FormRow>

          {role === "Khách hàng" ? (
            <FormRow label="Địa chỉ:">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                className={USER_INPUT_CLASS}
              />
            </FormRow>
          ) : null}

          <FormRow label="Vai trò:">
            <div className="w-full">
              {mode === "edit" && baselineRole === "Khách hàng" ? (
                <Input
                  readOnly
                  value="Khách hàng"
                  className={USER_INPUT_READONLY_CLASS}
                />
              ) : (
                <Select value={role} onValueChange={onRoleChange}>
                  <SelectTrigger className={USER_SELECT_TRIGGER_CLASS}>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thợ makeup">Thợ makeup</SelectItem>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </FormRow>

          {role === "Thợ makeup" ? (
            <>
              <FormRow label="Thành phố:">
                <Input
                  readOnly
                  value="Đà Nẵng"
                  className={USER_INPUT_READONLY_CLASS}
                />
              </FormRow>
              <FormRow label="Khu vực:">
                <div className="w-full">
                  <Select
                    value={district || undefined}
                    onValueChange={setDistrict}
                  >
                    <SelectTrigger className={USER_SELECT_TRIGGER_CLASS}>
                      <SelectValue placeholder="Chọn quận / huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormRow>
            </>
          ) : null}

          {mode === "create" ? (
            <FormRow label="Trạng thái:">
              <Input
                readOnly
                value="Đang hoạt động"
                className={USER_INPUT_READONLY_CLASS}
              />
            </FormRow>
          ) : (
            <FormRow label="Trạng thái:">
              <div className="w-full">
                <Select
                  value={active ? "active" : "inactive"}
                  onValueChange={(v) => setActive(v === "active")}
                >
                  <SelectTrigger className={USER_SELECT_TRIGGER_CLASS}>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormRow>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer rounded-lg"
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>
          <Button
            className="cursor-pointer rounded-lg bg-[#257CBA] hover:bg-[#1F6FA1]"
            onClick={submit}
            disabled={!canSave}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
