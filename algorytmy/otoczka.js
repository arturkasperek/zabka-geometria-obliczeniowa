function policzOdcinkiOtoczki(punkty, color="blue") {
  // sortowanie
  const posortowane = punkty.sort((a, b) => a.x - b.x);
  // funckcja liczy wyznacznik 3x3
  const wyznacznik = (a, b, c) => (a[0] * b[1] * c[2]) - (a[0] * b[2] * c[1]) - (b[0]*a[1] * c[2]) + (b[0] * a[2] * c[1]) + (c[0] * a[1] * b[2]) - (c[0] * a[2] * b[1]);
  // pomocniczna funckja
  const wyznacznikDlaPunktow = (a, b, c) => wyznacznik(
    [a.x, a.y, 1],
    [b.x, b.y, 1],
    [c.x, c.y, 1],
  );
  // funkcja do wynzacznia punktów otoczki
  const getHalf = (first = true) => {
    let punktyOtoczki1 = [
      posortowane[0],
      posortowane[1],
      posortowane[2],
    ];

    // algorytm
    for (let i = 3; i < posortowane.length; i++) {
      let pointer;

      punktyOtoczki1.push(posortowane[i]);
      pointer = punktyOtoczki1.length - 1;

      while (pointer >= 2) {
        const endPoint = punktyOtoczki1[pointer];
        const middlePoint = punktyOtoczki1[pointer - 1];
        const startPoint = punktyOtoczki1[pointer - 2];
        // tu liczymy wyznacznik
        const wynikWyznacznika = wyznacznikDlaPunktow(startPoint, middlePoint, endPoint);

        // w zależności od wartosci wyznacznika wurzycamy punkt
        if ( first ? wynikWyznacznika > 0 : wynikWyznacznika < 0 ) {
          punktyOtoczki1 = punktyOtoczki1.filter((i, index) => index !== (pointer - 1));
        }

        pointer--;
      }
    }

    return punktyOtoczki1;
  };

  // generuje górną część otoczki
  const punktyOtoczkiGora = getHalf();
  // generuje dolną część otoczki
  const punktyOtoczkiDol = getHalf(false);

  // na dole pomocniczny kod do wygenerowania odcinków które będą tworzyć otoczkę
  punktyOtoczkiGora.reverse();
  const temp = [...punktyOtoczkiDol, ...punktyOtoczkiGora];
  const odcinki = [];

  for(let i = 0; i < temp.length - 1; i++) {
    const a = temp[i];
    const b = temp[i + 1];

    odcinki.push(new Odcinek(a, b, color));
  }

  return odcinki;
}
