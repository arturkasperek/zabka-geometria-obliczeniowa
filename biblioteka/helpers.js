// generowanie liczby z przedziału
const random = (min, max) => {
  return parseInt(Math.random() * (max - min) ) + min;
};

// funkcja zamiany radianów na stopnie
function toDegrees(radians) {
  return radians * 180 / Math.PI;
};

// generuje ranodmowe punkty
const generateRandomPoints = (amount = 50, color= 'red', range = {minX: 0, maxX: 500, minY: 0, maxY: 500}) => {
  const points = [];
  for(let i = 0; i < amount; i++) {
    const { minX, maxX, minY, maxY } = range;
    points.push(new Punkt(random(minX, maxX), random(minY, maxY), color));
  }

  return points;
};

// generuje randomowe odcinki
const generateRandomLines = (amount = 50, color = 'red', range = {minX: 0, maxX: 500, minY: 0, maxY: 500}) => {
  const lines = [];
  for(let i = 0; i < amount; i++) {
    const { minX, maxX, minY, maxY } = range;
    lines.push(new Odcinek(
      new Punkt(random(minX, maxX), random(minY, maxY)),
      new Punkt(random(minX, maxX), random(minY, maxY)),
      color,
    ));
  }

  return lines;
};

// generuje wielokąt o zadanej liczbe wierzchołków
const generatePolygon = (amount = 10, color = 'green', range = {minX: 0, maxX: 500, minY: 0, maxY: 500}) => {
  return new Wielokat(generateRandomPoints(amount, color));
};

// liczy kąt między punktami, c jest środkowym punktem
const calcAngleBetweenPoints = (p0,p1,c) => {
  const p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+
    Math.pow(c.y-p0.y,2)); // p0->c (b)
  const p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+
    Math.pow(c.y-p1.y,2)); // p1->c (a)
  const p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+
    Math.pow(p1.y-p0.y,2)); // p0->p1 (c)

  return toDegrees(Math.acos((p1c*p1c+p0c*p0c-p0p1*p0p1)/(2*p1c*p0c)));
};

const getIntersectionPoint = (odcinekA, odcinekB) => {
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
};

window.helpers = {
  generateRandomPoints,
  generateRandomLines,
  generatePolygon,
  calcAngleBetweenPoints,
  getIntersectionPoint,
};
