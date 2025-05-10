export interface IndicatorEntry {
  type: string;
  value_total: number;
  value_female?: number | null;
  value_male?: number | null;
  year?: number;
  data_source?: string;
}

export interface CountryData {
  country: string;
  kri_score: number | null;
  kri_rank?: number;
  life?: number | null;
  health?: number | null;
  education?: number | null;
  protection?: number | null;
  environment?: number | null;
  indicators?: IndicatorEntry[];
}

export interface GeoJsonFeature {
  type: string;
  properties: {
    ADMIN: string;
    NAME: string;
    NAME_LONG: string;
  };
}

export type Nullable = number | null | undefined;