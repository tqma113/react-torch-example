import * as React from 'react';
import { Model, BusCb, Contexts } from './types';

export class ObservableContext<T> {
  public observers: Set<() => void>;

  public state?: T;

  public buses: Record<string, BusCb>;

  constructor(state?: T) {
    this.observers = new Set();
    this.state = state;

    this.buses = {};
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer();
    }
  }
}

const ContextRegistry = new WeakMap<Model<any, any>, Contexts>();
export function getContexts<S, T>(model: Model<S, T>): Contexts<T> {
  if (ContextRegistry.has(model)) {
    return ContextRegistry.get(model) as Contexts<T>;
  } else {
    const SpecContext: React.Context<ObservableContext<T>> = React.createContext(new ObservableContext<T>());
    const CommonContext: React.Context<T> = React.createContext<T>(null as any);
    const ret = {
      SpecContext,
      CommonContext,
    } as Contexts<T>;
    ContextRegistry.set(model, ret as Contexts<unknown>);
    return ret;
  }
}
