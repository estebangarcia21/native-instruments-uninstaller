import { NISoftware } from 'main/contextBridge/libs/nativeInstruments';

export default (search: string) => {
  const isSearching = search !== '';

  return (s: NISoftware) => {
    const searchTokens = search.toLowerCase().trim().split(' ');

    const hasTokens = searchTokens.reduce<boolean>((pv, cv) => {
      const nameTokens = s.name.split(' ');

      if (nameTokens.length < searchTokens.length) {
        return false;
      }

      return pv && s.name.toLowerCase().includes(cv);
    }, true);

    return isSearching ? hasTokens : true;
  };
};
