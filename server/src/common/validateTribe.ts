const tribeObject = {
  lion: 'lion',
  tiger: 'tiger',
  elephant: 'elephant',
  hippo: 'hippo',
  dinosaur: 'dinosaur',
};

export function validateTribe(tribe: string): string {
  if (!tribeObject[tribe]) {
    throw new Error('tribe data error');
  }
  return tribeObject[tribe];
}
