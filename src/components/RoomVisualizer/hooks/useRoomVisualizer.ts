import { useEffect, useState } from "react";
import { applyTileToRoom, getAiTileSuggestion } from "../services/roomVisualizer.service";
import { getTileProducts, type TileProductDto } from "../services/tileCatalog.service";
import { demoAfterImage, demoBeforeImage } from "../data/mockExamples";
import type { RoomExample, TileOption } from "../types/roomVisualizer.types";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

// بک‌اند مسیر نسبی برمی‌گردونه (مثلاً /uploads/results/xxx.jpg یا /uploads/products/xxx.jpg)
// چون فایل‌های استاتیک از پوشه public سرو می‌شن، باید آدرس سرور جلوش اضافه بشه

function mapProductToTile(product: TileProductDto): TileOption {
  const categoryName =
    typeof product.category === "object" && product.category ? product.category.name : "متفرقه";

  return {
    id: product._id,
    title: product.name,
    type: categoryName,
    image: product.images?.[0] ? resolveImageUrl(product.images[0]) : undefined,
  };
}

export function useRoomVisualizer(initialTileId?: string) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [resultImage, setResultImage] = useState<string>("");

  const [tiles, setTiles] = useState<TileOption[]>([]);
  const [isLoadingTiles, setIsLoadingTiles] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState<TileOption | undefined>();

  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");

  // کاشی‌های واقعی رو یک‌بار موقع mount شدن از دیتابیس می‌گیریم
  useEffect(() => {
    loadTiles();
  }, []);

  // وقتی از کارت یه محصولِ کاشی/سرامیک (مثلاً از صفحه اصلی یا صفحه محصولات)
  // اینجا میایم، به محض لود شدن کاتالوگ، همون کاشی به‌صورت خودکار انتخاب
  // و مودال براش باز می‌شه
  useEffect(() => {
    if (!initialTileId || tiles.length === 0) return;

    const matched = tiles.find((tile) => tile.id === initialTileId);
    if (matched) {
      setSelectedTile(matched);
      setIsModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTileId, tiles]);

  async function loadTiles() {
    try {
      setIsLoadingTiles(true);
      const products = await getTileProducts();
      setTiles(products.map(mapProductToTile));
    } catch {
      setError("خطا در دریافت لیست کاشی‌ها از سرور");
    } finally {
      setIsLoadingTiles(false);
    }
  }

  function handleFileSelect(file: File) {
    setUploadedFile(file);
    setUploadedImageUrl(URL.createObjectURL(file));
    setResultImage("");
    setError("");
  }

  function selectExampleRoom(room: RoomExample) {
    setUploadedFile(null);
    setUploadedImageUrl(room.image);
    setResultImage("");
    setError("");
  }

  function openTileModal() {
    setError("");
    setIsModalOpen(true);
  }

  function closeTileModal() {
    setIsModalOpen(false);
  }

  function selectTile(tile: TileOption) {
    setSelectedTile(tile);
  }

  async function requestAiSuggestion() {
    try {
      setIsSuggesting(true);

      if (uploadedFile) {
        const { tileId } = await getAiTileSuggestion(uploadedFile);
        const suggested = tiles.find((t) => t.id === tileId);
        if (suggested) setSelectedTile(suggested);
      } else if (tiles.length > 0) {
        // بدون عکس آپلودی، یک پیشنهاد نمونه از کاتالوگ واقعی انتخاب می‌شود
        const fallback = tiles[Math.floor(Math.random() * tiles.length)];
        setSelectedTile(fallback);
      }
    } catch {
      setError("خطا در دریافت پیشنهاد هوش مصنوعی");
    } finally {
      setIsSuggesting(false);
    }
  }

  async function applyTile() {
    if (!selectedTile) return;

    // اگه کاربر هیچ عکسی آپلود نکرده و اتاق نمونه هم انتخاب نکرده، اجازه اعمال نده
    if (!uploadedImageUrl) {
      setError("لطفاً ابتدا عکس فضای خود را آپلود کنید یا یک اتاق نمونه انتخاب کنید.");
      return;
    }

    try {
      setIsApplying(true);
      setError("");

      if (uploadedFile) {
        const { resultImage } = await applyTileToRoom(uploadedFile, selectedTile.id);
        // resultImage چیزی شبیه "/uploads/results/result-xxx.jpg" است
        setResultImage(resolveImageUrl(resultImage));
      } else {
        // بدون فایل واقعی (مثلاً حالت نمونه فضا)، فعلاً تصویر دمو نمایش داده می‌شود
        setResultImage(demoAfterImage);
      }

      // فقط وقتی واقعاً نتیجه آماده شد، مودال بسته می‌شود
      setIsModalOpen(false);
    } catch {
      setError(
        "اعمال کاشی با هوش مصنوعی فعلاً در دسترس نیست (نیاز به فعال‌سازی اشتراک سرویس هوش مصنوعی دارد).",
      );
      // مودال عمداً باز می‌ماند تا کاربر پیام خطا را ببیند و دوباره تلاش کند
    } finally {
      setIsApplying(false);
    }
  }

  function reset() {
    setUploadedFile(null);
    setUploadedImageUrl("");
    setResultImage("");
    setSelectedTile(undefined);
    setError("");
  }

  return {
    beforeImage: uploadedImageUrl || demoBeforeImage,
    afterImage: resultImage || demoAfterImage,
    hasUploadedImage: Boolean(uploadedImageUrl),
    hasResult: Boolean(resultImage),

    tiles,
    isLoadingTiles,

    isModalOpen,
    selectedTile,
    isSuggesting,
    isApplying,
    error,

    handleFileSelect,
    selectExampleRoom,
    openTileModal,
    closeTileModal,
    selectTile,
    requestAiSuggestion,
    applyTile,
    reset,
  };
}
