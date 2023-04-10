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
  matcher: string;
  value: any;
  config?: MatcherConfig;
  doMatch?: FieldMatcher;
};

export type Headers = Record<string, string[]>;

export type RequestQueries = Record<string, FieldMatcher[]>;

export type RequestHeaders = Record<string, FieldMatcher[]>;

export type Request = {
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
  headers?: Headers;
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

export type HoverflySimulation = {
  pairs: RequestResponsePair[];
};
