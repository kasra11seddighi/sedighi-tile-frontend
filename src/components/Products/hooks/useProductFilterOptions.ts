import { useEffect, useState } from "react";
import {
  getColorsRequest,
  getLocationsRequest,
  getSizesRequest,
  getStylesRequest,
} from "../services/products.service";
import type { FilterOption } from "../types/products.types";

// هر چهارتا لیست فیلتر (رنگ/سایز/استایل/مکان) رو با هم می‌گیره تا
// ProductFiltersBar مجبور نباشه چهارتا هوک جدا صدا بزنه. اگه یکی‌شون
// خطا بده، بقیه همچنان نمایش داده می‌شن (فقط همون یکی خالی می‌مونه).
export function useProductFilterOptions() {
  const [sizes, setSizes] = useState<FilterOption[]>([]);
  const [styles, setStyles] = useState<FilterOption[]>([]);
  const [colors, setColors] = useState<FilterOption[]>([]);
  const [locations, setLocations] = useState<FilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadOne(
      request: () => Promise<FilterOption[]>,
      setState: (data: FilterOption[]) => void,
    ) {
      try {
        const data = await request();
        if (isMounted) setState(data);
      } catch {
        if (isMounted) setState([]);
      }
    }

    Promise.all([
      loadOne(getSizesRequest, setSizes),
      loadOne(getStylesRequest, setStyles),
      loadOne(getColorsRequest, setColors),
      loadOne(getLocationsRequest, setLocations),
    ]).finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { sizes, styles, colors, locations, isLoading };
}
