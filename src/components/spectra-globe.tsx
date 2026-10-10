const meridians = [0, 35, 70, 110, 145];
const parallels = [24, 40, 60, 80];

export function SpectraGlobe() {
  return (
    <div className="spectra-globe" aria-hidden="true">
      <div className="spectra-globe-core">
        <div className="spectra-globe-mesh">
          {meridians.map((angle) => (
            <i key={`m-${angle}`} style={{ "--angle": `${angle}deg` } as React.CSSProperties} />
          ))}
          {parallels.map((top) => (
            <i key={`p-${top}`} style={{ "--top": `${top}%` } as React.CSSProperties} />
          ))}
        </div>
        <span className="spectra-globe-shine" />
      </div>
      <span className="spectra-globe-halo" />
      <span className="spectra-globe-orbit spectra-globe-orbit-one" />
      <span className="spectra-globe-orbit spectra-globe-orbit-two" />
    </div>
  );
}
