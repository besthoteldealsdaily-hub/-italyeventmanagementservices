import type { Row } from "@/lib/db/client";
import type { EntityDef, FieldDef } from "@/lib/admin/entities";
import type { RefOption } from "@/lib/admin/crud";
import { centsToInput } from "@/lib/money";
import { fileHref } from "@/lib/r2";
import { inputCls, labelCls, SubmitButton } from "./ui";

function Field({ f, value, refs, mappedValue }: { f: FieldDef; value: unknown; refs: RefOption[]; mappedValue?: unknown }) {
  const id = `f_${f.name}`;
  const wide = f.type === "textarea";
  const label = (
    <label htmlFor={id} className={labelCls}>
      {f.label}
      {f.required && <span className="text-red-600"> *</span>}
    </label>
  );
  let control: React.ReactNode;

  switch (f.type) {
    case "textarea":
      control = <textarea id={id} name={f.name} rows={4} defaultValue={String(value ?? "")} className={`${inputCls} mt-1`} />;
      break;
    case "select":
      control = (
        <select id={id} name={f.name} defaultValue={value === null || value === undefined ? "" : String(value)} required={f.required} className={`${inputCls} mt-1`}>
          <option value="">—</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      );
      break;
    case "ref":
      control = (
        <select id={id} name={f.name} defaultValue={value ? String(value) : ""} required={f.required} className={`${inputCls} mt-1`}>
          <option value="">—</option>
          {refs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      );
      break;
    case "checkbox":
      return (
        <div className="sm:col-span-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name={f.name} defaultChecked={Boolean(value)} className="h-4 w-4 rounded border-line accent-accent" />
            {f.label}
          </label>
          {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
        </div>
      );
    case "money":
      control = (
        <input id={id} name={f.name} inputMode="decimal" defaultValue={value === null || value === undefined ? "" : centsToInput(Number(value))} placeholder="0.00" className={`${inputCls} mt-1`} />
      );
      break;
    case "number":
      control = <input id={id} name={f.name} inputMode="decimal" defaultValue={value === null || value === undefined ? "" : String(value)} required={f.required} className={`${inputCls} mt-1`} />;
      break;
    case "date":
      control = <input id={id} name={f.name} type="date" defaultValue={String(value ?? "").slice(0, 10)} required={f.required} className={`${inputCls} mt-1`} />;
      break;
    case "datetime":
      control = <input id={id} name={f.name} type="datetime-local" defaultValue={String(value ?? "").slice(0, 16)} required={f.required} className={`${inputCls} mt-1`} />;
      break;
    case "file": {
      const current = mappedValue ? String(mappedValue) : "";
      return (
        <div className="sm:col-span-2">
          {label}
          <input id={id} name={f.name} type="file" accept={f.accept} className="mt-1 block w-full text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-sand file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-line" />
          {current && (
            <p className="mt-1 text-xs text-muted">
              Current file:{" "}
              <a href={fileHref(current)} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                view
              </a>{" "}
              — choosing a new file above replaces it.
            </p>
          )}
          {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
        </div>
      );
    }
    default:
      control = <input id={id} name={f.name} defaultValue={String(value ?? "")} required={f.required} placeholder={f.placeholder} className={`${inputCls} mt-1`} />;
  }

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      {label}
      {control}
      {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
    </div>
  );
}

export default function EntityForm({
  entity,
  row,
  refs,
  action,
  returnTo,
}: {
  entity: EntityDef;
  row: Row;
  refs: Record<string, RefOption[]>;
  action: (formData: FormData) => void | Promise<void>;
  returnTo?: string;
}) {
  const hasFile = entity.fields.some((f) => f.type === "file");
  return (
    <form action={action} encType={hasFile ? "multipart/form-data" : undefined} className="rounded-xl border border-line bg-white p-5">
      {returnTo && <input type="hidden" name="return" value={returnTo} />}
      <div className="grid gap-4 sm:grid-cols-2">
        {entity.fields.map((f) => (
          <Field key={f.name} f={f} value={row[f.name]} refs={refs[f.name] ?? []} mappedValue={f.mapsTo ? row[f.mapsTo] : undefined} />
        ))}
      </div>
      <div className="mt-5">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
