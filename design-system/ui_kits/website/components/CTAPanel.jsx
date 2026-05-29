/* global React, Button */

function CTAPanel() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-panel">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(242,239,231,0.5)', marginBottom: 24 }}>
            [ 07 ] &nbsp; WORK WITH US
          </div>
          <h2 className="cta-headline">
            For governments processing waste,<br />
            for industries decarbonizing steel,<br />
            <em>for capital deploying at scale.</em>
          </h2>
          <div className="cta-actions">
            <Button variant="primary">Request a briefing</Button>
            <Button variant="outline">Download fact sheet</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CTAPanel });
