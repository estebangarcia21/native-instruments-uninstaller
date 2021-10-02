import { searchForNISoftware } from '../searchForNISoftware';

describe('NI Software Searcher', () => {
  it('searches for software based on a name', () => {
    const results = searchForNISoftware('Application', 'Dirt');

    console.log(results);

    expect(results.length).toBeGreaterThan(0);
  });
});
