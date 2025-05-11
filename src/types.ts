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
  ranking_life?: number;
  health?: number | null;
  ranking_health?: number;
  education?: number | null;
  ranking_education?: number;
  protection?: number | null;
  ranking_protection?: number;
  environment?: number | null;
  ranking_child_rights_environment?: number;
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

export interface HoverHandlerOptions {
  world: any;
  data: CountryData[];
  tooltip: HTMLElement;
  infoPanel: HTMLElement;
  getHoverD: () => GeoJsonFeature | null;
  setHoverD: (d: GeoJsonFeature | null) => void;
  animateDesaturation: (
    world: any,
    target: number,
    duration?: number,
    onComplete?: () => void
  ) => void;
}
