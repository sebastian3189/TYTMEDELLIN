// Iconos de línea en SVG en línea (sin CDN ni librería). Los trazados son los de Lucide (ISC), los mismos que usa el sitio oficial (tnt-colombia-connect).
const P = (d) => ['path', { d }], C = (cx, cy, r) => ['circle', { cx, cy, r }], L = (x1, y1, x2, y2) => ['line', { x1, y1, x2, y2 }], R = (x, y, width, height, rx) => ['rect', { x, y, width, height, rx }];
const NODES = {
  snowflake: [P('m10 20-1.25-2.5L6 18'), P('M10 4 8.75 6.5 6 6'), P('m14 20 1.25-2.5L18 18'), P('m14 4 1.25 2.5L18 6'), P('m17 21-3-6h-4'), P('m17 3-3 6 1.5 3'), P('M2 12h6.5L10 9'), P('m20 10-1.5 2 1.5 2'), P('M22 12h-6.5L14 15'), P('m4 10 1.5 2L4 14'), P('m7 21 3-6-1.5-3'), P('m7 3 3 6h4')],
  armchair: [P('M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3'), P('M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z'), P('M5 18v2'), P('M19 18v2')],
  wifi: [P('M12 20h.01'), P('M2 8.82a15 15 0 0 1 20 0'), P('M5 12.859a10 10 0 0 1 14 0'), P('M8.5 16.429a5 5 0 0 1 7 0')],
  usb: [C(10, 7, 1), C(4, 20, 1), P('M4.7 19.3 19 5'), P('m21 3-3 1 2 2Z'), P('M9.26 7.68 5 12l2 5'), P('m10 14 5 2 3.5-3.5'), P('m18 12 1-1 1 1-1 1Z')],
  music: [P('M9 18V5l12-2v13'), C(6, 18, 3), C(18, 16, 3)],
  luggage: [P('M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2'), P('M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14'), P('M10 20h4'), C(16, 20, 2), C(8, 20, 2)],
  frame: [L(22, 6, 2, 6), L(22, 18, 2, 18), L(6, 2, 6, 22), L(18, 2, 18, 22)],
  mic: [P('M12 19v3'), P('M19 10v2a7 7 0 0 1-14 0v-2'), R(9, 2, 6, 13, 3)],
  refrigerator: [P('M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z'), P('M5 10h14'), P('M15 7v6')],
  lightbulb: [P('M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'), P('M9 18h6'), P('M10 22h4')],
  monitorPlay: [P('M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z'), P('M12 17v4'), P('M8 21h8'), R(2, 3, 20, 14, 2)],
  thermometer: [P('M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z')],
  users: [P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'), P('M16 3.128a4 4 0 0 1 0 7.744'), P('M22 21v-2a4 4 0 0 0-3-3.87'), C(9, 7, 4)],
  share: [C(18, 5, 3), C(6, 12, 3), C(18, 19, 3), L(8.59, 13.51, 15.42, 17.49), L(15.41, 6.51, 8.59, 10.49)],
  mail: [P('m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7'), R(2, 4, 20, 16, 2)],
  link: [P('M9 17H7A5 5 0 0 1 7 7h2'), P('M15 7h2a5 5 0 1 1 0 10h-2'), L(8, 12, 16, 12)],
  check: [P('M20 6 9 17l-5-5')],
  more: [C(12, 12, 1), C(19, 12, 1), C(5, 12, 1)],
};
export default function Icon({ name, size = 16, className = '' }) {
  return (
    <svg className={`ico ${className}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {NODES[name].map(([tag, attrs], i) => { const T = tag; return <T key={i} {...attrs} />; })}
    </svg>
  );
}
