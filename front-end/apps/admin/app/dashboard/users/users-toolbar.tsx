import { Button } from "@repo/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";

import { DashboardSearchInput } from "@/components/dashboard";

import { USER_SELECT_TRIGGER_CLASS } from "./users-ui";
import type { Role } from "./user-model";

type UsersToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  roleFilter: Role | "all";
  onRoleFilterChange: (value: Role | "all") => void;
  onAddUser: () => void;
};

export function UsersToolbar({
  query,
  onQueryChange,
  roleFilter,
  onRoleFilterChange,
  onAddUser,
}: UsersToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <DashboardSearchInput
          wrapperClassName="w-[280px] max-w-none"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Tìm kiếm theo tên, email, SĐT..."
          className="h-9"
        />

        <div className="w-[220px]">
          <Select
            value={roleFilter}
            onValueChange={(v) => onRoleFilterChange(v as Role | "all")}
          >
            <SelectTrigger className={USER_SELECT_TRIGGER_CLASS}>
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
          onClick={onAddUser}
        >
          Thêm mới +
        </Button>
      </div>
    </div>
  );
}
