const wypuklyCzyNie = (wielokat) => {
  const points = wielokat.getPoints();
  // pomocnicza funkcja
  const getPointAt = (index) => {
    return points[index % points.length];
  };
  let zcrossProducts = [];

  // wielokąt musi mieć co najmniej 3 odcinki by miało sens liczenie czy jest wypukły ( wielokat ma 3 odcinki gdy liczba jego punktów  "budujących" jest równa 4, 1 oraz 4 to ten sam punkt )
  if ( points.length < 4 ) {
    throw new Error('Nieprawidłowy wielokąt!');
  }

  for(let i = 0; i < points.length; i++) {
    // bierzemy 3 kolejne punkty wielokąta
    const first = getPointAt(i);
    const second = getPointAt(i + 1);
    const third = getPointAt(i + 2);

    // liczymy iloczyn wektorowy. Mówi nam o tym czy dana para odcinków jest wypukła czy też nie
    const dx1 = second.x-first.x;
    const dy1 = second.y-first.y;
    const dx2 = third.x-second.x;
    const dy2 = third.y-second.y;
    const zcrossproduct = dx1*dy2 - dy1*dx2;

    zcrossProducts.push(zcrossproduct);
  }

  // jeżeli iloczyn wektorowy wszystkich punktów jest większy od 0 to znaczy że figura jest wklęsła, w przeciwnym przypadku mamy figurę wypukłą
  if ( zcrossProducts.find(i => i < 0) ) {
    return false;
  } else {
    return true;
  }
};

window.wypuklyCzyNie = wypuklyCzyNie;
