/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObservableContext } from './context';

export type Model<S, T> = (initState?: S) => T;

export type SyncAct = (...args: Array<any>) => any;

export interface ModelProviderProps<S> {
  initState?: S;
  children?: React.ReactNode;
}

export interface PivotProps<S, T> {
  model: Model<S, T>;
  initState?: S;
  container: React.MutableRefObject<ObservableContext<T>>;
  init(): void;
}

export interface ComposeProps<S> {
  initState?: S;
  models: Array<{
    Provider: React.FC<ModelProviderProps<unknown>>;
  }>;
  children?: React.ReactNode;
}

export type BusCb = <T>(...args: Array<unknown>) => T;

export interface Contexts<T = unknown> {
  SpecContext: React.Context<ObservableContext<T>>;
  CommonContext: React.Context<T>;
}
