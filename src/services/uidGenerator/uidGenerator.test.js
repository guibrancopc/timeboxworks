import uidGenerator from '../uidGenerator';

const { getUid } = uidGenerator;

describe('Uid Generator', () => {
  it('first calling should return 1', () => {
    const result = getUid();
    expect(result).toBeGreaterThan(0);
  });

  it('should give a sequencial number for each calling', () => {
    const a = getUid();
    const b = getUid();
    const c = getUid();
    const d = getUid();
    const e = getUid();

    expect(e - d).toEqual(1);
    expect(d - c).toEqual(1);
    expect(c - b).toEqual(1);
    expect(b - a).toEqual(1);
  });
});
