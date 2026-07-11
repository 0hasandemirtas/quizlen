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
          </td>
          <td><div class="tg-title">PRESENT MODALS</div>
            <div class="tg-line"><code>can V1</code> <span class="tg-tr">(ihtimal/yetenek)</span></div>
            <div class="tg-line"><code>may V1</code> <span class="tg-tr">(ihtimal)</span></div>
            <div class="tg-line"><code>must V1</code> <span class="tg-tr">(zorunluluk/ihtimal)</span></div>
            <div class="tg-line"><code>should V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>ought to V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>had better V1</code> <span class="tg-tr">(tavsiye)</span></div>
            <div class="tg-line"><code>need to V1</code> <span class="tg-tr">(gereklilik)</span></div>
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
        <li><code>needn't have</code> + V3 — gereksiz yere yapılmış <span class="g-ex">You needn't have worried. — Endişelenmene gerek yoktu.</span></li>
      </ul>
      <div class="g-note"><strong>Notundan iki madde okunaklı değildi, kontrol edelim:</strong> "had better have V3" standart bir kalıp değil ("had better" normalde sadece + V1 alır) ve "need have V3" muhtemelen "needn't have V3" olmalı (yukarıya öyle ekledim). Ayrıca ilk notundaki "be off = have (sahiplik)" satırı da anlaşılır değildi — <code>be to = have to</code> (zorunluluk) kısmını kullanıma ekledim, ikincisini sen netleştirince eklerim.</div>
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
    title: "Bağlaçlar — Zıtlık, Neden-Sonuç, Amaç-Sonuç",
    body: `
      <p class="g-intro">Her satırda birkaç eş anlamlı bağlaç var — hepsini aynı anda ezberlemek zorunda değilsin, birini iyi öğrenip cümlede tanı, gerisi zamanla gelir. Örnek cümleler grubun ilk kelimesiyle kurulu.</p>

      <h4>Zıtlık Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>although, though, even though, much as</td><td>-se de / -sa da, -e rağmen</td><td>Although it was raining, we went out. — Yağmur yağmasına rağmen dışarı çıktık.</td></tr>
        <tr><td>despite, in spite of, notwithstanding, for all, albeit</td><td>-e rağmen</td><td>Despite the rain, we went out. — Yağmura rağmen dışarı çıktık.</td></tr>
        <tr><td>however, but, yet, still, nevertheless, nonetheless</td><td>ama / fakat / ancak</td><td>He was tired; however, he kept working. — Yorgundu ama çalışmaya devam etti.</td></tr>
        <tr><td>while, whereas, whilst</td><td>-se de / -sa da, -iken</td><td>While he likes tea, she prefers coffee. — O çay severken kadın kahveyi tercih ediyor.</td></tr>
        <tr><td>unlike, as opposed to, conversely, in contrast to, by contrast, in contrast with, contrary to</td><td>aksine / zıttına / tersine</td><td>Unlike his brother, he is very shy. — Kardeşinin aksine o çok utangaç.</td></tr>
        <tr><td>even so</td><td>yine de</td><td>It was expensive; even so, we bought it. — Pahalıydı; yine de aldık.</td></tr>
        <tr><td>on the other hand</td><td>diğer yandan</td><td>She is strict; on the other hand, she is fair. — Katıdır; diğer yandan adildir.</td></tr>
      </table></div>

      <h4>Bağımsızlık / Kayıtsızlık</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>regardless of, irrespective of</td><td>-e bakmaksızın</td><td>Regardless of the cost, we'll do it. — Maliyete bakmaksızın yapacağız.</td></tr>
        <tr><td>however + sıfat, no matter how</td><td>ne kadar … olursa olsun</td><td>No matter how hard it is, I'll finish it. — Ne kadar zor olursa olsun bitireceğim.</td></tr>
      </table></div>

      <h4>Alternatif / Tercih</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>rather than, in place of, instead</td><td>-den ziyade</td><td>Rather than complain, he took action. — Şikayet etmektense harekete geçti.</td></tr>
        <tr><td>as opposed to, in lieu of, in preference to, over</td><td>-den ziyade</td><td>He chose tea as opposed to coffee. — Kahve yerine çayı seçti.</td></tr>
      </table></div>

      <h4>Neden-Sonuç Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>because, since, as, for, in that</td><td>için / çünkü</td><td>I stayed home because it was raining. — Yağmur yağdığı için evde kaldım.</td></tr>
        <tr><td>now that, seeing that, given that, because of, due to, owing to, on account of, in as much as</td><td>-den dolayı / madem ki</td><td>Now that you're here, let's start. — Madem buradasın, başlayalım.</td></tr>
        <tr><td>as a result, consequently</td><td>sonuç olarak</td><td>He didn't study; as a result, he failed. — Çalışmadı; sonuç olarak başarısız oldu.</td></tr>
        <tr><td>so, thus, hence, therefore, thereby</td><td>bu yüzden / böylece</td><td>It was late, so we left. — Geç olmuştu, bu yüzden ayrıldık.</td></tr>
      </table></div>

      <h4>Vasıta / Yardım / Sebep</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>thanks to, with the help of, with the aid of</td><td>sayesinde / yardımıyla</td><td>Thanks to you, I passed. — Senin sayende geçtim.</td></tr>
        <tr><td>through, by means of, via</td><td>sayesinde / aracılığıyla</td><td>He succeeded through hard work. — Sıkı çalışma sayesinde başardı.</td></tr>
      </table></div>

      <h4>Amaç-Sonuç Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>so that, in order that, in order to, so as to</td><td>-mek için / -mek amacıyla</td><td>She left early so that she could catch the bus. — Otobüsü yakalamak için erken çıktı.</td></tr>
        <tr><td>for the purpose of, with a view to, for the sake of, with the aim of, with the goal of, in pursuit of, in an attempt to</td><td>-amacıyla</td><td>He studied with a view to passing the exam. — Sınavı geçmek amacıyla çalıştı.</td></tr>
        <tr><td>on the grounds of</td><td>zemin üzerinde</td><td>He was fired on the grounds of misconduct. — Suistimal gerekçesiyle kovuldu.</td></tr>
        <tr><td>thanks to</td><td>sayesinde</td><td>Thanks to the map, we didn't get lost. — Harita sayesinde kaybolmadık.</td></tr>
        <tr><td>by reason of</td><td>nedeniyle</td><td>Absent by reason of illness. — Hastalık nedeniyle yok.</td></tr>
      </table></div>
    `
  },
  {
    title: "Bağlaçlar — Koşul, Ekleme, Zaman, Benzetme",
    body: `
      <p class="g-intro">Önceki bağlaç listesinin devamı. Yine her satırın örneği grubun ilk kelimesiyle kurulu.</p>

      <h4>Koşul Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>if, only if</td><td>-eğer</td><td>If it rains, we'll stay in. — Yağmur yağarsa içeride kalırız.</td></tr>
        <tr><td>if not, unless</td><td>-medikçe</td><td>Unless you study, you won't pass. — Çalışmadıkça geçemezsin.</td></tr>
        <tr><td>as long as, so long as</td><td>-dığı sürece</td><td>As long as you try, it's fine. — Denediğin sürece sorun yok.</td></tr>
        <tr><td>providing that, provided that, on condition that</td><td>-şartıyla / -koşuluyla</td><td>You can go, provided that you finish first. — Önce bitirmen şartıyla gidebilirsin.</td></tr>
        <tr><td>lest, for fear that</td><td>-korkusuyla</td><td>She whispered for fear that someone would hear. — Birinin duyması korkusuyla fısıldadı.</td></tr>
        <tr><td>imagining that, supposing that</td><td>-farz et ki</td><td>Supposing that it's true, what do we do? — Farz et ki doğru, ne yapacağız?</td></tr>
        <tr><td>in case, in case of, in the event that</td><td>-olursa / -durumunda</td><td>Take an umbrella in case it rains. — Yağmur yağarsa diye şemsiye al.</td></tr>
        <tr><td>otherwise, or else</td><td>-aksi takdirde</td><td>Hurry, otherwise we'll be late. — Acele et, aksi takdirde geç kalacağız.</td></tr>
        <tr><td>even if</td><td>-sa bile</td><td>Even if it rains, we'll go. — Yağmur yağsa bile gideceğiz.</td></tr>
        <tr><td>whether … or not</td><td>-olsun olmasın</td><td>Whether you like it or not, we're going. — İster beğen ister beğenme, gidiyoruz.</td></tr>
      </table></div>

      <h4>Ekleme Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>along with, together with, besides, as well as, in addition to</td><td>-yanı sıra / -ek olarak</td><td>Besides English, she speaks French. — İngilizcenin yanı sıra Fransızca da konuşuyor.</td></tr>
        <tr><td>furthermore, moreover</td><td>-dahası</td><td>It's cheap; furthermore, it's reliable. — Ucuz; dahası güvenilir.</td></tr>
        <tr><td>what is more, on top of that</td><td>-üstelik</td><td>He was late; what is more, he forgot his notes. — Geç kaldı; üstelik notlarını unuttu.</td></tr>
        <tr><td>coupled with</td><td>-ile birlikte / -ek olarak</td><td>Hard work, coupled with luck, led to success. — Şansla birlikte sıkı çalışma başarıyı getirdi.</td></tr>
      </table></div>

      <h4>Örnekleme / Açıklama</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>for example, for instance, such as</td><td>-örneğin</td><td>Some fruits, such as apples, are cheap. — Elma gibi bazı meyveler ucuzdur.</td></tr>
        <tr><td>to put it another way, in other words</td><td>-başka bir deyişle</td><td>In other words, we need more time. — Başka bir deyişle daha fazla zamana ihtiyacımız var.</td></tr>
        <tr><td>that is, that is to say, namely</td><td>-yani</td><td>Only one person objected, namely the manager. — Sadece bir kişi itiraz etti, yani müdür.</td></tr>
      </table></div>

      <h4>Zaman Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>when, once, while, after, before, prior to, by the time, until</td><td>-dığında / -diğinde / -iken / -sonra / -önce / -ıncaya kadar / -e kadar</td><td>Once you finish, call me. — Bitirdiğinde beni ara.</td></tr>
        <tr><td>even when, even after, even before</td><td>-diği zaman bile / -den sonra bile / -den önce bile</td><td>Even after he apologized, she was upset. — Özür diledikten sonra bile üzgündü.</td></tr>
        <tr><td>whenever</td><td>her ne zaman olursa</td><td>Whenever you need help, call me. — Ne zaman yardıma ihtiyacın olursa ara.</td></tr>
        <tr><td>as soon as, no sooner … than, hardly … ever, scarcely … when, barely … when</td><td>-ar … -maz</td><td>As soon as she arrived, it started to rain. — O gelir gelmez yağmur başladı.</td></tr>
      </table></div>

      <h4>Hariç Tutma / İstisna</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>except for, apart from, aside from, excluding, other than</td><td>hariç</td><td>Everyone came, except for John. — John hariç herkes geldi.</td></tr>
      </table></div>

      <h4>Benzetme Bağlaçları</h4>
      <div class="g-table-wrap"><table>
        <tr><th>İngilizce</th><th>Türkçe Ek / Anlam</th><th>Örnek</th></tr>
        <tr><td>likewise, similarly, in like manner, just as, similar to</td><td>benzer şekilde</td><td>He works hard; likewise, his sister does too. — Sıkı çalışıyor; benzer şekilde kız kardeşi de.</td></tr>
        <tr><td>in the same way, equally, the same … as</td><td>aynı / aynı şekilde</td><td>She is as tall as her brother. — Kardeşi kadar uzun.</td></tr>
        <tr><td>correspondingly</td><td>karşılık olarak</td><td>Sales rose; correspondingly, profits grew. — Satışlar arttı; karşılık olarak kârlar büyüdü.</td></tr>
        <tr><td>as … as</td><td>… kadar …</td><td>This is as good as that one. — Bu da o kadar iyi.</td></tr>
      </table></div>
    `
  },
];
