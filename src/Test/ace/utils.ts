export function shallowCompare(prevDeps: Array<unknown>, currDeps: Array<unknown>): boolean {
  if (prevDeps === currDeps) {
    return true;
  }
  if (!prevDeps || !currDeps) {
    return false;
  }
  if (prevDeps.length !== currDeps.length) {
    return false;
  }
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== currDeps[i]) {
      return false;
    }
  }
  return true;
}
