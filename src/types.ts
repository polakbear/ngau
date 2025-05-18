export interface IndicatorEntry {
  indicator_type: string;
  value_total?: number;
  value_female?: number | null;
  value_male?: number | null;
  value_female_15?: number | null;
  value_female_18?: number | null;
  value_male_18?: number | null;
  value_girls_0_14?: number | null;
  value_urban?: number | null;
  value_rural?: number | null;
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
  ranking_environment?: number;
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

export type TooltipState = {
  x: number;
  y: number;
  countryName: string;
  country: CountryData | undefined;
} | null;

export type InfoPanelState = {
  countryName: string;
  country: CountryData | undefined;
} | null;

export type TooltipSetter = React.Dispatch<React.SetStateAction<TooltipState>>;

export type InfoPanelSetter = React.Dispatch<
  React.SetStateAction<CountryData | null>
>;

export type ScoreType = keyof CountryData | 'overall' | 'organizations';

export type Nullable = number | null | undefined;

export interface HoverHandlerOptions {
  world: any;
  data: CountryData[];
  setTooltip: React.Dispatch<React.SetStateAction<TooltipState | null>>;
  setInfoPanel: React.Dispatch<React.SetStateAction<string | null>>;
  setHoverD: (d: GeoJsonFeature | null) => void;
  animateDesaturation: (
    world: any,
    target: number,
    duration?: number,
    onComplete?: () => void
  ) => void;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
