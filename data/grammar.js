// GRAMER NOTLARI
// Yeni konu eklemek için: { title: "Konu başlığı", body: "HTML içerik" },
// body içinde <p>, <ul><li>, <code> kullanabilirsin.
window.DATA = window.DATA || {};
window.DATA.grammar = [
  {
    title: "Tüm Zamanlar & Modallar — Tek Tabloda",
    pinned: true,
    body: `
      <div class="g-table-wrap"><table class="tg">
        <tr><th class="tg-h">PRESENT</th><th class="tg-h">PAST</th><th class="tg-h">FUTURE</th></tr>
        <tr>
          <td><div class="tg-title">Simple Present = NET <small>(-er / -ar)</small></div>
            <div class="g-active">Active = <code>V1/V5</code> <span class="tg-tr">(yapar)</span></div>
            <div class="g-passive">Passive = <code>am/is/are V3</code> <span class="tg-tr">(yapılır)</span></div>
          </td>
          <td><div class="tg-title">Simple Past = NET <small>(-dı / -di)</small></div>
            <div class="g-active">Active = <code>V2</code> <span class="tg-tr">(yaptı)</span></div>
            <div class="g-passive">Passive = <code>was/were V3</code> <span class="tg-tr">(yapıldı)</span></div>
          </td>
          <td><div class="tg-title">Simple Future = NET <small>(-ecek / -acak)</small></div>
            <div class="g-active">Active = <code>will V1</code> <span class="tg-tr">(yapacak)</span></div>
            <div class="g-passive">Passive = <code>will be V3</code> <span class="tg-tr">(yapılacak)</span></div>
          </td>
        </tr>
        <tr>
          <td><div class="tg-title">Present Cont. = NET <small>(-yor)</small></div>
            <div class="g-active">Active = <code>am/is/are Ving</code> <span class="tg-tr">(yapıyor)</span></div>
            <div class="g-passive">Passive = <code>am/is/are being V3</code> <span class="tg-tr">(yapılıyor)</span></div>
          </td>
          <td><div class="tg-title">Past Cont. = NET <small>(-yordu)</small></div>
            <div class="g-active">Active = <code>was/were Ving</code> <span class="tg-tr">(yapıyordu)</span></div>
            <div class="g-passive">Passive = <code>was/were being V3</code> <span class="tg-tr">(yapılıyordu)</span></div>
          </td>
          <td><div class="tg-title">Future Cont. = NET <small>(-yor olacak)</small></div>
            <div class="g-active">Active = <code>will be Ving</code> <span class="tg-tr">(yapıyor olacak)</span></div>
            <div class="g-passive">Passive = <code>will be being V3</code> <span class="tg-tr">(yapılıyor olacak)</span></div>
          </td>
        </tr>
        <tr class="tg-spacer"><td colspan="3"></td></tr>
        <tr>
          <td><div class="tg-title">Present Perfect = SÜREÇ <small>(-dı / -di)</small></div>
            <div class="g-active">Active = <code>have V3</code> <span class="tg-tr">(yaptı)</span></div>
            <div class="g-passive">Passive = <code>have been V3</code> <span class="tg-tr">(yapıldı)</span></div>
          </td>
          <td><div class="tg-title">Past Perfect = SÜREÇ <small>(-dı/-di –mıştı/-mişti)</small></div>
            <div class="g-active">Active = <code>had V3</code> <span class="tg-tr">(yaptı / yapmıştı)</span></div>
            <div class="g-passive">Passive = <code>had been V3</code> <span class="tg-tr">(yapıldı / yapılmıştı)</span></div>
          </td>
          <td><div class="tg-title">Future Perfect = SÜREÇ <small>(-mış olacak)</small></div>
            <div class="g-active">Active = <code>will have V3</code> <span class="tg-tr">(yapmış olacak)</span></div>
            <div class="g-passive">Passive = <code>will have been V3</code> <span class="tg-tr">(yapılmış olacak)</span></div>
          </td>
        </tr>
        <tr>
          <td><div class="tg-title">Present Perfect Cont. = SÜREÇ <small>(-yor)</small></div>
            <div class="g-active">Active = <code>have been Ving</code> <span class="tg-tr">(yapıyor)</span></div>
            <div class="g-passive">Passive = <code>have been being V3</code> <span class="tg-tr">(yapılıyor)</span></div>
          </td>
          <td><div class="tg-title">Past Perfect Cont. = SÜREÇ <small>(-yordu)</small></div>
            <div class="g-active">Active = <code>had been Ving</code> <span class="tg-tr">(yapıyordu)</span></div>
            <div class="g-passive">Passive = <code>had been being V3</code> <span class="tg-tr">(yapılıyordu)</span></div>
          </td>
          <td><div class="tg-title">Future Perfect Cont. = SÜREÇ <small>(-yor olacak)</small></div>
            <div class="g-active">Active = <code>will have been Ving</code> <span class="tg-tr">(yapıyor olacak)</span></div>
            <div class="g-passive">Passive = <code>will have been being V3</code> <span class="tg-tr">(yapılıyor olacak)</span></div>
          </td>
        </tr>
        <tr class="tg-thick"><td colspan="3"></td></tr>
        <tr>
          <td><div class="tg-title">MODAL ÇEKİMLERİ</div>
            <div class="g-active">Active = <code>can V1</code> <span class="tg-tr">(yapabilir)</span></div>
            <div class="g-passive">Passive = <code>can be V3</code> <span class="tg-tr">(yapılabilir)</span></div>
            <div class="g-active">Active = <code>could V1</code> <span class="tg-tr">(yapabilirdi)</span></div>
            <div class="g-passive">Passive = <code>could be V3</code> <span class="tg-tr">(yapılabilirdi)</span></div>
            <div class="g-active">Active = <code>can be Ving</code> <span class="tg-tr">(yapıyor olabilir)</span></div>
            <div class="g-active">Active = <code>could have V3</code> <span class="tg-tr">(yapabilirdi ama yapmadı)</span></div>
            <div class="g-passive">Passive = <code>could have been V3</code> <span class="tg-tr">(yapılabilirdi ama yapılmadı)</span></div>
            <div class="g-active">Active = <code>would V1</code> <span class="tg-tr">(yapardı — unreal/reported/alışkanlık)</span></div>
            <div class="g-active">Active = <code>would be Ving</code> <span class="tg-tr">(yapıyor olurdu)</span></div>
            <div class="g-active">Active = <code>would have V3</code> <span class="tg-tr">(yapardı ama yapmadı / yapmış olacağını)</span></div>
          </td>
          <td><div class="tg-title">PRESENT MODALS</div>
            <div class="tg-line"><code>can V1</code> <span class="tg-tr">(ihtimal/yetenek)</span></div>
            <div class="tg-line"><code>may V1</code> <span class="tg-tr">(ihtimal)</span></div>
            <div class="tg-line"><code>must V1</code> <span class="tg-tr">(zorunluluk/ihtimal)</span></div>
            <div class="tg-line"><code>should V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>ought to V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>had better V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>need to V1</code> <span class="tg-tr">(gereklilik)</span></div>
            <div class="tg-line"><code>would V1</code> <span class="tg-tr">(unreal şart / reported speech / geçmiş alışkanlık)</span></div>
            <div class="tg-title" style="margin-top:0.5rem">PAST MODALS</div>
            <div class="tg-line"><code>could have V3</code></div>
            <div class="tg-line"><code>may have V3</code></div>
            <div class="tg-line"><code>might have V3</code></div>
            <div class="tg-line"><code>must have V3</code> <span class="tg-tr">(%99)</span></div>
            <div class="tg-title" style="margin-top:0.5rem">HEM PRESENT HEM PAST</div>
            <div class="tg-line"><code>could have V3</code> <span class="tg-tr">(ihtimal/yetenek)</span></div>
            <div class="tg-line"><code>might have V3</code> <span class="tg-tr">(ihtimal)</span></div>
          </td>
          <td><div class="tg-title">SONUÇ VEREN MODALLAR</div>
            <div class="tg-line"><code>could have V3</code></div>
            <div class="tg-line"><code>should have V3</code></div>
            <div class="tg-line"><code>ought to have V3</code></div>
            <div class="tg-line"><code>had better have V3</code></div>
            <div class="tg-line"><code>need have V3</code></div>
            <div class="tg-line"><code>would have V3</code></div>
            <div class="tg-note"><strong>NOT:</strong> <code>be to</code> = have to <span class="tg-tr">(zorunluluk)</span><br><code>be off</code> = have <span class="tg-tr">(sahiplik)</span></div>
          </td>
        </tr>
      </table></div>
    `
  },
  {
    title: "Zaman Belirteçleri — Tablo (Tense Keywords)",
    body: `
      <div class="g-table-wrap"><table class="tk">
        <tr><th colspan="6">TENSE KEYWORDS (TIME EXP.)</th></tr>
        <tr>
          <td>date back<br>trace back<br>stretch back<br>go back</td>
          <td>Bu fiiller her zaman <strong>Simple Present</strong> ile kullanılır</td>
          <td rowspan="3">FİDOW<br>lately<br>recently<br>up to now<br>until now<br>so far<br>since + past<br><br>throughout history<br>recorded history<br>human history<br>for + zaman<br>over + zaman<br>all + zaman</td>
          <td rowspan="3" class="tk-label">SÜREÇ ANAHTAR KELİMELER</td>
          <td rowspan="3">ölü insan<br>in 1980s<br>during + past<br>until recently<br><br>last year / century / week<br>… ago …<br>in the past<br>ancient<br>previous<br>early / earlier / earliest<br>the first</td>
          <td rowspan="3" class="tk-label">NET PAST ANAHTAR KELİMELER</td>
        </tr>
        <tr>
          <td>now<br>right now<br>at present<br>at the moment<br>thesedays<br>nowadays</td>
          <td><em>Present Cont.</em> keywords</td>
        </tr>
        <tr>
          <td>increasingly<br>day by day<br>more and more<br>step by step<br>gradually<br>at a rate<br>at an accelerating rate</td>
          <td>Git gide artan azalan ifadelerde <em>Present Cont.</em> çağrıştırır.</td>
        </tr>
        <tr>
          <td colspan="2">Gelecek zaman anlamlı cümlelerde öncelik <strong>will</strong>'dir. will yoksa 2. öncelik <strong>Present Cont.</strong> olur.</td>
          <td colspan="2"><strong>Perfect Tense</strong>'ler ile <strong>Perfect Cont. Tense</strong>'ler arasında ayrım yapmamız gerekirse Perfect Cont. için keywords ararız, keywords yoksa önceliğimiz Perfect olan olur.</td>
          <td>tomorrow<br>soon<br>in 2050<br>in 5 months<br>within 5 months<br>the following<br>the next<br>from now on<br>following + zaman</td>
          <td class="tk-label">FUTURE TENSE'LER ANAHTAR KELİMELERİ</td>
        </tr>
      </table>
      <table class="tk tk-bottom">
        <tr>
          <td>before<br>until<br>by the time<br>prior to</td>
          <td><code>V2</code></td>
          <td><code>had V3</code></td>
          <td>after</td>
          <td><code>had V3</code></td>
          <td><code>V2</code></td>
          <td>by + past<br>as of + past</td>
          <td>öncelik <code>had V3</code><br>yoksa <code>V2</code></td>
        </tr>
      </table></div>
    `
  },
  {
    title: "Present Simple (Geniş Zaman)",
    body: `
      <p>Alışkanlıkları, genel gerçekleri ve rutinleri anlatmak için kullanılır.</p>
      <p><strong>Yapı:</strong> <code>özne + fiil(s/es)</code></p>
      <ul>
        <li>I <code>work</code> every day. — Her gün çalışırım.</li>
        <li>She <code>works</code> at a bank. — O bir bankada çalışır.</li>
        <li>Olumsuz: I <code>don't</code> work / She <code>doesn't</code> work.</li>
      </ul>
    `
  },
  {
    title: "Present Continuous (Şimdiki Zaman)",
    body: `
      <p>Şu anda olan eylemler için kullanılır.</p>
      <p><strong>Yapı:</strong> <code>am/is/are + fiil-ing</code></p>
      <ul>
        <li>I <code>am studying</code> now. — Şu anda ders çalışıyorum.</li>
        <li>They <code>are playing</code> football. — Onlar futbol oynuyor.</li>
      </ul>
    `
  },
  {
    title: "Present Zamanlar — Aktif & Pasif",
    body: `
      <p class="g-intro">4 present zamanın yapısını, aktif/pasif hâlini ve örnek cümlesini yan yana gör. Amaç kalıpları ezberlemek değil, hangi durumda hangisini kullanacağını örnekten çıkarmak.</p>
      <div class="g-table-wrap"><table>
        <tr><th>Zaman</th><th class="g-active">Aktif</th><th class="g-passive">Pasif</th></tr>
        <tr>
          <td>Simple Present<br><small>NET (-er/-ar) — V1/V5</small></td>
          <td>I <code>write</code> letters.<span class="g-ex">Mektup yazarım. (alışkanlık)</span></td>
          <td>Letters <code>are written</code>.<span class="g-ex">Mektuplar yazılır.</span></td>
        </tr>
        <tr>
          <td>Present Continuous<br><small>NET (-yor) — am/is/are + Ving</small></td>
          <td>I <code>am writing</code> a letter.<span class="g-ex">Mektup yazıyorum. (şu an)</span></td>
          <td>A letter <code>is being written</code>.<span class="g-ex">Mektup yazılıyor.</span></td>
        </tr>
        <tr>
          <td>Present Perfect<br><small>SÜREÇ (-dı/-di) — have/has + V3</small></td>
          <td>I <code>have written</code> the letter.<span class="g-ex">Mektubu yazdım. (sonucu önemli)</span></td>
          <td>The letter <code>has been written</code>.<span class="g-ex">Mektup yazıldı.</span></td>
        </tr>
        <tr>
          <td>Present Perfect Continuous<br><small>SÜREÇ (-yor) — have/has been + Ving</small></td>
          <td>I <code>have been writing</code> for an hour.<span class="g-ex">Bir saattir yazıyorum. (süreç vurgusu)</span></td>
          <td colspan="1"><span class="g-ex">Pasif hâli neredeyse hiç kullanılmaz — sadece yapı olarak bil.</span></td>
        </tr>
      </table></div>
    `
  },
  {
    title: "Past Zamanlar — Aktif & Pasif",
    body: `
      <p class="g-intro">Geçmişte olmuş bitmiş ya da geçmişte süregelen olayları anlatan 4 zaman. Present tablosuyla aynı mantık, sadece geçmişe kaymış hâli.</p>
      <div class="g-table-wrap"><table>
        <tr><th>Zaman</th><th class="g-active">Aktif</th><th class="g-passive">Pasif</th></tr>
        <tr>
          <td>Simple Past<br><small>NET (-dı/-di) — V2</small></td>
          <td>I <code>wrote</code> a letter.<span class="g-ex">Mektup yazdım.</span></td>
          <td>A letter <code>was written</code>.<span class="g-ex">Mektup yazıldı.</span></td>
        </tr>
        <tr>
          <td>Past Continuous<br><small>NET (-yordu) — was/were + Ving</small></td>
          <td>I <code>was writing</code> a letter.<span class="g-ex">Mektup yazıyordum.</span></td>
          <td>A letter <code>was being written</code>.<span class="g-ex">Mektup yazılıyordu.</span></td>
        </tr>
        <tr>
          <td>Past Perfect<br><small>SÜREÇ — had + V3</small></td>
          <td>I <code>had written</code> it before she arrived.<span class="g-ex">O gelmeden önce yazmıştım.</span></td>
          <td>It <code>had been written</code> before she arrived.<span class="g-ex">O gelmeden önce yazılmıştı.</span></td>
        </tr>
        <tr>
          <td>Past Perfect Continuous<br><small>SÜREÇ — had been + Ving</small></td>
          <td>I <code>had been writing</code> for an hour when she called.<span class="g-ex">O aradığında bir saattir yazıyordum.</span></td>
          <td><span class="g-ex">Pasif hâli neredeyse hiç kullanılmaz.</span></td>
        </tr>
      </table></div>
    `
  },
  {
    title: "Future Zamanlar — Aktif & Pasif",
    body: `
      <p class="g-intro">Gelecekle ilgili 4 zaman. "Süreç" olanlarda (Perfect) belirli bir ana kadar tamamlanmış olma vurgusu var.</p>
      <div class="g-table-wrap"><table>
        <tr><th>Zaman</th><th class="g-active">Aktif</th><th class="g-passive">Pasif</th></tr>
        <tr>
          <td>Simple Future<br><small>NET — will + V1</small></td>
          <td>I <code>will write</code> a letter.<span class="g-ex">Mektup yazacağım.</span></td>
          <td>A letter <code>will be written</code>.<span class="g-ex">Mektup yazılacak.</span></td>
        </tr>
        <tr>
          <td>Future Continuous<br><small>NET — will be + Ving</small></td>
          <td>I <code>will be writing</code> at 5 PM.<span class="g-ex">Saat 5'te yazıyor olacağım.</span></td>
          <td><span class="g-ex">Pasif hâli neredeyse hiç kullanılmaz.</span></td>
        </tr>
        <tr>
          <td>Future Perfect<br><small>SÜREÇ — will have + V3</small></td>
          <td>I <code>will have written</code> it by 6 PM.<span class="g-ex">Saat 6'ya kadar yazmış olacağım.</span></td>
          <td>It <code>will have been written</code> by 6 PM.<span class="g-ex">Saat 6'ya kadar yazılmış olacak.</span></td>
        </tr>
        <tr>
          <td>Future Perfect Continuous<br><small>SÜREÇ — will have been + Ving</small></td>
          <td>I <code>will have been writing</code> for an hour by 6 PM.<span class="g-ex">Saat 6'ya kadar bir saattir yazıyor olacağım.</span></td>
          <td><span class="g-ex">Pasif hâli neredeyse hiç kullanılmaz.</span></td>
        </tr>
      </table></div>
    `
  },
  {
    title: "Modal Fiiller — Çekim ve Anlamlar",
    body: `
      <p class="g-intro">Modal fiiller cümleye ihtimal, yetenek, tavsiye ya da zorunluluk anlamı katar. Aynı modal, zamana göre farklı anlama gelebilir — bunu örneklerden ayırt et.</p>
      <h4>Çekim (Aktif / Pasif)</h4>
      <div class="g-table-wrap"><table>
        <tr><th class="g-active">Aktif</th><th class="g-passive">Pasif</th></tr>
        <tr><td>can + V1<span class="g-ex">She can solve it. — Çözebilir.</span></td><td>can be + V3<span class="g-ex">It can be solved. — Çözülebilir.</span></td></tr>
        <tr><td>could + V1<span class="g-ex">He could fix it. — Tamir edebilirdi.</span></td><td>could be + V3<span class="g-ex">It could be fixed. — Tamir edilebilirdi.</span></td></tr>
        <tr><td>can be + Ving<span class="g-ex">It can be raining there. — Orada yağmur yağıyor olabilir.</span></td><td>—</td></tr>
        <tr><td>could have + V3<span class="g-ex">I could have helped. — Yardım edebilirdim (ama etmedim).</span></td><td>could have been + V3<span class="g-ex">It could have been fixed. — Tamir edilebilirdi (ama edilmedi).</span></td></tr>
      </table></div>

      <h4>Present Modals — şimdiki zamanda ihtimal / tavsiye / zorunluluk</h4>
      <ul>
        <li><code>can</code> — ihtimal / yetenek <span class="g-ex">She can speak French. — Fransızca konuşabilir.</span></li>
        <li><code>may</code> — ihtimal <span class="g-ex">It may rain later. — Sonra yağmur yağabilir.</span></li>
        <li><code>must</code> — zorunluluk / ihtimal <span class="g-ex">You must wear a seatbelt. / He must be tired. — Kemer takmalısın. / Yorgun olmalı.</span></li>
        <li><code>should</code> — tavsiye <span class="g-ex">You should see a doctor. — Doktora görünmelisin.</span></li>
        <li><code>ought to</code> — tavsiye <span class="g-ex">You ought to apologize. — Özür dilemelisin.</span></li>
        <li><code>had better</code> — tavsiye (uyarı niteliğinde) <span class="g-ex">You had better leave now. — Şimdi gitsen iyi olur.</span></li>
        <li><code>need to</code> — gereklilik <span class="g-ex">You need to study more. — Daha çok çalışman gerek.</span></li>
      </ul>

      <h4>Past Modals — geçmişe dair tahmin</h4>
      <ul>
        <li><code>could have</code> + V3 — geçmişte mümkündü <span class="g-ex">He could have missed the bus. — Otobüsü kaçırmış olabilir.</span></li>
        <li><code>may have</code> + V3 <span class="g-ex">She may have left already. — Çoktan gitmiş olabilir.</span></li>
        <li><code>might have</code> + V3 <span class="g-ex">He might have forgotten. — Unutmuş olabilir.</span></li>
        <li><code>must have</code> + V3 — %99 ihtimal <span class="g-ex">His coat is gone — he must have left. — Kesinlikle gitmiştir.</span></li>
      </ul>
      <div class="g-note"><strong>Dikkat:</strong> <code>could have + V3</code> iki farklı anlama gelebilir: (1) geçmişte yapabilirdin ama yapmadın — <em>I could have helped you.</em>; (2) geçmişte olmuş olması mümkün — <em>He could have missed the bus.</em> Hangisi olduğunu cümlenin bağlamından anla.</div>

      <h4>Sonuç Veren Modallar — pişmanlık / gerçekleşmemiş sonuç</h4>
      <ul>
        <li><code>could have</code> + V3 <span class="g-ex">If I had studied, I could have passed. — Çalışsaydım geçebilirdim.</span></li>
        <li><code>should have</code> + V3 — yapmalıydın ama yapmadın <span class="g-ex">You should have told me. — Bana söylemeliydin.</span></li>
        <li><code>ought to have</code> + V3 <span class="g-ex">You ought to have called. — Aramalıydın.</span></li>
        <li><code>had better have</code> + V3 — yapılmalıydı, pişmanlık/uyarı <span class="g-ex">She had better have prepared her presentation carefully, or she might fail. — Sunumunu dikkatle hazırlamış olsaydı iyi olurdu.</span></li>
        <li><code>needn't have</code> + V3 — gereksiz yere yapılmış <span class="g-ex">You needn't have worried. — Endişelenmene gerek yoktu.</span></li>
        <li><code>would have</code> + V3 — yapardı ama yapmadı <span class="g-ex">If I had known, I would have called. — Bilseydim arardım.</span></li>
      </ul>
      <div class="g-note"><strong>be of</strong> = sahip olmak/-e sahip <span class="g-ex">Healthcare is of importance. — Sağlık hizmeti önemlidir.</span> — <strong>be to</strong> = have to (zorunluluk, ayrıca "Be To + V1" konusuna bak).</div>
    `
  },
  {
    title: "Modal Notu (Ece Hoca) — Can/Could, May/Might, Must, Need, Would, Have to, Be able to, Be to",
    body: `
      <p class="g-intro">Ece Hoca'nın ders notlarından — her modalın tüm anlamları ve örnek cümleler.</p>

      <h4>CAN / COULD</h4>
      <ul>
        <li><code>can</code> + V1 — ihtimal/yetenek (present) <span class="g-ex">Skilled researchers can detect early signs of cancer with advanced imaging techniques. — Yetkin araştırmacılar gelişmiş görüntüleme teknikleriyle kanserin erken belirtilerini tespit edebilir.</span></li>
        <li><code>can be</code> + V-ing — şu anda oluyor olabilir <span class="g-ex">The global economy can be facing serious challenges due to political instability. — Küresel ekonomi, siyasi istikrarsızlık nedeniyle ciddi sorunlarla karşı karşıya oluyor olabilir.</span></li>
        <li><code>cannot</code> + V1 — imkânsızlık/yeteneksizlik/yasaklama <span class="g-ex">Without proper equipment, archaeologists cannot excavate fragile artifacts safely. — Uygun ekipman olmadan arkeologlar hassas eserleri güvenli bir şekilde kazamazlar.</span></li>
        <li><code>could have</code> + V3 — iki farklı anlam: (1) olabilirdi ama olmadı <span class="g-ex">With more funding, scientists could have developed a vaccine earlier. — Daha fazla finansmanla bilim insanları aşıyı daha erken geliştirebilirdi (ama geliştirmedi).</span> (2) geçmişte -mış olabilir <span class="g-ex">The sudden collapse of the bridge could have resulted from structural weaknesses. — Köprünün ani çöküşü yapısal zayıflıklardan kaynaklanmış olabilir.</span></li>
        <li><code>couldn't have</code> + V3 — isteseydi de yapamazdı <span class="g-ex">Even with the best technology, engineers couldn't have prevented the earthquake. — En iyi teknolojiyle bile mühendisler depremi önleyemezdi (isteseydi de).</span></li>
      </ul>
      <div class="g-note"><strong>could + V1'in üç anlamı:</strong> Past Ability — geçmişte genel yetenek <span class="g-ex">Before the discovery of antibiotics, doctors could treat only a limited number of infections. — Doktorlar sadece sınırlı sayıda enfeksiyonu tedavi edebiliyordu.</span>; Past Possibility — geçmişte ihtimal <span class="g-ex">The sudden decline in population could result from widespread famine in the 19th century. — Nüfustaki ani düşüş kıtlıktan kaynaklanmış olabilirdi.</span>; Present Possibility — şimdiki ihtimal <span class="g-ex">The recent fluctuations in the stock market could indicate a global economic crisis. — Borsadaki son dalgalanmalar bir ekonomik kriz işaret ediyor olabilir.</span></div>

      <h4>MAY / MIGHT — olasılık/ihtimal</h4>
      <ul>
        <li><code>may</code> + V1 — olasılık <span class="g-ex">Climate change may cause more frequent natural disasters in the future. — İklim değişikliği gelecekte daha sık doğal felaketlere neden olabilir.</span></li>
        <li><code>may be</code> + V-ing — şu anda oluyor olabilir <span class="g-ex">The patient may be experiencing side effects of the new medication. — Hasta, yeni ilacın yan etkilerini yaşıyor olabilir.</span></li>
        <li><code>may have</code> + V3 — geçmişte olmuş olabilir <span class="g-ex">The decline in the ancient civilization may have resulted from prolonged drought. — Antik uygarlığın çöküşü uzun süreli kuraklıktan kaynaklanmış olabilir.</span></li>
        <li><code>might</code> + V1 — olasılık ("-ebilir", genelde şimdi/gelecek) <span class="g-ex">Regular exercise might reduce the risk of cardiovascular diseases. — Düzenli egzersiz kardiyovasküler hastalık riskini azaltabilir.</span></li>
        <li><code>might have</code> + V3 — geçmişte olmuş olabilir <span class="g-ex">The unexpected increase in temperature might have caused the glacier to melt faster. — Sıcaklıktaki beklenmedik artış, buzulların daha hızlı erimesine neden olmuş olabilir.</span></li>
      </ul>
      <div class="g-note"><strong>Dikkat:</strong> <code>might + V1</code> normalde şimdi/gelecek ihtimali verir, ama reported speech'te (dolaylı anlatım) ya da geçmişe gönderme yapan zaman zarflarıyla geçmiş ihtimal anlamı da taşıyabilir <span class="g-ex">Historians claimed that the sudden collapse of the empire might result from internal conflicts. — Tarihçiler, imparatorluğun çöküşünün iç çatışmalardan kaynaklanmış olabileceğini iddia ettiler.</span></div>

      <h4>SHOULD / OUGHT TO / HAD BETTER</h4>
      <ul>
        <li><code>should</code> + V1 — tavsiye/beklenen durum (present/future) <span class="g-ex">Students should review their notes before the exam. — Öğrenciler sınavdan önce notlarını gözden geçirmelidir.</span></li>
        <li><code>should have</code> + V3 — yapılmalıydı ama yapılmadı <span class="g-ex">The government should have implemented stricter regulations to prevent the crisis. — Hükümet krizi önlemek için daha sıkı düzenlemeleri uygulamalıydı.</span></li>
        <li><code>shouldn't have</code> + V3 — yapmamalıydı ama yaptı <span class="g-ex">The company shouldn't have ignored the early warning signs of the financial crisis. — Şirket, finansal krizin erken uyarı işaretlerini göz ardı etmemeliydi (ama etti).</span></li>
        <li><code>ought to</code> + V1 / <code>ought to have</code> + V3 — should ile eşanlamlı <span class="g-ex">The company ought to have informed its employees about the policy change. — Şirket, politika değişikliğini çalışanlarına bildirmeliydi (ama bildirmedi).</span></li>
        <li><code>had better</code> + V1 — tavsiye (uyarı niteliğinde) <span class="g-ex">You had better submit your assignment before the deadline. — Ödevini son teslim tarihinden önce teslim etsen iyi olur.</span></li>
      </ul>

      <h4>MUST</h4>
      <ul>
        <li><code>must</code> + V1 — zorunluluk/gereklilik <span class="g-ex">Students must submit their assignments on time. / Students must not cheat during the exam. — Öğrenciler ödevlerini zamanında teslim etmelidir. / Öğrenciler sınav sırasında kopya çekmemelidir.</span></li>
        <li><code>must be</code> + V-ing — şu anda yüksek olasılık/zorunluluk <span class="g-ex">The engineers must be working on the project now. — Mühendisler şu anda projede çalışıyor olmalılar.</span></li>
        <li><code>must have</code> + V3 — geçmişte yüksek olasılık (%99) <span class="g-ex">The researchers must have completed the experiment yesterday. — Araştırmacılar deneyi dün tamamlamış olmalılar.</span></li>
        <li><code>must not have</code> + V3 — imkânsızlık ("-miş olamaz") <span class="g-ex">The researchers must not have ignored the ethical guidelines. — Araştırmacılar etik kuralları göz ardı etmiş olamazlar.</span></li>
      </ul>

      <h4>NEED</h4>
      <ul>
        <li><code>need to</code> + V1 — günümüz/gelecek zorunluluk <span class="g-ex">Students need to submit their assignments on time. / Students do not need to attend the optional lecture. — Öğrencilerin ödevlerini zamanında teslim etmeleri gerekir. / Öğrencilerin seçmeli derse katılmaları gerekmez.</span></li>
        <li><code>needn't have</code> + V3 — geçmişte yapılması gerekmeyen, gereksiz yapılmış <span class="g-ex">You needn't have completed the extra assignment; it was optional. — Ek ödevi tamamlamana gerek yoktu; isteğe bağlıydı.</span></li>
      </ul>

      <h4>WOULD</h4>
      <ul>
        <li><code>would</code> + V1 — <strong>(1) Unreal/Hypothetical</strong> (şart cümleleri) <span class="g-ex">If I were a scientist, I would study climate change more extensively. — Bilim insanı olsaydım, iklim değişikliğini daha kapsamlı incelerdim.</span> <strong>(2) Reported Speech</strong> (will'in geçmişi) <span class="g-ex">She said that she would use this method. — Bu yöntemi kullanacağını söyledi.</span> <strong>(3) Geçmişte tekrar eden alışkanlık</strong> (unreal değil) <span class="g-ex">Every summer, he would visit his grandparents in the countryside. — Her yaz büyüklerini kırsalda ziyaret ederdi.</span></li>
        <li><code>would be</code> + V-ing — unreal/hypothetical ongoing <span class="g-ex">If he were leading the project, he would be managing the team more efficiently. — Projeyi o yönetiyor olsaydı, takımı daha verimli yönetiyor olurdu.</span>; reported/past ongoing <span class="g-ex">She mentioned that she would be attending the conference next week. — Gelecek hafta konferansa katılacağını belirtti.</span></li>
        <li><code>would have</code> + V3 — unreal past <span class="g-ex">If they had followed the instructions, they would have avoided the mistakes. — Talimatları takip etmiş olsalardı, hatalardan kaçınmış olurlardı.</span>; reported past possibility <span class="g-ex">The manager said that the team would have completed the project by Friday. — Müdür, ekibin projeyi Cuma gününe kadar tamamlamış olacağını söyledi.</span></li>
      </ul>
      <div class="g-note"><strong>would (alışkanlık) vs used to:</strong> İkisi de geçmiş alışkanlığı anlatır, ama <code>used to</code> artık yapılmayan durumları da kapsar (eski hal/durum dahil), <code>would</code> sadece tekrar eden eylemler için kullanılır — durum bildiren fiillerle (be, have, know, live gibi) <code>would</code> kullanılmaz, <code>used to</code> kullanılır <span class="g-ex">She used to work at the hospital before becoming a professor. — Profesör olmadan önce hastanede çalışırdı.</span></div>

      <h4>HAVE TO — Zorunluluk Çekim Tablosu</h4>
      <div class="g-table-wrap"><table>
        <tr><th>Zaman</th><th>Olumlu</th><th>Olumsuz</th><th>Not</th></tr>
        <tr><td>Present</td><td>have to / has to</td><td>do not have to</td><td>Şu anda/genel zorunluluk</td></tr>
        <tr><td>Past</td><td>had to</td><td>did not have to</td><td>Geçmiş zorunluluk</td></tr>
        <tr><td>Future</td><td>will have to</td><td>will not have to</td><td>Gelecek zorunluluk</td></tr>
        <tr><td>Present Perfect</td><td>have/has had to</td><td>have/has not had to</td><td>Geçmişten bugüne zorunluluk</td></tr>
        <tr><td>Past Perfect</td><td>had had to</td><td>had not had to</td><td>Geçmişte daha eski zorunluluk</td></tr>
        <tr><td>Future Perfect</td><td>will have had to</td><td>will not have had to</td><td>Gelecekte belirli zamana kadar zorunluluk</td></tr>
      </table></div>
      <p class="g-ex">Students have to submit their assignments on time. — Öğrenciler ödevlerini zamanında teslim etmek zorundadır. / She has had to work overtime for several weeks. — Birkaç haftadır fazla mesai yapmak zorunda kaldı.</p>

      <h4>BE ABLE TO — Yetenek Çekim Tablosu</h4>
      <div class="g-table-wrap"><table>
        <tr><th>Zaman</th><th>Form</th></tr>
        <tr><td>Present</td><td>am/is/are able to</td></tr>
        <tr><td>Past</td><td>was/were able to</td></tr>
        <tr><td>Future</td><td>will be able to</td></tr>
        <tr><td>Present Perfect</td><td>have/has been able to</td></tr>
        <tr><td>Past Perfect</td><td>had been able to</td></tr>
        <tr><td>Future Perfect</td><td>will have been able to</td></tr>
      </table></div>
      <div class="g-note"><strong>could + V1 vs was/were able to + V1:</strong> <code>could</code> geçmişte genel bir yeteneği/olasılığı anlatır (tekrar eden) <span class="g-ex">When I was a child, I could swim very well. — Çocukken çok iyi yüzebilirdim.</span>; <code>was/were able to</code> ise geçmişte tek seferlik somut bir başarıyı anlatır <span class="g-ex">Despite the heavy rain, she was able to finish the race. — Şiddetli yağmura rağmen yarışı tamamlayabildi.</span></div>

      <h4>BE TO + V1</h4>
      <ul>
        <li>Planlanmış/resmi gelecek eylem <span class="g-ex">The president is to visit the city next week. — Başkan gelecek hafta şehri ziyaret edecek.</span></li>
        <li>Talimat/zorunluluk <span class="g-ex">Students are to submit their assignments by Friday. / Students are not to leave the classroom before the teacher arrives. — Öğrenciler ödevlerini Cuma gününe kadar teslim etmelidir. / Öğrenciler öğretmen gelmeden önce sınıfı terk etmemelidir.</span></li>
        <li>Olasılık/şart (resmi yazı dili) <span class="g-ex">If the instructions are to be followed, the experiment will succeed. — Talimatlara uyulacaksa, deney başarılı olacaktır.</span></li>
      </ul>
      <div class="g-note">Geçmiş hâli <code>was/were to + V1</code> aynı üç anlamı geçmişe taşır: planlanmış eylem <span class="g-ex">He was to lead the project last year. — Geçen yıl projeyi yönetmesi planlanmıştı.</span>; geçmiş talimat <span class="g-ex">Students were to submit their assignments by Friday. — Öğrenciler ödevlerini Cuma gününe kadar teslim etmek zorundaydı.</span>; geçmişte olasılık/şart <span class="g-ex">If the instructions were to be followed, the experiment would have succeeded. — Talimatlara uyulsaydı, deney başarılı olacaktı.</span></div>
    `
  },
  {
    title: "Zaman Belirteçleri — Hangi Zamanı İşaret Eder",
    body: `
      <p class="g-intro">Cümlede bu kelimelerden birini görürsen, hangi zamanı kullanman gerektiğini anlarsın. Her grubun altında bir örnek var.</p>

      <h4>Her Zaman Simple Present ile Kullanılır</h4>
      <ul>
        <li>date back, trace back, stretch back, go back</li>
      </ul>
      <p class="g-ex">This tradition dates back to the 1800s. — Bu gelenek 1800'lere dayanır.</p>

      <h4>Present Continuous</h4>
      <ul>
        <li>now, right now, at present, at the moment, these days, nowadays</li>
      </ul>
      <p class="g-ex">I am busy at the moment. — Şu anda meşgulüm.</p>

      <h4>Present Continuous'u Çağrıştıran İfadeler (giderek artan / azalan)</h4>
      <ul>
        <li>increasingly, day by day, more and more, step by step, gradually, at a rate, at an accelerating rate</li>
      </ul>
      <p class="g-ex">Prices are increasing day by day. — Fiyatlar günden güne artıyor.</p>

      <h4>Süreç Anahtar Kelimeleri (Perfect / Perfect Continuous)</h4>
      <ul>
        <li>lately, recently, up to now, until now, so far, since + geçmiş zaman</li>
        <li>throughout history, recorded history, human history, for + zaman, over + zaman, all + zaman</li>
      </ul>
      <p class="g-ex">I have lived here since 2010. — 2010'dan beri burada yaşıyorum.</p>

      <h4>Net Past Anahtar Kelimeleri</h4>
      <ul>
        <li>(artık hayatta olmayan biri hakkında konuşurken), in 1980s, during + geçmiş zaman</li>
        <li>until recently, last year / century / week, … ago …, in the past, ancient, previous, early / earlier / earliest, the first</li>
      </ul>
      <p class="g-ex">I visited Paris three years ago. — Üç yıl önce Paris'i ziyaret ettim.</p>

      <h4>Future Anahtar Kelimeleri</h4>
      <ul>
        <li>tomorrow, soon, in 2050, in 5 months, within 5 months, the following, the next, from now on, following + zaman</li>
      </ul>
      <p class="g-ex">I will call you tomorrow. — Yarın seni ararım.</p>

      <div class="g-note">Gelecek zaman anlamlı cümlelerde 1. öncelik <code>will</code>'dir; <code>will</code> yoksa 2. öncelik <code>Present Continuous</code> olur.</div>

      <h4>before / after / by + past — hangisi daha önce olmuş?</h4>
      <div class="g-table-wrap"><table>
        <tr><th>Bağlaç</th><th>Yapı</th><th>Örnek</th></tr>
        <tr><td>before / until / by the time / prior to</td><td>öncelik V2, yoksa <code>had V3</code></td><td>I had finished before she arrived. — O gelmeden önce bitirmiştim.</td></tr>
        <tr><td>after</td><td>öncelik <code>had V3</code>, yoksa V2</td><td>After he had eaten, he left. — Yedikten sonra gitti.</td></tr>
        <tr><td>by + past / as of + past</td><td>öncelik <code>had V3</code>, yoksa V2</td><td>By 2010, she had graduated. — 2010'a kadar mezun olmuştu.</td></tr>
      </table></div>
    `
  },
  {
    title: "Koşul Cümleleri, Would ve Tense Uyumu",
    body: `
      <p class="g-intro">Zaman ve koşul bağlacı olan cümlelerde (when, if, before, until…) iki taraf birbirine göre şekillenir — buna tense uyumu denir. Would'un 3 farklı anlamını da burada ayırt et.</p>

      <h4>Zaman Bağlaçları</h4>
      <p>when, after, before, until, prior to, as soon as, once, while, as</p>
      <h4>Koşul Bağlaçları</h4>
      <p>if, provided that, providing that, as long as, so long as, on condition that, unless, even if <em>(*otherwise hariç)</em></p>
      <div class="g-note">Bu bağlaçların olduğu cümleye <code>will / would / be going to</code> gelemez — <em>"When I will arrive" yanlış, "When I arrive" doğru.</em> (otherwise hariç)</div>

      <h4>Would'un 3 Kullanımı</h4>
      <ol>
        <li>Unreal present <span class="g-ex">If I were rich, I would travel. — Zengin olsam gezerdim.</span></li>
        <li>Eski alışkanlık (geçmişte tekrar eden) <span class="g-ex">When I was a child, I would play outside every day. — Çocukken her gün dışarıda oynardım.</span></li>
        <li>Will'in geçmiş hâli (reported speech) <span class="g-ex">She said she would come. — Geleceğini söyledi.</span></li>
      </ol>

      <div class="g-note"><code>hope, feel, think, estimate, predict, foresee, believe</code> fiilleri present ile kullanılırsa genellikle <code>that</code> sonrasında <code>will</code> çağrıştırır. <span class="g-ex">I believe that it will work. — İşe yarayacağına inanıyorum.</span></div>

      <h4>"Subject … that" İfadelerinde Hangi Zaman?</h4>
      <ul>
        <li>Geçmiş vurgusu yoksa: Simple Present, Present Perfect ya da Present Perfect Continuous kullanılır. <span class="g-ex">I believe that he works hard. — Sıkı çalıştığına inanıyorum.</span></li>
        <li>Anlam past ise: Simple Past kullanılır. <span class="g-ex">I believe that he worked hard yesterday. — Dün sıkı çalıştığına inanıyorum.</span></li>
      </ul>

      <h4>Kalıplaşmış İfadeler</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İfade</th><th>Kullanılan Zaman</th><th>Örnek</th></tr>
        <tr><td>already</td><td>Present Perfect</td><td>I have already finished. — Zaten bitirdim.</td></tr>
        <tr><td>until + past</td><td>öncelik V2, yoksa <code>had V3</code></td><td>I didn't leave until he arrived. — O gelene kadar ayrılmadım.</td></tr>
        <tr><td>by + future / as of + future</td><td><code>will have V3</code></td><td>I will have finished by 6 PM. — Saat 6'ya kadar bitirmiş olacağım.</td></tr>
        <tr><td>at that time</td><td>Past Continuous</td><td>I was sleeping at that time. — O sırada uyuyordum.</td></tr>
      </table></div>
    `
  },
  {
    title: "Soru Çözüm Adımları (Tense Seçimi)",
    body: `
      <p class="g-intro">Boşluk doldurma ya da çoktan seçmeli bir tense sorusunda takıldığında sırayla bunları kontrol et.</p>
      <ol>
        <li>Cümle past mı present mi?</li>
        <li>Keywords var mı (süreç / net anahtar kelimeler)?</li>
        <li>Unreal bir anlam var mı (would, if, wish…)?</li>
        <li>Zaman / koşul bağlacı var mı? (varsa tense uyumuna bak, will/would gelemez)</li>
        <li>Boşluk çekimi active mi passive mi?</li>
        <li>Çeviri yap, anlama bak — kalıp doğru görünse de anlam tutmuyorsa yanlış seçmişsindir.</li>
      </ol>
    `
  },
  {
    title: "Bağlaçlar ve Bağlayıcı İfadeler — Tek Tabloda",
    body: `
      <p class="g-intro">Bağlaçlar anlamlarına göre tek tabloda toplandı. Aynı satırdaki ifadeler benzer iş görür; ancak yapı ve noktalama farkı varsa <strong>Kalıp</strong> sütununda ayrıca gösterilir.</p>
      <div class="g-note cj-legend">
        <strong>Kalıp anahtarı:</strong> <code>S + V</code> = özne + çekimli fiil içeren tam cümle, <code>isim / V-ing</code> = ardından tam cümle gelmez, <code>V1</code> = fiilin yalın hâli.<br>
        <strong>Hızlı ayrım:</strong> <code>although + S + V</code> ↔ <code>despite + isim / V-ing</code> · <code>because + S + V</code> ↔ <code>because of + isim / V-ing</code> · <code>so that + S + V</code> ↔ <code>in order to + V1</code>.<br>
        <strong>Zaman / koşul:</strong> Gelecek anlamı olsa da bağlaçtan hemen sonra genellikle <code>will</code> kullanılmaz: <em>When I arrive...</em>, <em>If it rains...</em>
      </div>

      <div class="g-table-wrap conjunction-table-wrap"><table class="conjunction-table">
        <colgroup><col class="cj-col-expression"><col class="cj-col-meaning"><col class="cj-col-pattern"><col class="cj-col-example"></colgroup>
        <thead>
          <tr><th scope="col">Bağlaç / İfade</th><th scope="col">Türkçe anlam</th><th scope="col">Kalıp / kullanım</th><th scope="col">Örnek</th></tr>
        </thead>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Zıtlık</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">although, though, even though, much as</td><td data-label="Türkçe anlam">-se / -sa da, -e rağmen</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Although it was raining, we went out.<span class="cj-translation">Yağmur yağıyor olsa da dışarı çıktık.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">despite, in spite of, notwithstanding, for all</td><td data-label="Türkçe anlam">-e rağmen</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">Despite the rain, we went out.<span class="cj-translation">Yağmura rağmen dışarı çıktık.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">albeit</td><td data-label="Türkçe anlam">gerçi, -se de</td><td data-label="Kalıp / kullanım"><code>+ sıfat / zarf / kısa ifade</code></td><td data-label="Örnek">The plan worked, albeit slowly.<span class="cj-translation">Plan, yavaş da olsa, işe yaradı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">but, yet</td><td data-label="Türkçe anlam">ama, fakat, yine de</td><td data-label="Kalıp / kullanım"><code>S1, but / yet S2</code></td><td data-label="Örnek">He was tired, but he kept working.<span class="cj-translation">Yorgundu ama çalışmaya devam etti.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">however, still, nevertheless, nonetheless, even so</td><td data-label="Türkçe anlam">ancak, yine de, buna rağmen</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar: <code>; however,</code></td><td data-label="Örnek">He was tired; however, he kept working.<span class="cj-translation">Yorgundu; yine de çalışmaya devam etti.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">while, whereas, whilst</td><td data-label="Türkçe anlam">oysa, -iken</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint"><em>while</em> zaman anlamına da gelebilir.</span></td><td data-label="Örnek">While Ali likes tea, Ayşe prefers coffee.<span class="cj-translation">Ali çayı severken Ayşe kahveyi tercih ediyor.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">unlike, in contrast to / with, contrary to</td><td data-label="Türkçe anlam">-in aksine, -e zıt olarak</td><td data-label="Kalıp / kullanım"><code>+ isim / zamir</code></td><td data-label="Örnek">Unlike his brother, he is very shy.<span class="cj-translation">Kardeşinin aksine o çok utangaç.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">conversely, by contrast, on the other hand</td><td data-label="Türkçe anlam">tersine, buna karşılık, diğer yandan</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar; ardından virgül gelir.</td><td data-label="Örnek">She is strict; on the other hand, she is fair.<span class="cj-translation">Katıdır; diğer yandan adildir.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Koşuldan bağımsızlık / “Ne olursa olsun”</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">regardless of, irrespective of</td><td data-label="Türkçe anlam">-e bakmaksızın</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">Regardless of the cost, we'll do it.<span class="cj-translation">Maliyete bakmaksızın yapacağız.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">however + sıfat / zarf, no matter how + sıfat / zarf</td><td data-label="Türkçe anlam">ne kadar ... olursa olsun</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">No matter how hard it is, I'll finish it.<span class="cj-translation">Ne kadar zor olursa olsun bitireceğim.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">whether ... or not</td><td data-label="Türkçe anlam">... olsun olmasın</td><td data-label="Kalıp / kullanım"><code>whether + S + V + or not</code></td><td data-label="Örnek">Whether you like it or not, we're going.<span class="cj-translation">İster beğen ister beğenme, gidiyoruz.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Alternatif / tercih</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">rather than</td><td data-label="Türkçe anlam">-mektense, -den ziyade</td><td data-label="Kalıp / kullanım">İki paralel yapıyı bağlar: <code>isim / V1 / V-ing</code></td><td data-label="Örnek">Rather than complain, he took action.<span class="cj-translation">Şikâyet etmektense harekete geçti.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">instead of, in place of, in lieu of</td><td data-label="Türkçe anlam">yerine</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">We walked instead of taking a taxi.<span class="cj-translation">Taksiye binmek yerine yürüdük.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">in preference to, as opposed to</td><td data-label="Türkçe anlam">-i tercih ederek, -den ziyade</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">He chose tea as opposed to coffee.<span class="cj-translation">Kahve yerine çayı seçti.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">prefer / choose X over Y</td><td data-label="Türkçe anlam">X'i Y'ye tercih etmek</td><td data-label="Kalıp / kullanım">Sabit fiil kalıbı: <code>X over Y</code></td><td data-label="Örnek">She chose the train over the bus.<span class="cj-translation">Otobüs yerine treni seçti.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">instead</td><td data-label="Türkçe anlam">onun yerine</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar: <code>; instead,</code></td><td data-label="Örnek">He didn't complain; instead, he took action.<span class="cj-translation">Şikâyet etmedi; onun yerine harekete geçti.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Neden / sonuç</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">because, since, as, in that, now that, seeing that, given that, inasmuch as</td><td data-label="Türkçe anlam">çünkü, -dığı için, madem ki</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint"><em>since / as</em> zaman anlamına da gelebilir.</span></td><td data-label="Örnek">I stayed home because it was raining.<span class="cj-translation">Yağmur yağdığı için evde kaldım.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">for</td><td data-label="Türkçe anlam">çünkü</td><td data-label="Kalıp / kullanım">İki cümleyi bağlar: <code>S1, for S2</code></td><td data-label="Örnek">We stayed home, for it was raining.<span class="cj-translation">Evde kaldık çünkü yağmur yağıyordu.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">because of, due to, owing to, on account of, on the grounds of, by reason of, thanks to</td><td data-label="Türkçe anlam">nedeniyle, -den dolayı, sayesinde</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code><span class="cj-hint"><em>thanks to</em> çoğunlukla olumlu neden bildirir.</span></td><td data-label="Örnek">The match was canceled because of the rain.<span class="cj-translation">Maç yağmur nedeniyle iptal edildi.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">so</td><td data-label="Türkçe anlam">bu yüzden</td><td data-label="Kalıp / kullanım"><code>S1, so S2</code></td><td data-label="Örnek">It was late, so we left.<span class="cj-translation">Geç olmuştu, bu yüzden ayrıldık.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">therefore, thus, hence, consequently, as a result</td><td data-label="Türkçe anlam">bu nedenle, böylece, sonuç olarak</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar: <code>; therefore,</code></td><td data-label="Örnek">He didn't study; therefore, he failed.<span class="cj-translation">Çalışmadı; bu nedenle başarısız oldu.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">thereby</td><td data-label="Türkçe anlam">böylece, bu yolla</td><td data-label="Kalıp / kullanım"><code>thereby + V-ing</code></td><td data-label="Örnek">She saved money, thereby reducing her stress.<span class="cj-translation">Para biriktirdi ve böylece stresini azalttı.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Vasıta / yöntem</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">with the help of, with the aid of</td><td data-label="Türkçe anlam">yardımıyla</td><td data-label="Kalıp / kullanım"><code>+ isim</code></td><td data-label="Örnek">With the help of my teacher, I passed.<span class="cj-translation">Öğretmenimin yardımıyla geçtim.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">through, by means of, via</td><td data-label="Türkçe anlam">aracılığıyla, yoluyla</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">He succeeded through hard work.<span class="cj-translation">Sıkı çalışma yoluyla başarıya ulaştı.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Amaç / önlem</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">so that, in order that</td><td data-label="Türkçe anlam">-mesi için</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint">Amaç cümlelerinde çoğunlukla <em>can / could / will / would</em> gibi bir modal kullanılır.</span></td><td data-label="Örnek">She left early so that she could catch the bus.<span class="cj-translation">Otobüsü yakalayabilmek için erken çıktı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">in order to, so as to, in an attempt to</td><td data-label="Türkçe anlam">-mek için, -mek amacıyla</td><td data-label="Kalıp / kullanım"><code>+ V1</code></td><td data-label="Örnek">She left early in order to catch the bus.<span class="cj-translation">Otobüsü yakalamak için erken çıktı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">for the purpose of, with a view to, for the sake of, with the aim of, with the goal of, in pursuit of</td><td data-label="Türkçe anlam">amacıyla, uğruna</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code><span class="cj-hint"><em>with a view to doing</em></span></td><td data-label="Örnek">He studied with a view to passing the exam.<span class="cj-translation">Sınavı geçmek amacıyla çalıştı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">lest, for fear that</td><td data-label="Türkçe anlam">-mesin diye, korkusuyla</td><td data-label="Kalıp / kullanım"><code>lest + S + V1 / should V1</code><br><code>for fear that + S + modal</code></td><td data-label="Örnek">She whispered for fear that someone would hear.<span class="cj-translation">Biri duyar korkusuyla fısıldadı.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Koşul</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">if</td><td data-label="Türkçe anlam">eğer, -se / -sa</td><td data-label="Kalıp / kullanım"><code>if + S + V</code></td><td data-label="Örnek">If it rains, we'll stay in.<span class="cj-translation">Yağmur yağarsa içeride kalırız.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">only if</td><td data-label="Türkçe anlam">ancak ... ise</td><td data-label="Kalıp / kullanım"><code>only if + S + V</code></td><td data-label="Örnek">You can go only if you finish first.<span class="cj-translation">Yalnızca önce bitirirsen gidebilirsin.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">unless, if ... not</td><td data-label="Türkçe anlam">-medikçe, ... değilse</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint"><em>unless</em> zaten olumsuz anlam taşır.</span></td><td data-label="Örnek">Unless you study, you won't pass.<span class="cj-translation">Çalışmadıkça geçemezsin.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">as long as, so long as</td><td data-label="Türkçe anlam">-dığı sürece</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">As long as you try, it's fine.<span class="cj-translation">Denediğin sürece sorun yok.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">providing that, provided that, on condition that</td><td data-label="Türkçe anlam">şartıyla, koşuluyla</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">You can go provided that you finish first.<span class="cj-translation">Önce bitirmen şartıyla gidebilirsin.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">assuming (that), supposing (that), imagine (that)</td><td data-label="Türkçe anlam">farz edersek, varsayalım ki</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint"><em>imagine</em> emir biçiminde kullanılır.</span></td><td data-label="Örnek">Supposing that it's true, what do we do?<span class="cj-translation">Doğru olduğunu varsayarsak ne yapacağız?</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">in case, in the event that</td><td data-label="Türkçe anlam">olur diye, olması durumunda</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Take an umbrella in case it rains.<span class="cj-translation">Yağmur yağar ihtimaline karşı şemsiye al.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">in case of, in the event of</td><td data-label="Türkçe anlam">durumunda</td><td data-label="Kalıp / kullanım"><code>+ isim</code></td><td data-label="Örnek">In case of fire, use the stairs.<span class="cj-translation">Yangın durumunda merdivenleri kullan.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">otherwise, or else</td><td data-label="Türkçe anlam">aksi takdirde</td><td data-label="Kalıp / kullanım">Sonuç cümlesi bağlar; burada <code>will</code> kullanılabilir.</td><td data-label="Örnek">Hurry; otherwise, we'll be late.<span class="cj-translation">Acele et; aksi takdirde geç kalacağız.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">even if</td><td data-label="Türkçe anlam">-sa bile</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Even if it rains, we'll go.<span class="cj-translation">Yağmur yağsa bile gideceğiz.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Ekleme</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">along with, together with, as well as, in addition to, coupled with</td><td data-label="Türkçe anlam">yanı sıra, ile birlikte, ek olarak</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">Along with English, she speaks French.<span class="cj-translation">İngilizcenin yanı sıra Fransızca da konuşuyor.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">besides</td><td data-label="Türkçe anlam">yanı sıra, ayrıca</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code> veya <code>Besides, S + V</code></td><td data-label="Örnek">Besides English, she speaks French.<span class="cj-translation">İngilizcenin yanı sıra Fransızca da konuşuyor.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">furthermore, moreover, what is more, on top of that</td><td data-label="Türkçe anlam">dahası, üstelik</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar; ardından virgül gelir.</td><td data-label="Örnek">It's cheap; moreover, it's reliable.<span class="cj-translation">Ucuz; dahası güvenilir.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Örnekleme / açıklama</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">for example, for instance</td><td data-label="Türkçe anlam">örneğin</td><td data-label="Kalıp / kullanım">Cümle veya örnek ekler; çoğunlukla virgülle ayrılır.</td><td data-label="Örnek">Some fruits are cheap; for example, apples are affordable.<span class="cj-translation">Bazı meyveler ucuzdur; örneğin elmalar hesaplıdır.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">such as</td><td data-label="Türkçe anlam">gibi, örneğin</td><td data-label="Kalıp / kullanım"><code>+ isim / liste</code></td><td data-label="Örnek">Some fruits, such as apples, are cheap.<span class="cj-translation">Elma gibi bazı meyveler ucuzdur.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">in other words, to put it another way, that is, that is to say</td><td data-label="Türkçe anlam">başka bir deyişle, yani</td><td data-label="Kalıp / kullanım">Önceki fikri yeniden açıklar.</td><td data-label="Örnek">In other words, we need more time.<span class="cj-translation">Başka bir deyişle daha fazla zamana ihtiyacımız var.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">namely</td><td data-label="Türkçe anlam">yani, şöyle ki</td><td data-label="Kalıp / kullanım"><code>+ isim / liste</code></td><td data-label="Örnek">Only one person, namely the manager, objected.<span class="cj-translation">Yalnızca bir kişi, yani müdür, itiraz etti.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Zaman</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">when, once, while, after, before, by the time, until</td><td data-label="Türkçe anlam">-dığında, -iken, -den sonra / önce, -e kadar</td><td data-label="Kalıp / kullanım"><code>+ S + V</code><span class="cj-hint"><em>after / before</em> ayrıca isim veya V-ing alabilir.</span></td><td data-label="Örnek">Once you finish, call me.<span class="cj-translation">Bitirdiğinde beni ara.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">prior to</td><td data-label="Türkçe anlam">-den önce</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">Prior to leaving, she called me.<span class="cj-translation">Ayrılmadan önce beni aradı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">even when, even after, even before</td><td data-label="Türkçe anlam">-dığında / -den sonra / önce bile</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Even after he apologized, she was upset.<span class="cj-translation">Özür diledikten sonra bile üzgündü.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">whenever</td><td data-label="Türkçe anlam">ne zaman ... olursa</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Whenever you need help, call me.<span class="cj-translation">Ne zaman yardıma ihtiyacın olursa beni ara.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">as soon as</td><td data-label="Türkçe anlam">-ar ... -maz</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">As soon as she arrived, it started to rain.<span class="cj-translation">O gelir gelmez yağmur başladı.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">no sooner ... than; hardly / scarcely / barely ... when / before</td><td data-label="Türkçe anlam">daha ... olur olmaz</td><td data-label="Kalıp / kullanım">Cümle başında devrik yapı: <code>No sooner had + S + V3 + than ...</code></td><td data-label="Örnek">No sooner had she arrived than it started to rain.<span class="cj-translation">O gelir gelmez yağmur başladı.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Hariç tutma / istisna</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">except for, apart from, aside from, excluding, other than</td><td data-label="Türkçe anlam">hariç, dışında</td><td data-label="Kalıp / kullanım"><code>+ isim / V-ing</code></td><td data-label="Örnek">Everyone came except for John.<span class="cj-translation">John hariç herkes geldi.</span></td></tr>
        </tbody>

        <tbody class="cj-group">
          <tr class="cj-section"><th colspan="4" scope="rowgroup">Benzetme / benzerlik</th></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">likewise, similarly, in like manner, in the same way, equally, correspondingly</td><td data-label="Türkçe anlam">benzer şekilde, aynı biçimde, buna paralel olarak</td><td data-label="Kalıp / kullanım">Yeni cümle bağlar; ardından virgül gelir.</td><td data-label="Örnek">He works hard; likewise, his sister works hard.<span class="cj-translation">O sıkı çalışır; kız kardeşi de aynı şekilde çalışır.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">just as</td><td data-label="Türkçe anlam">tıpkı ... gibi</td><td data-label="Kalıp / kullanım"><code>+ S + V</code></td><td data-label="Örnek">Just as I expected, the test was difficult.<span class="cj-translation">Tam beklediğim gibi sınav zordu.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">similar to</td><td data-label="Türkçe anlam">-e benzer</td><td data-label="Kalıp / kullanım"><code>+ isim / zamir</code></td><td data-label="Örnek">This method is similar to the old one.<span class="cj-translation">Bu yöntem eskisine benziyor.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">as ... as</td><td data-label="Türkçe anlam">... kadar ...</td><td data-label="Kalıp / kullanım"><code>as + sıfat / zarf + as</code></td><td data-label="Örnek">This is as good as that one.<span class="cj-translation">Bu, diğeri kadar iyi.</span></td></tr>
          <tr class="cj-entry"><td data-label="Bağlaç / ifade">the same ... as</td><td data-label="Türkçe anlam">... ile aynı</td><td data-label="Kalıp / kullanım"><code>the same + isim + as</code></td><td data-label="Örnek">She has the same bag as me.<span class="cj-translation">Benimkiyle aynı çantaya sahip.</span></td></tr>
        </tbody>
      </table></div>
    `
  },
];
