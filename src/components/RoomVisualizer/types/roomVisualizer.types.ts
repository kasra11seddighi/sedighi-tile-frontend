export interface TileOption {
  id: string;
  title: string;
  /** نام دسته‌بندی محصول (کاشی، سرامیک، پرسلان و ...) - از بک‌اند می‌آید */
  type: string;
  image?: string;
}

export interface RoomExample {
  id: string;
  title: string;
  image: string;
}

export interface RoomVisualizerResult {
  resultImage: string;
  tileId: string;
}
