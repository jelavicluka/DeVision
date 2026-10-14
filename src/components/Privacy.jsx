import './Privacy.css';

export default function Privacy() {
  return (
    <main className="privacy-page" aria-labelledby="privacy-title">
      <header className="privacy-page__header">
        <span>Vaši podaci. Naša odgovornost.</span>
        <h1 id="privacy-title">Obavijest<br />o privatnosti.</h1>
        <p>Ovdje objašnjavamo koje podatke obrađujemo pri posjetu stranici i slanju upita, zašto ih trebamo i koja prava imate.</p>
        <small>Zadnje ažuriranje: 14. listopada 2026.</small>
      </header>

      <div className="privacy-page__content">
        <section aria-labelledby="privacy-controller">
          <h2 id="privacy-controller">01 / Tko obrađuje vaše podatke?</h2>
          <p>Voditelj obrade je <strong>DEVISION 1 d.o.o. za usluge</strong>, Put Brodarice 6, 21000 Split, Hrvatska, OIB: 90298379158, MBS: 060519275.</p>
          <p>Za pitanja o privatnosti i ostvarivanje svojih prava pišite na <a href="mailto:deni@devision.hr">deni@devision.hr</a>.</p>
        </section>

        <section aria-labelledby="privacy-data">
          <h2 id="privacy-data">02 / Koje podatke prikupljamo?</h2>
          <p>Kontaktni obrazac prikuplja ime i prezime, e-mail adresu, odabranu uslugu i sadržaj poruke. Naziv tvrtke ili brenda nije obvezan. Obrađujemo i podatak da ste upoznati s ovom obavijesti.</p>
          <p>Molimo da u poruku ne unosite osjetljive osobne podatke ni podatke drugih osoba koji nisu potrebni za vaš upit. Podatke koje nam pošaljete izravno e-mailom obrađujemo za istu svrhu kao i upite iz obrasca.</p>
          <p>Pri pristupu stranici i provjeri zaštite obrasca pružatelji tehničkih usluga obrađuju podatke poput IP adrese, podataka o pregledniku i uređaju te vremenu i okolnostima zahtjeva.</p>
        </section>

        <section aria-labelledby="privacy-purpose">
          <h2 id="privacy-purpose">03 / Zašto i na kojoj osnovi?</h2>
          <ul>
            <li><strong>Upiti o projektu i ponudi:</strong> kako bismo odgovorili, razumjeli vaše potrebe i poduzeli radnje na vaš zahtjev prije mogućeg sklapanja ugovora. Osnova je članak 6. stavak 1. točka (b) GDPR-a kada se radi o ugovoru s vama.</li>
            <li><strong>Ostali poslovni upiti i komunikacija s predstavnicima tvrtki:</strong> naš legitimni interes odgovoriti na primljeni upit i održavati poslovnu komunikaciju, prema članku 6. stavku 1. točki (f) GDPR-a.</li>
            <li><strong>Sigurnost stranice i sprječavanje spama:</strong> naš legitimni interes zaštititi stranicu, dostupnost usluge i komunikaciju od zlouporabe, prema članku 6. stavku 1. točki (f) GDPR-a.</li>
          </ul>
          <p>Slanje upita je dobrovoljno. Bez kontaktne adrese i podataka potrebnih za razumijevanje upita ne možemo obraditi obrazac ni odgovoriti. Upite ne koristimo za automatsku prijavu na newsletter ni za slanje nepovezanih promotivnih poruka.</p>
          <p>Potvrda uz obrazac služi potvrdi da ste upoznati s obaviješću. Ne predstavlja privolu za marketing. Ne provodimo automatizirano donošenje odluka s pravnim ili sličnim značajnim učincima niti profiliranje posjetitelja za oglašavanje.</p>
        </section>

        <section aria-labelledby="privacy-providers">
          <h2 id="privacy-providers">04 / Tko može pristupiti podacima?</h2>
          <p>Upit primamo u poslovni sandučić deni@devision.hr. Podacima pristupaju osobe kojima su potrebni za odgovor i održavanje usluga, u okviru njihovih ovlasti.</p>
          <ul>
            <li><strong>Cloudflare:</strong> hosting, isporuka i zaštita stranice te Turnstile provjera protiv automatiziranog slanja. Radi provjere obrasca Cloudflareu se prosljeđuju verifikacijski token i IP adresa posjetitelja. Više u <a href="https://www.cloudflare.com/privacypolicy/">Cloudflareovoj obavijesti o privatnosti</a>.</li>
            <li><strong>Resend (Plus Five Five, Inc.):</strong> slanje sadržaja obrasca na našu e-mail adresu. Uvjeti obrade dostupni su u <a href="https://resend.com/legal/dpa">Resendovu ugovoru o obradi podataka</a>.</li>
            <li><strong>Pružatelj poslovne e-pošte:</strong> zaprimanje i pohrana upita u našem sandučiću.</li>
            <li><strong>Google Fonts:</strong> učitavanje fonta Poppins s Googleovih poslužitelja. Preglednik pritom Googleu šalje tehničke podatke potrebne za zahtjev, uključujući IP adresu. Više u <a href="https://policies.google.com/privacy?hl=hr">Googleovim pravilima privatnosti</a>.</li>
          </ul>
          <p>Neki pružatelji obrađuju podatke i izvan Europskoga gospodarskog prostora, uključujući SAD. Za takve prijenose primjenjuju se odgovarajući mehanizmi zaštite prema GDPR-u; Resendov ugovor predviđa standardne ugovorne klauzule Europske komisije. Informacije o primjenjivim zaštitnim mjerama možete zatražiti na deni@devision.hr, a dodatne informacije dostupne su u dokumentima navedenih pružatelja.</p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">05 / Koliko dugo čuvamo upite?</h2>
          <p>Upite koji ne prerastu u poslovnu suradnju čuvamo najdulje <strong>12 mjeseci od zadnje komunikacije</strong>, nakon čega ih brišemo iz aktivnog poslovnog sandučića.</p>
          <p>Ako dođe do suradnje, relevantna komunikacija postaje dio dokumentacije poslovnog odnosa. Dokumente koje smo dužni čuvati na temelju zakona čuvamo u propisanim rokovima; dokumentaciju potrebnu za konkretan pravni zahtjev čuvamo do njegova konačnog rješavanja i isteka primjenjivih rokova za zaštitu prava.</p>
          <p>Rok od 12 mjeseci odnosi se na našu poslovnu komunikaciju. Tehnički zapisi i sigurnosne kopije pružatelja usluga imaju zasebne rokove prema njihovim ugovorima i postavkama. Informacije o rokovima koji se primjenjuju na vaš upit možete zatražiti na našoj kontaktnoj adresi.</p>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights">06 / Koja prava imate?</h2>
          <p>Možete zatražiti pristup svojim podacima i njihov ispravak, a pod uvjetima propisanim GDPR-om i brisanje ili ograničenje obrade. Kada se obrada temelji na ugovoru i provodi automatizirano, možete ostvariti pravo na prenosivost podataka.</p>
          <p>Na obradu koja se temelji na legitimnom interesu možete uložiti prigovor iz razloga povezanih s vašom posebnom situacijom. Prava nisu apsolutna; primjerice, obveza čuvanja određenog dokumenta može ograničiti pravo na brisanje.</p>
          <p>Zahtjev pošaljite na <a href="mailto:deni@devision.hr">deni@devision.hr</a>. Odgovorit ćemo bez nepotrebnog odgađanja, u pravilu u roku od mjesec dana. Ako je zbog složenosti zahtjeva potrebno dopušteno produljenje roka, obavijestit ćemo vas. Po potrebi možemo tražiti dodatne podatke radi provjere identiteta.</p>
          <p>Ako smatrate da obrada krši vaša prava, možete podnijeti pritužbu <a href="https://azop.hr/">Agenciji za zaštitu osobnih podataka (AZOP)</a>.</p>
        </section>

        <section aria-labelledby="privacy-cookies">
          <h2 id="privacy-cookies">07 / Kolačići i promjene obavijesti</h2>
          <p>Ova verzija stranice ne uključuje Google Analytics, Meta Pixel ni sustav prijave na newsletter. Zaštita i isporuka stranice mogu uključivati tehničke mehanizme pohrane i provjere koje upotrebljava Cloudflare. Informacije o obradi putem Turnstilea dostupne su u Cloudflareovoj obavijesti o privatnosti.</p>
          <p>Ako uvedemo dodatne alate ili promijenimo način obrade, ažurirat ćemo ovu obavijest i, kada je to potrebno, zatražiti odgovarajuću privolu prije uključivanja tih alata.</p>
        </section>
      </div>
    </main>
  );
}
