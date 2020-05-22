function czyPrzecina(odcinekA, odcinekB)
{
  const p0_x = odcinekA.p1.x;
  const p0_y = odcinekA.p1.y;
  const p1_x = odcinekA.p2.x;
  const p1_y = odcinekA.p2.y;

  const p2_x = odcinekB.p1.x;
  const p2_y = odcinekB.p1.y;
  const p3_x = odcinekB.p2.x;
  const p3_y = odcinekB.p2.y;

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

function prosty(odcinki){
    let flaga = true;
    for ( let i = 0; i < odcinki.length; i++ ) {
      for ( let j = 0; j < odcinki.length; j++ ) {
        if ( i == j ) {
          break;
        }

        const odcinekA = odcinki[i];
        const odcinekB = odcinki[j];

        //odcinekA.p1.x += 1;
        //odcinekA.p1.y += 1;
        //odcinekA.p2.x += 1;
        //odcinekA.p2.y += 1;

        //odcinekB.p1.x += 1;
        //odcinekB.p1.y += 1;
        //odcinekB.p2.x += 1;
        //odcinekB.p2.y += 1;
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
    if(flaga == false)
        console.log("Wielokąt nie jest prosty")
    else
        console.log("Wielokąt jest prosty")
    return flaga;
}
