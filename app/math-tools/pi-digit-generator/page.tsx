"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PiDigitGenerator() {
  const [digits, setDigits] = useState("");
  const [result, setResult] = useState<{
    numDigits: number;
    piString: string;
    lastDigit: string;
  } | null>(null);
  const [error, setError] = useState("");

  // Pre-computed digits of pi (10000 digits)
  const PI_DIGITS = "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275900994657640789512694683983525957098258226205224894077267194782684826014769909026401363944374553050682034962524517493996514314298091906592509372216964615157098583874105978859597729754989301617539284681382686838689427741559918559252459539594310499725246808459872736446958486538367362226260991246080512438843904512441365497627807977156914359977001296160894416948685558484063534220722258284886481584560285060168427394522674676788952521385225499546667278239864565961163548862305774564980355936345681743241125150760694794510965960940252288797108931456691368672287489405601015033086179286809208747609178249385890097149096759852613655497818931297848216829989487226588048575640142704775551323796414515237462343645428584447952658678210511413547357395231134271661021359695362314429524849371871101457654035902799344037420073105785390621983874478084784896833214457138687519435064302184531910484810053706146806749192781911979399520614196634287544406437451237181921799983910159195618146751426912397489409071864942319615679452080951465502252316038819301420937621378559566389377870830390697920773467221825625996615014215030680384477345492026054146659252014974428507325186660021324340881907104863317346496514539057962685610055081066587969981635747363840525714591028970641401109712062804390397595156771577004203378699360072305587631763594218731251471205329281918261861258673215791984148488291644706095752706957220917567116722910981690915280173506712748583222871835209353965725121083579151369882091444210067510334671103141267111369908658516398315019701651511685171437657618351556508849099898599823873455283316355076479185358932261854896321329330898570642046752590709154814165498594616371802709819943099244889575712828905923233260972997120844335732654893823911932597463667305836041428138830320382490375898524374417029132765618093773444030707469211201913020330380197621101100449293215160842444859637669838952286847831235526582131449576857262433441893039686426243410773226978028073189154411010446823252716201052652272111660396665573092547110557853763466820653109896526918620564769312570586356620185581007293606598764861179104533488503461136576867532494416680396265797877185560845529654126654085306143444318586769751456614068007002378776591344017127494704205622305389945613140711270004078547332699390814546646458807972708266830634328587856983052358089330657574067954571637752542021149557615814002501262285941302164715509792592309907965473761255176567513575178296664547791745011299614890304639947132962107340437518957359614589019389713111790429782856475032031986915140287080859904801094121472213179476477726224142548545403321571853061422881375850430633217518297986622371721591607716692547487389866549494501146540628433663937900397692656721463853067360965712091807638327166416274888800786925602902284721040317211860820419000422966171196377921337575114959501566049631862947265473642523081770367515906735023507283540567040386743513622224771589150495309844489333096340878076932599397805419341447377441842631298608099888687413260472156951623965864573021631598193195167353812974167729478672422924654366800980676928238280689964004824354037014163149658979409243237896907069779422362508221688957383798623001593776471651228935786015881617557829735233446042815126272037343146531977774160319906655418763979293344195215413418994854447345673831624993419131814809277771038638773431772075456545322077709212019051660962804909263601975988281613323166636528619326686336062735676303544776280350450777235547105859548702790814356240145171806246436267945612753181340783303362542327839449753824372058353114771199260638133467768796959703098339130771098704085913374641442822772634659470474587847787201927715280731767907707157213444730605700733492436931138350493163128404251219256517980694113528013147013047816437885185290928545201165839341965621349143415956258658655705526904965209858033850722426482939728584783163057777560688876446248246857926039535277348030480290058760758251047470916439613626760449256274204208320856611906254543372131535958450687724602901618766795240616342522577195429162991930645537799140373404328752628889639958794757291746426357455254079091451357111369410911939325191076020825202618798531887705842972591677813149699009019211697173727847684726860849003377024242916513005005168323364350389517029893922334517220138128069650117844087451960121228599371623130171144484640903890644954440061986907548516026327505298349187407866808818338510228334508504860825039302133219715518430635455007668282949304137765527939751754613953984683393638304746119966538581538420568533862186725233402830871123282789212507712629463229563989898935821167456270102183564622013496715188190973038119800497340723961036854066431939509790190699639552453005450580685501956730229219139339185680344903982059551002263535361920419947455385938102343955449597783779023742161727111723643435439478221818528624085140066604433258885698670543154706965747458550332323342107301545940516553790686627333799585115625784322988273723198987571415957811196358330059408730681216028764962867446047746491599505497374256269010490377819868359381465741268049256487985561453723478673303904688383436346553794986419270563872931748723320837601123029911367938627089438799362016295154133714248928307220126901475466847653576164773794675200490757155527819653621323926406160136358155907422020203187277605277219005561484255518792530343513984425322341576233610642506390497500865627109535919465897514131034822769306247435363256916078154781811528436679570611086153315044521274739245449454236828860613408414863776700961207151249140430272538607648236341433462351897576645216413767969031495019108575984423919862916421939949072362346468441173940326591840443780513338945257423995082965912285085558215725031071257012668302402929525220118726767562204154205161841634847565169998116141010029960783869092916030288400269104140792886215078424516709087000699282120660418371806535567252532567532861291042487761825829765157959847035622262934860034158722980534989650226291748788202734209222245339856264766914905562842503912757710284027998066365825488926488025456610172967026640765590429099456815065265305371829412703369313785178609040708667114965583434347693385781711386455873678123014587687126603489139095620099393610310291616152881384379099042317473363948045759314931405297634757481193567091101377517210080315590248530906692037671922033229094334676851422144773793937517034436619910403375111735471918550464490263655128162288244625759163330391072253837421821408835086573917715096828874782656995995744906617583441375223970968340800535598491754173818839994469748676265516582765848358845314277568790029095170283529716344562129640435231176006651012412006597558512761785838292041974844236080071930457618932349229279650198751872127267507981255470958904556357921221033346697499235630254947802490114195212382815309114079073860251522742995818072471625916685451333123948049470791191532673430282441860414263639548000448002670496248201792896476697583183271314251702969234889627668440323260927524960357996469256504936818360900323809293459588970695365349406034021665443755890045632882250545255640564482465151875471196218443965825337543885690941130315095261793780029741207665147939425902989695946995565761218656196733786236256125216320862869222103274889218654364802296780705765615144632046927906821207388377814233562823608963208068222468012248261177185896381409183903673672220888321513755600372798394004152970028783076670944474560134556417254370906979396122571429894671543578468788614445812314593571984922528471605049221242470141214780573455105008019086996033027634787081081754501193071412233908663938339529425786905076431006383519834389341596131854347546495569781038293097164651438407007073604112373599843452251610507027056235266012764848308407611830130527932054274628654036036745328651057065874882256981579367897669742205750596834408697350201410206723585020072452256326513410559240190274216248439140359989535394590944070469120914093870012645600162374288021092764579310657922955249887275846101264836999892256959688159205600101655256375678";

  const generatePiDigits = (n: number) => {
    const piString = "3." + PI_DIGITS.substring(0, n);
    const lastDigit = PI_DIGITS.substring(n - 1, n);
    return { numDigits: n, piString, lastDigit };
  };

  const calculate = () => {
    const num = parseInt(digits.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number of digits");
      setResult(null);
      return;
    }

    if (num < 1 || num > 10000) {
      setError("Please enter a number between 1 and 10000");
      setResult(null);
      return;
    }

    setError("");
    setResult(generatePiDigits(num));
  };

  const reset = () => {
    setDigits("");
    setResult(null);
    setError("");
  };

  const loadExample = (num: string) => {
    setDigits(num);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pi Digit Generator - Explore Digits of π</h1>
        <p className="text-muted-foreground">
          Display the digits of pi (π) to any decimal place up to 10,000 digits. Perfect for math projects, memorization practice, and exploring this famous irrational number.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number of Decimal Places</Label>
          <Input
            type="text"
            placeholder="e.g., 50"
            value={digits}
            onChange={(e) => setDigits(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Generate Pi Digits</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10")}>10 digits</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50")}>50 digits</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100 digits</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("500")}>500 digits</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000")}>1,000 digits</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("365")}>Pi Day special</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2024")}>Year 2024</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                π to {result.numDigits} decimal places
              </p>
              <p className="text-lg font-mono break-all leading-relaxed">
                {result.piString}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Decimal Places Shown</p>
                <p className="text-2xl font-bold">{result.numDigits}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last Digit</p>
                <p className="text-2xl font-bold">{result.lastDigit}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Characters</p>
                <p className="text-2xl font-bold">{result.piString.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">First 10 Digits</p>
                <p className="text-2xl font-mono">3.141592653...</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digits in Groups of 10</p>
              <div className="space-y-2 font-mono text-sm overflow-x-auto">
                {Array.from({ length: Math.ceil(result.numDigits / 10) }, (_, i) => {
                  const start = i * 10;
                  const end = Math.min(start + 10, result.numDigits);
                  const group = PI_DIGITS.substring(start, end);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground w-16">
                        {start + 1}-{end}:
                      </span>
                      <span className="bg-background px-3 py-1 rounded">
                        {group.match(/.{1,10}/g)?.join(" ") || group}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digit Frequency</p>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
                  const count = PI_DIGITS.substring(0, result.numDigits).split("").filter(c => parseInt(c) === d).length;
                  const percentage = ((count / result.numDigits) * 100).toFixed(1);
                  return (
                    <div key={d} className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono font-bold">{d}</span>
                      <div className="flex-1 h-4 bg-background rounded overflow-hidden">
                        <div
                          className="h-full bg-primary/50 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-20 text-right">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                In a truly random sequence, each digit would appear about 10% of the time.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Pi (π)</h2>
        <p className="text-muted-foreground">
          Pi is the ratio of a circle's circumference to its diameter. No matter how big or small the circle, divide the distance around it by the distance across, and you always get the same number: approximately 3.14159. But pi's decimal expansion goes on forever without repeating - it's an irrational number.
        </p>
        <p className="text-muted-foreground">
          What makes pi fascinating is that it shows up everywhere in mathematics and nature, from the shape of rivers to the structure of DNA, from probability theory to quantum mechanics. Despite being over 4,000 years old as a concept, mathematicians are still discovering new things about pi.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Why Pi Never Ends</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Pi is irrational, meaning it cannot be expressed as a fraction of two whole numbers. Its decimal representation goes on infinitely without ever settling into a repeating pattern. This was proven by Johann Lambert in 1768.
          </p>
          <p className="text-sm text-muted-foreground">
            Even more remarkably, pi is transcendental - it's not the solution to any polynomial equation with rational coefficients. This was proven by Ferdinand von Lindemann in 1882, finally settling the ancient problem of "squaring the circle" (impossible with just a compass and straightedge).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: First 10 Digits of Pi</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>π = 3.1415926535...</div>
              <div>First 10 decimal places: 1415926535</div>
              <div>Full representation: 3.1415926535</div>
              <div className="text-muted-foreground">Common approximation: 3.14 or 22/7</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Using Pi to Find Circle Circumference</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A circle has a diameter of 10 cm. What's its circumference?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Formula: C = π × d</div>
              <div>C = π × 10 cm</div>
              <div>C ≈ 3.14159 × 10 = 31.4159 cm</div>
              <div className="text-green-600 font-semibold">The circumference is approximately 31.42 cm</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Finding Circle Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A pizza has a radius of 8 inches. What's its area?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Formula: A = π × r²</div>
              <div>A = π × 8² = π × 64</div>
              <div>A ≈ 3.14159 × 64 = 201.06 square inches</div>
              <div className="text-green-600 font-semibold">The pizza has an area of about 201 square inches</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Pi in Probability (Buffon's Needle)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Drop a needle of length L on lined paper with spacing D (where L = D). The probability the needle crosses a line is 2/π.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Probability = 2/π ≈ 2/3.14159 ≈ 0.6366</div>
              <div>About 63.66% of drops will cross a line</div>
              <div className="text-muted-foreground">This experiment can actually estimate pi!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The current world record for calculating pi stands at over 105 trillion digits, achieved in 2024 using a supercomputer. If you printed all those digits on standard paper, the stack would reach to the moon and back over 100 times. Yet for NASA's most precise spacecraft navigation, they only use about 15 digits of pi. The rest is pure mathematical exploration.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How many digits of pi do I actually need?</h4>
            <p className="text-sm text-muted-foreground">
              For everyday calculations, 3.14 or 3.14159 is plenty. NASA uses 15 digits for interplanetary navigation. With 40 digits, you could calculate the circumference of the observable universe to within the width of a hydrogen atom. Beyond that, more digits are for mathematical curiosity, not practical use.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is there a pattern in pi's digits?</h4>
            <p className="text-sm text-muted-foreground">
              No repeating pattern has ever been found, and mathematicians believe none exists. Pi appears to be "normal" - meaning every digit and sequence of digits appears with equal frequency - but this hasn't been proven. The digits pass all statistical tests for randomness.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the best way to memorize pi digits?</h4>
            <p className="text-sm text-muted-foreground">
              Use "piems" - poems where word lengths represent digits. "How I wish I could calculate pi" = 3.141592. Or group digits in chunks like phone numbers. The world record holder memorized 70,000 digits using visualization techniques and memory palaces.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is March 14th Pi Day?</h4>
            <p className="text-sm text-muted-foreground">
              Written as 3/14 in American date format, it matches pi's first three digits: 3.14. The celebration started in 1988 at the San Francisco Exploratorium. Coincidentally, Albert Einstein was born on March 14, 1879, and Stephen Hawking died on March 14, 2018.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can pi be calculated exactly?</h4>
            <p className="text-sm text-muted-foreground">
              Pi can be expressed exactly using symbols (π) or formulas (like infinite series), but not as a finite decimal or fraction. Common exact representations include infinite series like π/4 = 1 - 1/3 + 1/5 - 1/7 + ... (the Leibniz formula).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where else does pi appear besides circles?</h4>
            <p className="text-sm text-muted-foreground">
              Pi shows up in probability (normal distribution), physics (Heisenberg uncertainty principle), engineering (signal processing), number theory (prime number distribution), and even in the meandering ratio of rivers. It's truly universal - appearing wherever there are waves, cycles, or optimal shapes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
