/**
 * Código QR de demo: patrón dibujado localmente, no depende de ningún
 * servicio externo ni imagen. Puerto 1:1 del algoritmo `drawQR()` del
 * prototipo (grid de 25x25 + "finder pattern" en las tres esquinas).
 */
const N = 25;

function seed(i: number, j: number): boolean {
  return ((i * 29 + j * 17 + ((i * j) % 7) * 13) % 11) < 5;
}

function finder(x: number, y: number): React.ReactNode[] {
  const rects: React.ReactNode[] = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const border = i === 0 || i === 6 || j === 0 || j === 6;
      const core = i > 1 && i < 5 && j > 1 && j < 5;
      if (border || core) {
        rects.push(<rect key={`f-${x}-${y}-${i}-${j}`} x={x + j} y={y + i} width={1} height={1} />);
      }
    }
  }
  return rects;
}

export function Qr() {
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const inFinderZone = (i < 8 && j < 8) || (i < 8 && j > N - 9) || (i > N - 9 && j < 8);
      if (inFinderZone) continue;
      if (seed(i, j)) cells.push(<rect key={`c-${i}-${j}`} x={j} y={i} width={1} height={1} />);
    }
  }

  return (
    <div className="qr" title="Vista de demo del código · abre la postulación del candidato en el teléfono">
      <svg viewBox={`0 0 ${N} ${N}`} style={{ width: '100%', height: '100%', display: 'block' }} fill="#0D2038">
        {cells}
        {finder(0, 0)}
        {finder(N - 7, 0)}
        {finder(0, N - 7)}
      </svg>
    </div>
  );
}
