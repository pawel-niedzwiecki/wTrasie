export function separateArrayAt<T>(data: T[], index: number): { initialElements: T[], remainingElements: T[] } {
  const initialElements = data.slice(0, index);
  const remainingElements = data.slice(index);

  return { initialElements, remainingElements };
}
