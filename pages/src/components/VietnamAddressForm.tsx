import { useEffect, useMemo, useState } from 'react';

type Wards = Record<string, string>;
type District = { name: string; wards: Wards };
type Province = { name: string; districts: Record<string, District> };
type AddressDataset = Record<string, Province>;

export type VietnamAddressValue = {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
};

export type AddressLike = {
  name?: string | null;
  phone?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

export function formatVietnamAddress(address: AddressLike | null | undefined): string {
  if (!address) return '';
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postal_code,
    'Việt Nam',
  ]
    .map((part) => (typeof part === 'string' ? part.trim() : ''))
    .filter(Boolean)
    .join(', ');
}

export const emptyVietnamAddress: VietnamAddressValue = {
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'VN',
  provinceCode: '',
  districtCode: '',
  wardCode: '',
};

export function isVietnamAddressComplete(value: VietnamAddressValue | null | undefined): boolean {
  if (!value) return false;
  return Boolean(
    value.name.trim() &&
      /^\+?\d{9,11}$/.test(value.phone.trim()) &&
      value.provinceCode &&
      value.districtCode &&
      value.wardCode &&
      value.line1.trim() &&
      /^\d{5,6}$/.test(value.postal_code.trim())
  );
}

let datasetPromise: Promise<AddressDataset> | null = null;
function loadDataset(): Promise<AddressDataset> {
  if (!datasetPromise) {
    datasetPromise = fetch('/data/vietnam-addresses.json').then((response) => {
      if (!response.ok) throw new Error('Không tải được danh sách địa chỉ');
      return response.json() as Promise<AddressDataset>;
    });
  }
  return datasetPromise;
}

type Props = {
  value: VietnamAddressValue;
  onChange: (value: VietnamAddressValue) => void;
  title?: string;
};

export default function VietnamAddressForm({ value, onChange, title }: Props) {
  const [dataset, setDataset] = useState<AddressDataset | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadDataset()
      .then((data) => {
        if (!cancelled) setDataset(data);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'Không tải được danh sách địa chỉ');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const provinces = useMemo(() => Object.entries(dataset ?? {}), [dataset]);
  const districts = useMemo(
    () => Object.entries(value.provinceCode ? dataset?.[value.provinceCode]?.districts ?? {} : {}),
    [dataset, value.provinceCode]
  );
  const wards = useMemo(() => {
    const district = value.provinceCode
      ? dataset?.[value.provinceCode]?.districts?.[value.districtCode]
      : undefined;
    return Object.entries(district?.wards ?? {});
  }, [dataset, value.provinceCode, value.districtCode]);

  function patch(partial: Partial<VietnamAddressValue>) {
    onChange({ ...value, ...partial, country: 'VN' });
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-4">
      {title && <div className="text-sm font-semibold text-gray-900">{title}</div>}

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}
      {!dataset && !loadError && <p className="text-sm text-gray-500">Đang tải danh sách địa chỉ…</p>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm text-gray-700">
          Họ và người nhận *
          <input
            className={inputClass}
            value={value.name}
            autoComplete="name"
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="Nguyễn Văn A"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Số điện thoại *
          <input
            className={inputClass}
            value={value.phone}
            inputMode="tel"
            autoComplete="tel"
            onChange={(e) => patch({ phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 11) })}
            placeholder="09xxxxxxxx"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block text-sm text-gray-700">
          Tỉnh / Thành phố *
          <select
            className={inputClass}
            value={value.provinceCode}
            disabled={!dataset}
            onChange={(e) => {
              const code = e.target.value;
              patch({
                provinceCode: code,
                state: dataset?.[code]?.name ?? '',
                districtCode: '',
                wardCode: '',
                city: '',
                line2: '',
              });
            }}
          >
            <option value="">Chọn Tỉnh/Thành</option>
            {provinces.map(([code, province]) => (
              <option key={code} value={code}>
                {province.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-gray-700">
          Quận / Huyện *
          <select
            className={inputClass}
            value={value.districtCode}
            disabled={!value.provinceCode}
            onChange={(e) => {
              const code = e.target.value;
              patch({
                districtCode: code,
                city: dataset?.[value.provinceCode]?.districts?.[code]?.name ?? '',
                wardCode: '',
                line2: '',
              });
            }}
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map(([code, district]) => (
              <option key={code} value={code}>
                {district.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-gray-700">
          Phường / Xã *
          <select
            className={inputClass}
            value={value.wardCode}
            disabled={!value.districtCode}
            onChange={(e) => {
              const code = e.target.value;
              patch({
                wardCode: code,
                line2: wards.find(([wardCode]) => wardCode === code)?.[1] ?? '',
              });
            }}
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map(([code, ward]) => (
              <option key={code} value={code}>
                {ward}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm text-gray-700">
          Số nhà, tên đường *
          <input
            className={inputClass}
            value={value.line1}
            autoComplete="address-line1"
            onChange={(e) => patch({ line1: e.target.value })}
            placeholder="123 Nguyễn Huệ"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Mã bưu điện (5-6 số) *
          <input
            className={inputClass}
            value={value.postal_code}
            inputMode="numeric"
            autoComplete="postal-code"
            onChange={(e) => patch({ postal_code: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            placeholder="100000"
          />
        </label>
      </div>

      <p className="text-xs text-gray-500">
        Số điện thoại 9–11 chữ số, mã bưu điện 5–6 số. Vui lòng điền đủ các trường có dấu *.
      </p>
    </div>
  );
}
