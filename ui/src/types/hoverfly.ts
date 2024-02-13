export type MatcherConfig = {
  ignoreUnknown?: boolean;
  ignoreOrder?: boolean;
  ignoreOccurrences?: boolean;
};

export type Delay = {
  delay: number;
  httpMethod?: string;
  urlPattern?: string;
};

export type LogNormalDelay = {
  max: number;
  mean: number;
  median: number;
  min: number;
};

export type FieldMatcher = {
  matcher?: 'exact' | 'glob' | 'regex' | 'json';
  value: string;
  config?: MatcherConfig;
  doMatch?: FieldMatcher;
};

export type ResponseHeaders = Record<string, string[]>;

export type RequestQueries = Record<string, FieldMatcher[]>;

export type RequestHeaders = Record<string, FieldMatcher[]>;

export type Request = {
  method?: FieldMatcher[];
  body?: FieldMatcher[];
  destination?: FieldMatcher[];
  headers?: RequestHeaders;
  path?: FieldMatcher[];
  query?: RequestQueries;
  requiresState?: Record<string, string>;
  scheme?: FieldMatcher[];
};

export type Response = {
  body?: string;
  bodyFile?: string;
  encodedBody?: boolean;
  fixedDelay?: number;
  headers?: ResponseHeaders;
  logNormalDelay?: LogNormalDelay;
  removesState?: string[];
  status?: number;
  templated?: boolean;
  transitionsState?: Record<string, string>;
};

export type RequestResponsePair = {
  request: Request;
  response: Response;
};

export type HoverflyMetadata = {
  hoverflyVersion?: string;
  schemaVersion: string;
  timeExported?: string;
};

export type HoverflySimulationData = {
  pairs: RequestResponsePair[];
  globalActions?: object;
};

export type HoverflySimulation = {
  data: HoverflySimulationData;
  meta?: HoverflyMetadata;
};
