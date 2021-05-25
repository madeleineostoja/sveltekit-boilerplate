import type { Meta } from '../../../@types/_generated/prismic';

export type PrismicDocument<T> = Meta & { data: T };
export type PrismicSlice = {
  slice_type: string;
  primary: any;
  items: any[];
};
export type PrismicImg = {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
};
