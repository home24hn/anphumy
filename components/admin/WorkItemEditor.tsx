"use client";

import { useId, useState } from "react";
import type { WorkItem } from "@/types/project";

/**
 * Dynamic add / edit / delete / reorder list for "Nội dung công việc"
 * (section 16). No rich text editor — plain text items stored as JSONB.
 * Syncs its state into a hidden input so it submits with the surrounding
 * <form action={serverAction}>.
 */
export function WorkItemEditor({
  name,
  label,
  initialItems = [],
  textField,
}: {
  name: string;
  label: string;
  initialItems?: WorkItem[];
  textField: "text_vi" | "text_en";
}) {
  const [items, setItems] = useState<WorkItem[]>(initialItems);
  const uid = useId();

  function update(index: number, text: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [textField]: text } : item)),
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { id: `${uid}-${prev.length}-${Date.now()}`, text_vi: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    setItems((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-brand-dark">{label}</p>
        <button
          type="button"
          onClick={addItem}
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          + Thêm công việc
        </button>
      </div>

      <ol className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="w-6 shrink-0 text-xs text-brand-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <input
              type="text"
              value={item[textField] ?? ""}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              placeholder="Nội dung công việc"
            />
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Di chuyển lên"
              className="rounded-md border border-brand-border px-2 py-1.5 text-xs text-brand-muted hover:text-brand-dark disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              aria-label="Di chuyển xuống"
              className="rounded-md border border-brand-border px-2 py-1.5 text-xs text-brand-muted hover:text-brand-dark disabled:opacity-30"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeItem(i)}
              aria-label="Xóa"
              className="rounded-md border border-brand-border px-2 py-1.5 text-xs text-red-600 hover:bg-red-50"
            >
              ✕
            </button>
          </li>
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-brand-muted">Chưa có mục nào.</p>
        ) : null}
      </ol>

      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
