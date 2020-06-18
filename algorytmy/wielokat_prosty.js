// Autorzy: Artur Kasperek, Szymon Kędziora, Mateusz Lemiszka

function czyPrzecina(odcinekA, odcinekB)
{
 //do sprawdzenia czy dany wielokąt jest prosty wykorzystaliśmy
 //zmodyfikowany algorytm do wyznaczania punktów przecięcia
  const p0_x = odcinekA.p1.x;
  const p0_y = odcinekA.p1.y;
  const p1_x = odcinekA.p2.x;
  const p1_y = odcinekA.p2.y;

  const p2_x = odcinekB.p1.x;
  const p2_y = odcinekB.p1.y;
  const p3_x = odcinekB.p2.x;
  const p3_y = odcinekB.p2.y;
  //pierwsza modyfikacja następuje tutaj
  //bez modyfikacji algorytm traktował wierzchołki jak przecięcia
  let s1_x, s1_y, s2_x, s2_y;
  s1_x = p1_x - p0_x + 1;     s1_y = p1_y - p0_y + 1;
  s2_x = p3_x - p2_x + 1;     s2_y = p3_y - p2_y + 1;

  let s, t;
  s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  {
    return {
      koliduje: true,
      punkt: new Punkt(p0_x + (t * s1_x), p0_y + (t * s1_y), 'green'),
    };
  }

  return {
    koliduje: false,
  };
}
// w tej funkcji wysyłamy zapytanie do funkcji powyższej w celu znalezienia
//punktów przecięć, następnie w zależności od tego czy takie punkty zostały znalezione
//zwracana jest odpowiednia wartość true lub false, odpowiadająca na pytanie
// czy jest to wielokąt prosty, czy nie
function prosty(odcinki){
    let flaga = true;
    for ( let i = 0; i < odcinki.length; i++ ) {
      for ( let j = 0; j < odcinki.length; j++ ) {
        if ( i == j ) {
          break;
        }

        const odcinekA = odcinki[i];
        const odcinekB = odcinki[j];

        const wynik = czyPrzecina(
          odcinekA,
          odcinekB
        );

        if ( wynik.koliduje ) {
            flaga =  false;
        }
        else{
            flaga = true;
        }
      }
    }
    return flaga;
}
