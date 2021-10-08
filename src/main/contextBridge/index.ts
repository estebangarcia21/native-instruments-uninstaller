export default function lib<T>(
  name: string,
  contents: T
): ElectronContextIsolationLib<T> {
  return { name, contents };
}
