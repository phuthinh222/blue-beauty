"use client";

import * as React from "react";
import { Upload } from "lucide-react";

import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import { Textarea } from "@repo/ui/textarea";

import {
  DashboardListCard,
  DashboardPageHeader,
  DetailField,
} from "@/components/dashboard";

type Recipient = { id: string; name: string };

const MOCK_RECIPIENTS: Recipient[] = [
  { id: "1", name: "Nguyễn Thị Vân Anh" },
  { id: "2", name: "Trần Nam Anh" },
  { id: "3", name: "Nguyễn Thị Tuyết" },
  { id: "4", name: "Đỗ Hải Nam" },
  { id: "5", name: "Lê Phương Thảo" },
];

export default function NewNotificationPage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [scheduleMode, setScheduleMode] = React.useState<"schedule" | "now">(
    "schedule",
  );
  const [scheduleAt, setScheduleAt] = React.useState("2024-10-15T15:00");
  const [recipientsOpen, setRecipientsOpen] = React.useState(false);
  const [selectedRecipients, setSelectedRecipients] = React.useState<string[]>([
    "1",
    "2",
  ]);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const recipientsCount = selectedRecipients.length;

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Tạo mới thông báo cho khách hàng"
        breadcrumbs={[
          { label: "Thông báo", href: "/dashboard/notifications" },
          { label: "Tạo mới" },
        ]}
      />

      <DashboardListCard>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold text-slate-800">
                NỘI DUNG GỬI
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Tiêu đề thông báo</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Voucher giảm giá 15% cho các dịch vụ"
                    className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Mô tả</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Voucher giảm giá 15% cho các dịch vụ..."
                    className="min-h-[140px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Hình ảnh</Label>
                  <label className="group relative flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center text-sm text-slate-600 hover:border-[#257CBA]">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        setFileName(f ? f.name : null);
                      }}
                    />
                    <div className="grid size-10 place-items-center rounded-full bg-slate-100 group-hover:bg-[#257CBA]/10">
                      <Upload className="size-4 text-slate-700 group-hover:text-[#257CBA]" />
                    </div>
                    <p className="mt-3 text-xs">
                      {fileName ? (
                        <span className="font-medium text-slate-800">
                          {fileName}
                        </span>
                      ) : (
                        "Click here to upload or drop media here"
                      )}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-slate-800">
                NGƯỜI NHẬN
              </p>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Button
                  variant="outline"
                  className="h-9 cursor-pointer rounded-lg border-[#257CBA]/40 text-xs font-semibold text-[#257CBA] hover:bg-[#257CBA]/5"
                  onClick={() => setRecipientsOpen(true)}
                >
                  Bấm để thêm người nhận
                </Button>
                <p className="mt-2 text-xs text-slate-500">
                  Bạn đã chọn {recipientsCount} người nhận
                </p>
              </div>

              <p className="mt-6 mb-4 text-sm font-semibold text-slate-800">
                LÊN LỊCH GỬI
              </p>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <RadioGroup
                  value={scheduleMode}
                  onValueChange={(v) => setScheduleMode(v as "schedule" | "now")}
                  className="gap-3"
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="schedule" id="schedule" />
                    <div className="flex-1">
                      <Label htmlFor="schedule" className="cursor-pointer">
                        Gửi theo thời gian
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="datetime-local"
                          value={scheduleAt}
                          onChange={(e) => setScheduleAt(e.target.value)}
                          disabled={scheduleMode !== "schedule"}
                          className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="now" id="now" />
                    <div className="flex-1">
                      <Label htmlFor="now" className="cursor-pointer">
                        Gửi ngay lập tức
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="h-10 cursor-pointer rounded-lg"
                  onClick={() => setPreviewOpen(true)}
                >
                  Xem trước
                </Button>
                <Button className="h-10 cursor-pointer rounded-lg bg-[#257CBA] px-5 font-semibold hover:bg-[#1F6FA1]">
                  Lưu thông báo
                </Button>
              </div>
            </div>
          </div>
      </DashboardListCard>

      <Dialog open={recipientsOpen} onOpenChange={setRecipientsOpen}>
        <DialogContent className="max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Chọn người nhận</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            {MOCK_RECIPIENTS.map((r) => {
              const checked = selectedRecipients.includes(r.id);
              return (
                <label
                  key={r.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => {
                      const next = Boolean(v);
                      setSelectedRecipients((prev) =>
                        next ? [...prev, r.id] : prev.filter((x) => x !== r.id),
                      );
                    }}
                  />
                  <span className="text-sm text-slate-700">{r.name}</span>
                </label>
              );
            })}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setRecipientsOpen(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Xem trước thông báo</DialogTitle>
          </DialogHeader>
          <div className="mt-3 space-y-2">
            <DetailField label="Tiêu đề:">
              <span className="font-semibold text-slate-900">
                {title || "—"}
              </span>
            </DetailField>
            <DetailField label="Mô tả:">
              <span className="text-slate-700">{description || "—"}</span>
            </DetailField>
            <DetailField label="Người nhận:">
              {recipientsCount} (người)
            </DetailField>
            <DetailField label="Gửi:">
              {scheduleMode === "now" ? "Gửi ngay" : scheduleAt}
            </DetailField>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setPreviewOpen(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

