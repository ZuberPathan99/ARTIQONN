import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
await copyFile(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'public/fonts/inter-latin-wght-normal.woff2',
);
await copyFile(
  'node_modules/@fontsource-variable/inter/LICENSE',
  'public/fonts/OFL.txt',
);

const svg = (width, height, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
const torus = [];
const project = (u, v) => {
  const radius = 180 + 68 * Math.cos(v);
  const x = radius * Math.cos(u);
  const y = radius * Math.sin(u);
  const z = 68 * Math.sin(v);
  const ry = y * Math.cos(0.92) - z * Math.sin(0.92);
  const rz = y * Math.sin(0.92) + z * Math.cos(0.92);
  const rx = x * Math.cos(0.34) + rz * Math.sin(0.34);
  return [
    340 + rx * Math.cos(-0.6) - ry * Math.sin(-0.6),
    340 + rx * Math.sin(-0.6) + ry * Math.cos(-0.6),
    rz,
  ];
};
for (let i = 0; i < 88; i++) {
  const u = (i / 88) * Math.PI * 2;
  const points = Array.from({ length: 65 }, (_, j) =>
    project(u, (j / 64) * Math.PI * 2),
  );
  const depth =
    points.reduce((sum, point) => sum + point[2], 0) / points.length;
  torus.push({
    depth,
    path: `<path d="${points.map((point, j) => `${j ? 'L' : 'M'}${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join('')}Z" fill="none" stroke="url(#silver)" stroke-width="${depth > 0 ? '1.4' : '.8'}" opacity="${depth > 0 ? '.95' : '.42'}"/>`,
  });
}
const convergence = svg(
  680,
  680,
  `<defs><linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3f3e9"/><stop offset=".42" stop-color="#b5b5ac"/><stop offset=".7" stop-color="#52524e"/><stop offset="1" stop-color="#deded4"/></linearGradient></defs>${torus
    .sort((a, b) => a.depth - b.depth)
    .map((item) => item.path)
    .join(
      '',
    )}<path d="M77 119h12m-6-6v12M591 551h12m-6-6v12" stroke="#62625c" stroke-width=".6"/>`,
);
await writeFile('public/images/convergence.svg', convergence);
const heroRaster = new Resvg(convergence, {
  fitTo: { mode: 'width', value: 1280 },
})
  .render()
  .asPng();
for (const width of [320, 480, 640, 1280]) {
  await sharp(heroRaster)
    .resize(width)
    .flatten({ background: '#080808' })
    .webp({ quality: 80, effort: 6 })
    .toFile(`public/images/convergence-${width}.webp`);
}

const still = svg(
  1200,
  900,
  `<defs><linearGradient id="arch" x1="0" x2="1"><stop stop-color="#9d9b92"/><stop offset=".5" stop-color="#e2dfd4"/><stop offset="1" stop-color="#b3b0a4"/></linearGradient><linearGradient id="vase"><stop stop-color="#67685f"/><stop offset=".5" stop-color="#b4b4a9"/><stop offset="1" stop-color="#6a6a60"/></linearGradient></defs><path fill="#d0cec5" d="M0 0h1200v900H0z"/><path fill="#efeee8" d="M65 75h1070v750H65z"/><g font-family="Arial,sans-serif" fill="#24251f"><text x="110" y="130" font-size="23" font-weight="bold" letter-spacing="-1">still objects.</text><text x="730" y="125" font-size="11">Collection</text><text x="835" y="125" font-size="11">Our philosophy</text><text x="1012" y="125" font-size="11">Bag (0)</text><path d="M110 153h980" stroke="#cfcec6"/><text x="115" y="213" font-size="9" letter-spacing="2">CONSIDERED OBJECTS. EVERYDAY RITUALS.</text><text x="105" y="314" font-size="81" letter-spacing="-6">Objects.</text><text x="105" y="397" font-size="81" letter-spacing="-6">Without</text><text x="105" y="480" font-size="81" letter-spacing="-6">excess.</text><text x="113" y="535" font-size="12" fill="#67675e">Thoughtfully shaped. Made to find a place</text><text x="113" y="556" font-size="12" fill="#67675e">in the moments that make up your day.</text><path d="M113 595h155" stroke="#44453b"/><text x="113" y="583" font-size="11">Explore the collection</text><text x="257" y="583" font-size="17">↗</text></g><path d="M623 574l140-48 290 49-139 54z" fill="#d8d6ca"/><path d="M682 556V359a145 145 0 0 1 290 0v197h-83V361a62 62 0 0 0-124 0v195z" fill="url(#arch)"/><path d="M682 556l22 9h83l-22-9zm207 0l22 9h83l-22-9z" fill="#8c8b80"/><rect x="650" y="621" width="358" height="1" fill="#b8b7ab"/><g font-family="Arial,sans-serif" font-size="10" fill="#53544a"><text x="650" y="645">01 / THE ARCH</text><text x="949" y="645">Stone series</text></g><path d="M110 688h980" stroke="#cfcec6"/><g fill="#e1dfd5"><path d="M110 713h294v73H110zM430 713h294v73H430zM750 713h340v73H750z"/></g><g font-family="Arial,sans-serif" fill="#54554d" font-size="11"><text x="132" y="752">Objects with intention.</text><text x="452" y="752">A quieter kind of living.</text><text x="773" y="752">Explore our point of view ↗</text></g>`,
);
await writeFile('public/images/still-objects.svg', still);

const emblem = Array.from(
  { length: 12 },
  (_, index) =>
    `<path d="M0-84C57-84 71-45 0 0C-71-45-57-84 0-84Z" fill="none" stroke="currentColor" stroke-width="2.3" transform="rotate(${index * 30})"/>`,
).join('');
const field = svg(
  1200,
  900,
  `<path fill="#c3c2b9" d="M0 0h1200v900H0z"/><path fill="#acaca3" d="M0 720l1200-185v365H0z"/><g transform="translate(278 420) rotate(-12)"><rect x="-205" y="-265" width="437" height="570" fill="#94958c"/><rect x="-218" y="-280" width="430" height="570" fill="#181b17"/><g transform="translate(0 -35) scale(1.35)" color="#e4e5da">${emblem}</g><g fill="#e4e5da" font-family="Arial,sans-serif"><text x="-161" y="195" font-size="42" letter-spacing="-2">Form &amp; Field</text><text x="-157" y="223" font-size="9" letter-spacing="1.5">SPACES FOR A CONSIDERED LIFE.</text></g><path d="M-160-220h22m-11-11v22" stroke="#e4e5da"/></g><g transform="translate(855 424) rotate(10)"><rect x="-239" y="-288" width="470" height="572" fill="#adada3"/><rect x="-250" y="-300" width="470" height="572" fill="#eeeee5"/><g font-family="Arial,sans-serif" fill="#262a23"><text x="-205" y="-232" font-size="24" letter-spacing="-1">Form &amp; Field</text><text x="-205" y="-199" font-size="8" letter-spacing="1">ARCHITECTURE / INTERIORS / PERSPECTIVE</text><text x="-205" y="69" font-size="56" letter-spacing="-3">Built around</text><text x="-205" y="128" font-size="56" letter-spacing="-3">the way</text><text x="-205" y="187" font-size="56" letter-spacing="-3">you live.</text><text x="-205" y="238" font-size="8" letter-spacing="1.5">A BRAND IDENTITY EXPLORATION</text></g><g transform="translate(143 -225) scale(.36)" color="#262a23">${emblem}</g><path d="M-205-156h378" stroke="#bcbfb0"/></g>`,
);
await writeFile('public/images/form-field.svg', field);

const task = (x, y, title, category, bars) =>
  `<g transform="translate(${x} ${y})"><rect width="215" height="128" rx="5" fill="#fff" stroke="#e2e3dd"/><text x="16" y="25" font-family="Arial" font-size="8" fill="#868a7e">${category}</text><text x="16" y="49" font-family="Arial" font-size="12" fill="#282d23">${title}</text>${Array.from({ length: bars }, (_, i) => `<rect x="16" y="${66 + i * 8}" width="${160 - i * 38}" height="3" rx="1" fill="#e2e4dd"/>`).join('')}<circle cx="26" cy="108" r="9" fill="#d4d8ca"/><text x="23" y="111" font-size="7" fill="#4e5742" font-family="Arial">A</text><text x="170" y="111" font-family="Arial" font-size="8" fill="#8b8e83">↗ 02</text></g>`;
const clarity = svg(
  1200,
  900,
  `<path fill="#d5d9ce" d="M0 0h1200v900H0z"/><rect x="62" y="94" width="1080" height="713" rx="12" fill="#b5bbab"/><rect x="50" y="80" width="1080" height="713" rx="10" fill="#f5f6f0"/><path fill="#e9ece2" d="M60 80h174v713H60a10 10 0 0 1-10-10V90a10 10 0 0 1 10-10z"/><g font-family="Arial" fill="#394032"><text x="78" y="131" font-size="26" font-weight="bold" letter-spacing="-1.5">clarity.</text><rect x="71" y="179" width="141" height="33" rx="5" fill="#d5dccb"/><text x="86" y="200" font-size="11">▧  Workspace</text><text x="86" y="247" font-size="11">◷  My tasks</text><text x="86" y="292" font-size="11">▢  Projects</text><text x="86" y="337" font-size="11">○  Activity</text><text x="82" y="420" font-size="8" letter-spacing="1">YOUR SPACES</text><text x="86" y="458" font-size="11">↗  Studio</text><text x="86" y="496" font-size="11">↗  Product</text><text x="86" y="739" font-size="10">Settings &amp; preferences</text><text x="278" y="130" font-size="10" fill="#8d9386">Workspace / Studio</text><text x="278" y="197" font-size="31" letter-spacing="-1.5">A little room to focus.</text><text x="278" y="224" font-size="11" fill="#8d9386">Your projects, your pace. Make space for what matters.</text><text x="279" y="285" font-size="10">Board view</text><text x="371" y="285" font-size="10" fill="#8d9386">List view</text><path d="M278 303h808" stroke="#dce0d4"/><text x="279" y="340" font-size="11">To do <tspan fill="#8d9386">03</tspan></text><text x="548" y="340" font-size="11">In progress <tspan fill="#8d9386">02</tspan></text><text x="819" y="340" font-size="11">Done <tspan fill="#8d9386">01</tspan></text></g><rect x="972" y="176" width="112" height="32" rx="4" fill="#3e4935"/><text x="988" y="197" font-family="Arial" font-size="10" fill="#f5f6f0">+  Create task</text>${task(278, 364, 'Explore the possibilities', 'DESIGN', 2)}${task(278, 510, 'Map the user journey', 'DISCOVERY', 3)}${task(548, 364, 'Bring the idea to life', 'DEVELOPMENT', 2)}${task(548, 510, 'Refine the details', 'DESIGN', 2)}${task(818, 364, 'Find the direction', 'STRATEGY', 3)}`,
);
await writeFile('public/images/clarity.svg', clarity);
const rings = Array.from(
  { length: 38 },
  (_, i) =>
    `<ellipse cx="600" cy="438" rx="${(130 + i * 4.2).toFixed(1)}" ry="${(270 - i * 3.5).toFixed(1)}" fill="none" stroke="${i % 3 === 0 ? '#c3c4b8' : '#797c70'}" stroke-width="1.4" transform="rotate(${i * 3.4} 600 438)"/>`,
).join('');
await writeFile(
  'public/images/light-matter.svg',
  svg(
    1200,
    900,
    `<path fill="#11130f" d="M0 0h1200v900H0z"/><path d="M65 80h1070M65 813h1070" stroke="#41473a"/><g fill="#9fa491" font-family="Arial" font-size="10" letter-spacing="2"><text x="66" y="61">ARTIQONN STUDIO / VISUAL EXPERIMENT 004</text><text x="984" y="61">FORM STUDIES</text><text x="66" y="847">LIGHT / MATTER</text><text x="939" y="847">ART DIRECTION — 01</text></g>${rings}<text x="600" y="456" text-anchor="middle" fill="#edf0e3" font-family="Arial" font-size="48" letter-spacing="-2">Light / Matter</text>`,
  ),
);
await writeFile(
  'public/images/social-preview.svg',
  svg(
    1200,
    630,
    `<path fill="#080808" d="M0 0h1200v630H0z"/><g fill="#f5f5f3" font-family="Arial"><text x="65" y="95" font-size="35" font-weight="bold" letter-spacing="-2">ARTIQONN</text><text x="65" y="263" font-size="100" letter-spacing="-6">Technology</text><text x="65" y="370" font-size="100" letter-spacing="-6" fill="#999a91">Meets Creativity.</text><text x="65" y="555" font-size="17" letter-spacing="1">TECHNOLOGY &amp; DESIGN COMPANY</text></g><path d="M65 478h1070" stroke="#444"/>`,
  ),
);
const { readFile } = await import('node:fs/promises');
const social = new Resvg(await readFile('public/images/social-preview.svg'), {
  font: { loadSystemFonts: true },
});
await writeFile('public/images/social-preview.png', social.render().asPng());
console.log('Original SVG artwork and self-hosted Inter font are ready.');
