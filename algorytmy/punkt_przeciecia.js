// Autorzy: Artur Kasperek, Szymon Kędziora, Mateusz Lemiszka

function punktPrzecieciaOdcinkow(odcinekA, odcinekB)
{
  // mapujemy wartości z obiekty odcinka do pojedyńczych zmiennych by obliczenia wyglądały
  // bardziej zwięźle
  const p0_x = odcinekA.p1.x;
  const p0_y = odcinekA.p1.y;
  const p1_x = odcinekA.p2.x;
  const p1_y = odcinekA.p2.y;

  const p2_x = odcinekB.p1.x;
  const p2_y = odcinekB.p1.y;
  const p3_x = odcinekB.p2.x;
  const p3_y = odcinekB.p2.y;

  // liczymy odległości pomiędzy składowymi odcinków
  let s1_x, s1_y, s2_x, s2_y;
  s1_x = p1_x - p0_x;     s1_y = p1_y - p0_y;
  s2_x = p3_x - p2_x;     s2_y = p3_y - p2_y;

  // liczyby dwie wartosci "s" oraz "t" które posłużą do określenia czy odcinki kolidują
  let s, t;
  s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  {
    // jest kolidacja, zwracamy punkt przecięcia
    return {
      koliduje: true,
      punkt: new Punkt(p0_x + (t * s1_x), p0_y + (t * s1_y), 'green'),
    };
  }

  // brak kolidacji
  return {
    koliduje: false,
  };
}
