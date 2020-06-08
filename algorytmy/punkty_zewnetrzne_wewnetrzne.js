
const INF = 999999999;

// Aby znaleźć orientację uporządkowanej tripletu (p, q, r).
// Funkcja zwraca następujące wartości
// 0 -> p, q i r są kolinearne
// 1 -> Zgodnie z ruchem wskazówek zegara
// 2 -> Przeciwnie do ruchu wskazówek zegara
const orientation = (p, q, r) => {
  const val = (q.y - p.y) * (r.x - q.x) -
    (q.x - p.x) * (r.y - q.y);

  if (val == 0)
  {
    return 0; // kolinearne
  }
  return (val > 0) ? 1 : 2; // Zgodnie z ruchem wskazówek zegara lub Przeciwnie do ruchu wskazówek zegara
};

// Biorąc pod uwagę trzy punkty współliniowe p, q, r,
// funkcja sprawdza, czy punkt q leży
// na odcinku linii „pr”
const onSegment = (p, q, r) => {
  if (q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y))
  {
    return true;
  }
  return false;
};

// Funkcja, która zwraca true, jeśli
// odcinek linii „p1q1” i „p2q2” przecinają się.
const doIntersect = (p1, q1, p2, q2) => {
  // znajduje 4 orientacje
  // ogólne i specjalne przypadki
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  // przypadek ogolny
  if (o1 != o2 && o3 != o4)
  {
    return true;
  }

  // przypadek specjalny
  // p1, q1 i p2 są kolinearne i
  // p2 leży na p1q1
  if (o1 == 0 && onSegment(p1, p2, q1))
  {
    return true;
  }

  // p1, q1 i p2 są kolinearne i
  // q2 leży na p1q1
  if (o2 == 0 && onSegment(p1, q2, q1))
  {
    return true;
  }

  // p2, q2 i p1 są kolinearne i
  // p1 leży na p2q2
  if (o3 == 0 && onSegment(p2, p1, q2))
  {
    return true;
  }

  // p2, q2 i q1 są kolinearne i
  // q1 leży na p2q2
  if (o4 == 0 && onSegment(p2, q1, q2))
  {
    return true;
  }

  // żaden z powyższych przypadków
  return false;
};

const isInside = (polygon, point) => {
  const n = polygon.length;
  if (n < 3)
  {
    return false;
  }

  // punkt dla segmentu linii od p do nieskończoności
  const extreme = new Punkt(INF, point.y);


  // Policz przecięcia powyższej linii z bokami wielokąta
  let count = 0, i = 0;
  do
  {
    const next = (i + 1) % n;


    // Sprawdź, czy segment linii od „p” do
    // „ekstremum” przecina się z linią
    // segmentu z 'polygon[i]' na 'polygon[next]'
    if (doIntersect(polygon[i],
      polygon[next], point, extreme))
    {

      // Jeśli punkt „p” jest współliniowy z linią
      // segmentuj „i-next”, a następnie sprawdź, czy leży
      // na segmencie. Jeśli nie, zwróć true, w przeciwnym razie false
      if (orientation(polygon[i], point, polygon[next]) == 0)
      {
        return onSegment(polygon[i], point,
          polygon[next]);
      }
      count++;
    }
    i = next;
  } while (i != 0);

  // Zwraca true, jeśli liczba jest nieparzysta, w przeciwnym razie false
  return (count % 2 == 1);
};

const punktyWewnetrzneZewnetrzne = (wielokat, punkty) => {
  punkty.forEach(punkt => {
    const czyWewnatrz = isInside(wielokat.getPoints(), punkt);

    if ( czyWewnatrz ) {
      punkt.color = '#00966e';
    }
    console.log(isInside(wielokat.getPoints(), punkt))
  })
};

window.punktyWewnetrzneZewnetrzne = punktyWewnetrzneZewnetrzne;
