import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const [brand, asset, input] = process.argv.slice(2);
const allowed = {
  nomara: ['cover', 'campaign', 'mobile'],
  'alder-and-form': ['cover', 'interior', 'craft'],
};
if (!allowed[brand]?.includes(asset) || !input)
  throw new Error(
    'Usage: node scripts/prepare-brand-images.mjs <nomara|alder-and-form> <asset> <source-image-path>',
  );
const directory = resolve('public/images/projects', brand);
await mkdir(directory, { recursive: true });
for (const width of [640, 960, 1600]) {
  const result = await sharp(input)
    .rotate()
    .resize({ width })
    .webp({ quality: 82, effort: 6 })
    .toFile(resolve(directory, `${asset}-${width}.webp`));
  console.log(
    `${brand}/${asset}-${width}.webp: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KiB`,
  );
}
