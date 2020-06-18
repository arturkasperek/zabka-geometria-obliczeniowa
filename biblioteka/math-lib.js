// Autorzy: Artur Kasperek, Szymon Kędziora, Mateusz Lemiszka

const DefaultTransformation = {
  translation: {
    x: 0,
    y: 0,
  }
};

class IDrawable {
  draw(ctx, translation) {}
}

/*
rysuje punkt na canvasie
*/
class Punkt extends IDrawable {
  constructor(x, y, color='#FF0000') {
    super();
    this.x = x;
    this.y = y;
    this.color = color;
  }

  /*
    korzysta z metody canvasu arc która rysuje kropkę
  */
  draw(ctx, { translation } = DefaultTransformation) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x + translation.x, this.y + translation.y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}

/*
rysuje odcinek na canvasie
 */
class Odcinek extends IDrawable{
  constructor(p1, p2, color = '#FF0000'){
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }

  /*
    korzysta z metody canvasu lineTo która rysuje kreskę
   */
  draw(ctx, { translation } = DefaultTransformation) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.p1.x + translation.x, this.p1.y + translation.y);
    ctx.lineTo(this.p2.x + translation.x, this.p2.y + translation.y);
    ctx.closePath();
    ctx.stroke();
  }
}

/*
rysuje wielokąt, jako argument przyjmuje punkty wielokata
 */
class Wielokat extends IDrawable{
  constructor(punkty, color = '#FF0000'){
    super();
    this.punkty = punkty;
  }

  /*
    wywołuje  metody draw odcinka oraz punktu
   */
  draw(ctx, transformation = DefaultTransformation) {
    for(let i = 0; i < this.punkty.length; i++) {
      const punkt = this.punkty[i];

      punkt.draw(ctx, transformation);

      // rysuje odcinek między dwoma punktami
      if ( i > 0 ) {
        const odcinek = new Odcinek(this.punkty[i], this.punkty[i -1], 'blue');

        odcinek.draw(ctx, transformation);
      }

      // rysuje kończący odcinek
      if (i == (this.punkty.length - 1)) {
        const odcinek = new Odcinek(this.punkty[0], this.punkty[i], 'blue');

        odcinek.draw(ctx, transformation);
      }
    }
  }

  /*
    metoda zwraca wszystkie odcinki wielokąta, jest to liczone na podstawie punktów
   */
  getLines() {
    let lines = [];
    for(let i = 1; i < this.punkty.length; i++) {
      lines.push(new Odcinek(this.punkty[i], this.punkty[i -1], 'blue'));

      if (i == (this.punkty.length - 1)) {
        lines.push(new Odcinek(this.punkty[0], this.punkty[i], 'blue'));
      }
    }

    return lines;
  }

  /*
  metoda zwraca wszystkie punkty wielokąta
 */
  getPoints() {
    return [
      ...this.punkty,
    ];
  }
}

/*
TODO zrobić
 */
class Polprosta extends IDrawable {
  constructor(p1, kat, color='#FF0000'){
    super();
    this.p1 = p1;
    this.kat = kat; //kąt podany w stopniach
    this.color = color;
  }
    draw(ctx, { translation } = DefaultTransformation) {
      ctx.beginPath();
      let r =  2000; //długość prostej, musi być większa niż wielkość canvasu
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.p1.x + translation.x, this.p1.y + translation.y);
      ctx.lineTo(this.p1.x + translation.x + r * Math.cos(Math.PI * this.kat / 180), this.p1.y + translation.y + r * Math.sin(Math.PI * this.kat / 180));
      ctx.closePath();
      ctx.stroke();
    }

}

class Prosta extends IDrawable {
  constructor(p1, kat, color = "#FF0000") {
    super();
    this.p1 = p1;
    this.kat = kat; //kąt podany w stopniach
    this.color = color;
  }
    draw(ctx, { translation } = DefaultTransformation) {
      ctx.beginPath();
      let r = 3000; //długość prostej
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.p1.x + translation.x, this.p1.y + translation.y);
      ctx.lineTo(this.p1.x + translation.x + r * Math.cos(Math.PI * this.kat / 180), this.p1.y + translation.y + r * Math.sin(Math.PI * this.kat / 180));
      ctx.moveTo(this.p1.x + translation.x, this.p1.y + + translation.y);
      ctx.lineTo(this.p1.x + + translation.x + r * Math.cos(Math.PI * (this.kat + 180) / 180), this.p1.y + + translation.y + r * Math.sin(Math.PI * (this.kat + 180) / 180));
      ctx.closePath();
      ctx.stroke();
    }

}



window.lib = {
  Punkt,
  Odcinek,
  Polprosta,
  Prosta,
  Wielokat,
};
