/* eslint-disable @typescript-eslint/no-explicit-any, no-shadow, no-multi-assign, react-hooks/rules-of-hooks */
import React from 'react';
import { ObservableContext, getContexts } from './context';
import { Model, ModelProviderProps, SyncAct, BusCb } from './types';
import { shallowCompare } from './utils';

export function createModel<S, T>(
  model: Model<S, T>
): {
    Provider: React.FC<ModelProviderProps<S>>;
    ClassConsumer: React.Consumer<T>;
    useModel: (deps?: (state: T) => Array<unknown>) => T;
    useSyncAct: <P extends SyncAct>(act: P) => P;
    useBus: <F extends BusCb>(key: string, cb?: F) => F;
  } {
  let sharedSyncActsRef: React.MutableRefObject<Set<SyncAct>>;

  const getSyncActsRef = (): React.MutableRefObject<Set<SyncAct>> => sharedSyncActsRef;

  const { SpecContext, CommonContext } = getContexts(model);

  // !NOT RECOMMENDED, there shall be a better way to do this
  const ClassConsumer: React.Consumer<T> = CommonContext.Consumer;

  const Provider = function Provider({ initState, children }: ModelProviderProps<S>): JSX.Element | null {
    const containerRef = React.useRef<ObservableContext<T>>(new ObservableContext());

    const state = model(initState);
    containerRef.current.state = state;

    React.useEffect(() => {
      containerRef.current?.notify();
    });

    const [ready, setReady] = React.useState<boolean>(false);

    React.useEffect(() => {
      setReady(true);
    }, []);

    return ready ? (
      <CommonContext.Provider value={state}>
        <SpecContext.Provider value={containerRef.current}>{children}</SpecContext.Provider>
      </CommonContext.Provider>
    ) : null;
  };

  const useModel = function (depCb?: (state: T) => Array<unknown>): T {
    const { SpecContext, CommonContext } = getContexts(model);
    if (!depCb) {
      return React.useContext(CommonContext);
    }
    const sealedDepCb = React.useCallback(depCb, []);


    const container = React.useContext<ObservableContext<T>>(SpecContext);

    const [state, setState] = React.useState<T>(container.state as T);
    const prevDepsRef = React.useRef<unknown[]>([]);
    const syncActsRef = React.useRef(new Set<SyncAct>());
    sharedSyncActsRef = syncActsRef;

    React.useEffect(() => {
      const observer = (): void => {
        const prev = prevDepsRef.current;
        const curr = sealedDepCb(container.state!);
        if (!shallowCompare(prev, curr)) {
          setState(container.state!);
        }
        prevDepsRef.current = curr;
      };
      for (const act of syncActsRef.current) {
        act();
      }
      syncActsRef.current.clear();
      container.observers.add(observer);
      return (): void => {
        container.observers.delete(observer);
      };
    }, []);

    return state;
  };

  const useSyncAct = function <T extends SyncAct> (act: T): T {
    const syncActsRef = getSyncActsRef();
    const ret: T = function (...args: Array<any>) {
      syncActsRef.current.add(() => {
        act(...args);
      });
    } as T;

    return ret;
  };

  const useBus = function <F extends BusCb> (key: string, cb?: F): F {
    const { SpecContext } = getContexts(model);
    const container = React.useContext<ObservableContext<T>>(SpecContext);

    if (!cb) {
      return container.buses[key] as F;
    }

    return (container.buses[key] = cb);
  };

  return {
    Provider,
    ClassConsumer,
    useModel,
    useSyncAct,
    useBus,
  };
}

export const useModel = <S, T>(model: Model<S, T>, depCb?: (state: T) => Array<unknown>): T => {
  return createModel(model).useModel(depCb)
}